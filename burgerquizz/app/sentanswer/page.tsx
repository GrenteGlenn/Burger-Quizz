"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { PaintBlob } from "@/components/paintBlob";

export default function AnswerSentPage() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState("Mayo-Master");
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("B");

  useEffect(() => {
    setPseudo(localStorage.getItem("pseudo") || "Mayo-Master");
    setAnswer(sessionStorage.getItem("lastAnswer") || "lastAnswer");

    socket.on("question:revealed", (data) => {
      const playerId = localStorage.getItem("playerId");

      sessionStorage.setItem("correctAnswer", data.correctAnswer);

      const myResult = data.results.find(
        (result: any) => result.playerId === playerId,
      );

      const updatedPlayer = data.players.find(
        (player: any) => player.id === playerId,
      );

      if (updatedPlayer) {
        localStorage.setItem("score", String(updatedPlayer.score));
      }

      if (!myResult) {
        router.push("/wrongAnswer");
        return;
      }

      sessionStorage.setItem("pointsEarned", String(myResult.pointsEarned));
      sessionStorage.setItem("isCorrect", String(myResult.isCorrect));

      if (myResult.isCorrect) {
        router.push("/success");
      } else {
        router.push("/wrongAnswer");
      }
    });

    return () => {
      socket.off("question:revealed");
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
    <main className="relative min-h-screen overflow-hidden bg-[#315DAE] px-4 pt-4 text-[#FAEFD6]">
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-text text-xs font-bold text-[#95C8E8]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            {pseudo[0]?.toUpperCase()}
          </span>
          {pseudo}
        </div>
      </div>

      <PaintBlob color="#B5A26B" className="-right-11.25 top-24 h-32 w-36" />

      <PaintBlob color="#9E3554" className="-left-14 bottom-24 h-32 w-36" />

      <section className="relative z-10 flex min-h-[calc(100vh-70px)] flex-col items-center justify-center text-center">
        <div className="relative grid h-36 w-36 place-items-center rounded-full bg-[#F2B935] sm:h-40 sm:w-40">
          <div className="absolute -inset-3.5 rounded-full border-14 border-white/10" />

          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        </div>

        <h1 className="mt-8 font-display text-5xl uppercase leading-[1.20] text-[#95C8E8]">
          Nous préparons votre commande !
        </h1>

        <p className="mt-5 max-w-70 font-text text-base font-bold leading-snug text-white/45">
          Garde le ketchup pour plus tard, l'animateur dévoile la bonne réponse
          dans un instant.
        </p>

        <div className="mt-10 rounded-full bg-[#274D91] px-6 py-4 font-text text-sm font-bold text-white/45">
          Ta réponse :
          <span className="text-[#95C8E8]">{formatAnswer(answer)}</span>
        </div>
      </section>
    </main>
  );
}
