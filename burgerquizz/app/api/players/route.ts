
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pseudo } = await req.json();

    const cleanPseudo = pseudo?.trim();

    if (!cleanPseudo || cleanPseudo.length < 2 || cleanPseudo.length > 20) {
      return NextResponse.json({
        success: false,
        message: "Pseudo invalide",
      });
    }

    const existingPlayer = await prisma.player.findFirst({
      where: {
        pseudo: {
          equals: cleanPseudo,
          mode: "insensitive",
        },
      },
    });

    if (existingPlayer) {
      return NextResponse.json({
        success: false,
        message: "Pseudo déjà pris par quelqu'un dans la salle",
      });
    }

    const player = await prisma.player.create({
      data: {
        pseudo: cleanPseudo,
      },
    });

    return NextResponse.json({
      success: true,
      player,
      message: "Joueur ajouté",
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Erreur serveur",
    });
  }
}

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        score: "desc",
      },
      select: {
        pseudo: true,
        score: true,
      },
    });

    return NextResponse.json(players);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
