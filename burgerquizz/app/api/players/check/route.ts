
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pseudo = searchParams.get("pseudo")?.trim();

  if (!pseudo || pseudo.length < 2) {
    return NextResponse.json({
      available: false,
      message: "Pseudo trop court",
    });
  }

  const existingPlayer = await prisma.player.findFirst({
    where: {
      pseudo: {
        equals: pseudo,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json({
    available: !existingPlayer,
    message: existingPlayer
      ? "Pseudo déjà pris par quelqu'un dans la salle"
      : "✓ Disponible",
  });
}