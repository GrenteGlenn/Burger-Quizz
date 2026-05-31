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
             <img className="mt-9 w-32 sm:mt-10 sm:w-40" src="image/burger-logo.svg" alt="Burger Logo" />


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
