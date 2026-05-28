import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { round, correctAnswer } = await req.json();

    if (!round || !correctAnswer) {
      return NextResponse.json({
        success: false,
        message: "Round et réponse correcte obligatoires",
      });
    }

    const question = await prisma.gameQuestion.create({
      data: {
        round,
        correctAnswer,
        status: "open",
        startedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("START QUESTION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}