import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const POINTS_MAP: Record<number, number> = {
  7: 42,
  6: 37,
  5: 34,
  4: 28,
  3: 24,
  2: 15,
  1: 12,
  0: 5,
};

export async function POST(req: Request) {
  const { questionId, correctAnswer } = await req.json();

  const answers = await prisma.playerAnswer.findMany({
    where: {
      gameQuestionId: questionId,
    },
  });

  for (const answer of answers) {
    const playerAnswer = answer.answer.trim().toUpperCase();
    const adminAnswer = correctAnswer.trim().toUpperCase();

    const isCorrect = playerAnswer === adminAnswer;

    const pointsEarned = isCorrect ? (POINTS_MAP[answer.secondsLeft] ?? 0) : 0;

    await prisma.playerAnswer.update({
      where: { id: answer.id },
      data: {
        isCorrect,
        pointsEarned,
      },
    });

    if (isCorrect) {
      await prisma.player.update({
        where: { id: answer.playerId },
        data: {
          score: {
            increment: pointsEarned,
          },
        },
      });
    }
  }
  const question = await prisma.gameQuestion.update({
    where: { id: questionId },
    data: {
      correctAnswer,
      status: "revealed",
      revealedAt: new Date(),
    },
  });

  const players = await prisma.player.findMany({
    orderBy: {
      score: "desc",
    },
    select: {
      id: true,
      pseudo: true,
      score: true,
    },
  });
  return NextResponse.json({
    success: true,
    question,
    players,
    results: answers.map((answer) => ({
      playerId: answer.playerId,
      answer: answer.answer,
      isCorrect: answer.answer === correctAnswer,
      pointsEarned:
        answer.answer === correctAnswer
          ? (POINTS_MAP[answer.secondsLeft] ?? 0)
          : 0,
    })),
  });
}
