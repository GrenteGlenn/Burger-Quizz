"use client";

import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function WrongAnswerScreen() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState("");
  const [answer, setAnswer] = useState("B");

  useEffect(() => {
    setPseudo(localStorage.getItem("pseudo") || "Joueur");
    setAnswer(sessionStorage.getItem("correctAnswer") || "B");
  }, []);

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#CB2E25] px-6 pt-5 text-[#FAEFD6]">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 font-text text-sm font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            {pseudo.charAt(0)}
          </span>
          {pseudo}
        </div>
      </div>

      {/* Background crosses */}
      {[
        "left-2 top-20 rotate-45",
        "right-12 top-32 rotate-[25deg]",
        "left-20 top-52 rotate-[8deg]",
        "right-8 bottom-44 rotate-[-25deg]",
        "left-14 bottom-52 rotate-[20deg]",
        "left-36 bottom-32 rotate-[35deg]",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute text-6xl font-black leading-none text-white/10 ${pos}`}
        >
          ×
        </div>
      ))}

      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center">
        <svg
          viewBox="0 0 160 105"
          className="mb-8 w-36"
          role="img"
          aria-label="Sad burger"
        >
          <ellipse cx="80" cy="38" rx="56" ry="30" fill="#D79750" />
          <path
            d="M25 42Q80 6 135 42v6Q80 18 25 48Z"
            fill="#E8B374"
            opacity=".7"
          />
          <ellipse cx="54" cy="35" rx="4" ry="5" fill="#FAEFD6" />
          <ellipse cx="78" cy="25" rx="4" ry="5" fill="#FAEFD6" />
          <ellipse cx="102" cy="34" rx="4" ry="5" fill="#FAEFD6" />
          <circle cx="68" cy="48" r="4" fill="#111" />
          <circle cx="91" cy="48" r="4" fill="#111" />
          <path
            d="M68 61Q80 54 94 61"
            stroke="#111"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M30 63Q42 56 52 63Q62 56 72 63Q82 56 92 63Q104 56 118 63L122 69H28Z"
            fill="#5E8C3A"
          />
          <path d="M28 66h104l-9 11Q89 84 38 77Z" fill="#F2B935" />
          <rect x="25" y="72" width="110" height="13" rx="5" fill="#5A2F1B" />
          <path d="M25 83Q80 108 135 83v8Q80 116 25 91Z" fill="#C77F3A" />
        </svg>

        <h1 className="font-display text-[3.2rem] uppercase leading-[0.85] tracking-tight sm:text-7xl">
          Aïe, vous êtes dans la sauce !.
        </h1>

        <p className="mt-4 font-text text-lg font-bold">
          <span className="text-[#95C8E8]"> C'était la réponse : {answer}</span>
        </p>

        <div className="mt-9 flex items-center gap-8">
          <div>
            <p className="mb-1 font-text text-xs font-bold uppercase tracking-[0.22em] text-[#FAEFD6]/60">
              Cette question
            </p>
            <p className="font-serif text-5xl italic leading-none">+0 points</p>
          </div>
        </div>
      </section>
    </main>
  );
}
