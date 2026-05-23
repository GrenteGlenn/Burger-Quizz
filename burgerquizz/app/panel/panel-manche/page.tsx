"use client";

import { useEffect, useState } from "react";
import PanelHeader from "@/components/Panel-header";
import { socket } from "@/lib/socket";

const rounds = [
  { icon: "N", title: "Nuggets", subtitle: "En cours", active: true },
  { icon: "✓", title: "Sel ou poivre", subtitle: "Terminée" },
  { icon: "M", title: "Menus", subtitle: "6 questions" },
];

const answers = [
  ["A", "Chauffeur de taxi.", "18%", "26j.", "#C72E25"],
  ["B", "Vendeur de hot dog.", "47%", "67j.", "#F2B935"],
  ["C", "Dog sitter.", "22%", "31j.", "#218F5B"],
  ["D", "Éboueur.", "13%", "19j.", "#5C3A8B"],
];
type Player = {
  pseudo: string;
  score: number;
};

export default function PanelManchePage() {
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayers() {
      const res = await fetch("/api/players", {
        cache: "no-store",
      });

      const data = await res.json();
      setLeaderboard(data);
    }

    fetchPlayers();

    socket.on("leaderboard:update", (players: Player[]) => {
      setLeaderboard(players);
    });

    return () => {
      socket.off("leaderboard:update");
    };
  }, []);

  async function emitLeaderboardUpdate() {
    const res = await fetch("/api/players", {
      cache: "no-store",
    });

    const players = await res.json();

    socket.emit("leaderboard:update", players);
  }
  const connected = leaderboard.length;

  return (
    <main className="min-h-screen bg-[#12110D] text-[#FAEFD6]">
      <PanelHeader nbPlayers={connected} />

      <div className="grid min-h-[calc(100vh-57px)] grid-cols-[250px_1fr]">
        <aside className="hidden border-r border-white/10 bg-[#1A1812] p-5 lg:flex lg:flex-col">
          <p className="font-text text-xs uppercase tracking-[0.2em] text-white/35">
            Manches
          </p>

          <div className="mt-4 space-y-3">
            {rounds.map((round) => (
              <div
                key={round.title}
                className={`flex items-center gap-3 rounded-lg border px-3 py-3 ${
                  round.active
                    ? "border-[#F2B935] bg-[#F2B935]/10"
                    : "border-transparent"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-md font-display text-sm ${
                    round.active
                      ? "bg-[#F2B935] text-black"
                      : "bg-white/10 text-white/45"
                  }`}
                >
                  {round.icon}
                </span>

                <div>
                  <p className="font-display text-sm uppercase leading-none">
                    {round.title}
                  </p>
                  <p className="mt-1 font-text text-xs text-white/35">
                    {round.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex items-end justify-end border-b border-white/10 bg-[#1A1812] px-6 py-4">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#F2B935] font-display text-2xl">
                  4
                </div>
                <p className="font-text text-xs uppercase tracking-[0.18em] text-white/35">
                  Secondes
                  <br />
                  restantes
                </p>
              </div>

              <button className="rounded-lg bg-[#FAEFD6] px-7 py-4 font-display text-sm uppercase text-black">
                ■ Clôturer
              </button>

              <button
                onClick={emitLeaderboardUpdate}
                className="rounded-lg bg-[#F2B935] px-8 py-4 font-display text-sm uppercase text-black shadow-[0_4px_0_#C77F3A] cursor-pointer"
              >
                Révéler la réponse →
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-6 xl:grid-cols-[1fr_280px]">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* ANSWERS */}
              <div className="rounded-xl border border-white/10 bg-[#1A1812] p-6">
                <p className="font-text text-xs uppercase tracking-[0.2em] text-white/35">
                  Réponse correcte
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {answers.map(([letter, , , , color]) => {
                    const isSelected = selectedAnswer === letter;

                    return (
                      <button
                        key={letter}
                        onClick={() => setSelectedAnswer(letter)}
                        className={`
                grid h-20 place-items-center rounded-lg border font-display text-3xl transition
                ${
                  isSelected
                    ? "border-[#FAEFD6] scale-105 shadow-[0_0_0_3px_rgba(250,239,214,.18)]"
                    : "border-white/10 opacity-70 hover:opacity-100"
                }
              `}
                        style={{
                          background: color,
                          color: "#000",
                        }}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STATS */}
              <div>
                <p className="font-text text-xs uppercase tracking-[0.2em] text-white/35">
                  Statistiques en direct &#40;animateur seul&#41;
                </p>

                <div className="mt-4 space-y-3">
                  {answers.map(([letter, label, percent, count, color]) => (
                    <div
                      key={letter}
                      className="relative overflow-hidden rounded-lg border border-white/10 bg-[#1A1812]"
                    >
                      <div
                        className="absolute inset-y-0 left-0"
                        style={{
                          width: percent,
                          background: color,
                          opacity: 0.35,
                        }}
                      />

                      <div className="relative grid grid-cols-[36px_1fr_auto_auto] items-center gap-3 px-4 py-3">
                        <span
                          className="grid h-8 w-8 place-items-center font-display text-sm text-black"
                          style={{ background: color }}
                        >
                          {letter}
                        </span>

                        <span className="font-text text-sm font-bold">
                          {label}
                        </span>

                        <span className="font-display text-xl">{percent}</span>

                        <span className="font-text text-xs text-white/35">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <aside className="rounded-xl bg-[#1A1812] p-5">
              <p className="font-text text-xs uppercase tracking-[0.2em] text-white/35">
                Classement live
              </p>

              <div className="mt-5 space-y-2">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.pseudo}
                    className="grid grid-cols-[26px_1fr_auto] items-center gap-3 rounded-lg px-2 py-2"
                  >
                    <span className="font-display text-sm text-[#F2B935]">
                      {index + 1}
                    </span>

                    <span className="truncate font-text text-sm font-bold">
                      {player.pseudo}
                    </span>

                    <span className="font-display text-lg text-[#F2B935]">
                      {player.score}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
