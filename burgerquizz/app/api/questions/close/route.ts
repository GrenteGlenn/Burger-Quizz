import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { questionId } = await req.json();

  const question = await prisma.gameQuestion.update({
    where: { id: questionId },
    data: {
      status: "closed",
      closedAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    question,
  });
}