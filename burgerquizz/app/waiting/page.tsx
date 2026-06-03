"use client";

import BurgerLogo from "@/components/BurgerLogo";
import { PaintBlob } from "@/components/paintBlob";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function WaitingScreen() {
  const router = useRouter();

  const [pseudo, setPseudo] = useState("Joueur");
  const [playersCount, setPlayersCount] = useState(0);

  useEffect(() => {
    setPseudo(localStorage.getItem("pseudo") || "Joueur");

    async function fetchPlayers() {
      const res = await fetch("/api/players", {
        cache: "no-store",
      });

      const data = await res.json();

      setPlayersCount(data.length);
    }

    fetchPlayers();

    socket.on("players:joined", (players) => {
      setPlayersCount(players.length);
    });

    socket.on("question:started", (question) => {
      sessionStorage.setItem("currentQuestionId", question.questionId);
      sessionStorage.setItem("currentRound", question.round);

      router.push(question.answerPage);
    });

    return () => {
      socket.off("players:joined");
      socket.off("question:started");
    };
  }, [router]);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden px-6 pt-4 text-center bg-[#315DAE]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-text text-sm font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            {pseudo.charAt(0).toUpperCase()}
          </span>
          <span>{pseudo}</span>
        </div>
      </div>

      <PaintBlob color="#8A6A16" className="-left-12 top-16 h-36 w-40" />

      <PaintBlob color="#811E18" className="-right-16 bottom-16 h-40 w-44" />

      <div className="mt-24 flex flex-col items-center">
        <div className="grid h-40 w-40 place-items-center rounded-full border-4 border-dashed border-white/35">
          <img
            className=" w-32 sm:mt-10 sm:w-40"
            src="image/burger-logo.svg"
            alt="Burger Logo"
          />
        </div>

        <h1 className="mt-8 font-display font-bold text-4xl uppercase leading-[1.2]">
          On prépare votre commande ...
        </h1>

        <p className="mt-5 max-w-70 font-text text-lg font-bold leading-snug text-white/65">
          La partie démarre dès que l'animateur lance la première manche.
        </p>

        <div className="mt-10 flex items-center gap-3 rounded-full bg-white/10 px-6 py-4 font-text text-base font-bold">
          <span className="h-3 w-3 rounded-full bg-[#69B95C] shadow-[0_0_10px_#69B95C]" />
          <span>{playersCount} joueurs prêts</span>
        </div>
      </div>
    </div>
  );
}
