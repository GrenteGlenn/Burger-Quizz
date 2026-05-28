/*
  Warnings:

  - A unique constraint covering the columns `[pseudo]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "GameQuestion" (
    "id" TEXT NOT NULL,
    "round" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "correctAnswer" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "revealedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerAnswer" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "gameQuestionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "secondsLeft" INTEGER NOT NULL,
    "isCorrect" BOOLEAN,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAnswer_playerId_gameQuestionId_key" ON "PlayerAnswer"("playerId", "gameQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_pseudo_key" ON "Player"("pseudo");

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_gameQuestionId_fkey" FOREIGN KEY ("gameQuestionId") REFERENCES "GameQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
