"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const answers = [
  ["A", "#D22F26"],
  ["B", "#F2B935"],
  ["C", "#218F5B"],
  ["D", "#0124eb"],
];

export default function AnswerPage() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [pseudo, setPseudo] = useState("Joueur");

  useEffect(() => {
    setPseudo(localStorage.getItem("pseudo") || "Joueur");
  }, []);

  async function submitAnswer(answer: string) {
    setSelectedAnswer(answer);

    const playerId = localStorage.getItem("playerId");
    const questionId = sessionStorage.getItem("currentQuestionId");

    if (!playerId || !questionId) return;

    await fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
        questionId,
        answer,
      }),
    });

    router.push("/sentanswer");
  }

  return (
    <main className="min-h-screen bg-[#315DAE] px-4 pt-4 text-[#FAEFD6]">
      {/* top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-text text-xs font-bold">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            {pseudo[0]?.toUpperCase()}
          </span>
          {pseudo}
        </div>
      </div>

      {/* round info */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-sm uppercase text-[#95C8E8]">
          Nuggets
        </div>
      </div>

      {/* answers */}
      <div className="mt-5 grid grid-cols-1 gap-3">
        {answers.map(([letter, color]) => {
          const isSelected = selectedAnswer === letter;

          return (
            <button
              key={letter}
              onClick={() => submitAnswer(letter)}
              disabled={!!selectedAnswer}
              className={`
                    flex
                    h-40
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    border-4
                    text-center
                    shadow-[0_5px_0_rgba(0,0,0,.25)]
                    transition
                    ${isSelected ? "border-[#FAEFD6] scale-[1.02]" : "border-transparent"}
                    ${selectedAnswer && !isSelected ? "opacity-50" : ""}
                `}
              style={{ background: color }}
            >
              <span className="grid h-24 w-36 place-items-center rounded-lg bg-black font-letter text-6xl text-[#FAEFD6]">
                {letter}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}
