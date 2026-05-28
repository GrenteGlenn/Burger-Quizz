"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const answers = [
  ["VRAI", "#218F5B"],
  ["FAUX", "#D22F26"],
];

export default function AnswerMenuPage() {
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

    sessionStorage.setItem("lastAnswer", answer);

    router.push("/sentanswer");
  }

  return (
    <main className="min-h-screen bg-[#315DAE] px-4 pt-4 text-[#FAEFD6]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-text text-xs font-bold">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            {pseudo[0]?.toUpperCase()}
          </span>

          {pseudo}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-sm uppercase text-[#95C8E8]">
          Menus
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        {answers.map(([label, color]) => {
          const isSelected = selectedAnswer === label;

          return (
            <button
              key={label}
              onClick={() => submitAnswer(label)}
              disabled={!!selectedAnswer}
              className={`
                flex
                h-44
                w-full
                items-center
                justify-center
                rounded-lg
                border-4
                text-center
                shadow-[0_5px_0_rgba(0,0,0,.25)]
                transition
                ${
                  isSelected
                    ? "scale-[1.02] border-[#FAEFD6]"
                    : "border-transparent"
                }
                ${selectedAnswer && !isSelected ? "opacity-50" : ""}
              `}
              style={{ background: color }}
            >
              <span className="px-6 text-center rounded-lg font-display text-5xl uppercase text-[#FAEFD6]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}