import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const question = await prisma.gameQuestion.findFirst({
    where: {
      status: "open",
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  return NextResponse.json(question);
}