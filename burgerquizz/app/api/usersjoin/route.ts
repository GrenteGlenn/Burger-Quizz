import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      take: 137,
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        pseudo: true,
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