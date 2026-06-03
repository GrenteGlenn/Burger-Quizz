"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function SuccessScreen() {
  const [pseudo, setPseudo] = useState("");
  const [score, setScore] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [answer, setAnswer] = useState("B");

  useEffect(() => {
    setPseudo(localStorage.getItem("pseudo") || "Joueur");
    setScore(Number(localStorage.getItem("score") || 0));
    setPointsEarned(Number(sessionStorage.getItem("pointsEarned") || 0));
    setAnswer(sessionStorage.getItem("lastAnswer") || "B");
  }, []);
  const router = useRouter();

  useEffect(() => {
    socket.on("question:started", (question) => {
      sessionStorage.setItem("currentQuestionId", question.questionId);
      sessionStorage.setItem("currentRound", question.round);

      router.push(question.answerPage);
    });

    return () => {
      socket.off("question:started");
    };
  }, [router]);

  function formatAnswer(answer: string) {
    const labels: Record<string, string> = {
      SEL: "Sel",
      POIVRE: "Poivre",
      LES_DEUX: "Les deux",
      VRAI: "Vrai",
      FAUX: "Faux",
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    };

    return labels[answer] ?? answer;
  }
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#218F5B] px-6 pt-5 text-[#FAEFD6]">
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 font-text text-sm font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            {pseudo[0]?.toUpperCase()}
          </span>
          {pseudo}
        </div>
      </div>

      {/* Background doodles */}
      <div className="absolute left-1 top-24 text-4xl font-black text-white/10">
        ✓
      </div>
      <div className="absolute right-12 top-32 rotate-25 text-5xl font-black text-white/10">
        ⌞
      </div>
      <div className="absolute left-20 top-52 rotate-[8deg] text-5xl font-black text-white/10">
        ⌟
      </div>
      <div className="absolute right-10 bottom-44 rotate-[-25deg] text-5xl font-black text-white/10">
        ⌟
      </div>
      <div className="absolute left-14 bottom-52 rotate-20 text-5xl font-black text-white/10">
        ⌜
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center">
        <img
          className="mt-9 mb-9 w-32 sm:mt-10 sm:w-40"
          src="image/burger-logo.svg"
          alt="Burger Logo"
        />

        <h1 className="font-display text-[3.2rem] uppercase leading-[1.2] tracking-tight sm:text-7xl">
          Chaud devant !
        </h1>

        <p className="mt-4 font-text text-lg font-bold">
          <span className="text-[#95C8E8]"> Ta réponse : {formatAnswer(answer)}</span>
        </p>

        <div className="mt-9 flex items-center gap-8">
          <div>
            <p className="mb-1 font-text text-xs font-bold uppercase tracking-[0.22em] text-[#FAEFD6]/60">
              Cette question
            </p>
            <p className="font-serif text-5xl italic leading-none">
              +{pointsEarned} point{pointsEarned > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
