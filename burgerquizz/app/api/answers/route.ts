import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { playerId, questionId, answer } = await req.json();

    const question = await prisma.gameQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question || question.status !== "open") {
      return NextResponse.json({
        success: false,
        message: "Réponse fermée",
      });
    }

    const elapsedMs = Date.now() - question.startedAt.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const secondsLeft = Math.max(0, 7 - elapsedSeconds);

    const playerAnswer = await prisma.playerAnswer.upsert({
      where: {
        playerId_gameQuestionId: {
          playerId,
          gameQuestionId: questionId,
        },
      },
      update: {
        answer,
        secondsLeft,
      },
      create: {
        playerId,
        gameQuestionId: questionId,
        answer,
        secondsLeft,
      },
    });

    return NextResponse.json({
      success: true,
      answer: playerAnswer,
    });
  } catch (error) {
    console.error("ANSWER ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Erreur serveur",
    });
  }
}