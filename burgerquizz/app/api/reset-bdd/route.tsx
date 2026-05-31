import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await prisma.$transaction([
      prisma.playerAnswer.deleteMany(),
      prisma.gameQuestion.deleteMany(),
      prisma.player.deleteMany(),
    ]);

    return NextResponse.json({
      success: true,
      message: "Base nettoyée",
    });
  } catch (error) {
    console.error("RESET GAME ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur pendant le reset",
      },
      { status: 500 },
    );
  }
}