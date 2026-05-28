"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import PanelHeader from "@/components/Panel-header";
import Link from "next/link";

type Player = {
  id: string;
  pseudo: string;
};

const MAX_PLAYERS = 137;

export default function HostLobbyPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // call initial players list by API
    async function fetchPlayers() {
      const res = await fetch("/api/players", {
        cache: "no-store",
      });

      const data = await res.json();
      setPlayers(data);
    }

    fetchPlayers();
    // listen to players:joined event
    socket.on("players:joined", (players) => {
      setPlayers(players);
    });

    return () => {
      socket.off("players:joined");
    };
  }, []);
  

  const connected = players.length;
  const remaining = MAX_PLAYERS - connected;
  const progress = Math.min((connected / MAX_PLAYERS) * 100, 100);

  return (
    <main className="min-h-screen bg-[#12110D] text-[#FAEFD6]">
      <PanelHeader nbPlayers={connected} />

      <div className="grid gap-6 p-4 lg:grid-cols-[260px_1fr] lg:p-8">
        <aside className="rounded-xl border border-white/10 bg-[#1A1812] p-5" />

        <section>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-text text-xs uppercase tracking-[0.2em] text-white/35">
                Salle d'attente
              </p>

              <h2 className="mt-1 font-display text-5xl uppercase leading-none text-white/55 lg:text-6xl">
                <span className="text-[#F2B935]">{connected}</span>{" "}
                <span>/ {MAX_PLAYERS} connectés</span>
              </h2>
            </div>

            <Link
              href="/panel/panel-manche"
              className="rounded-xl bg-[#F2B935] px-8 py-4 text-center font-display text-lg uppercase text-black shadow-[0_5px_0_#C77F3A] lg:text-xl"
            >
              Lancer la 1ère manche →
            </Link>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-linear-to-r from-[#F2B935] to-[#7FBE6A]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {players.map((player, index) => (
              <div
                key={player.id ?? `${player.pseudo}-${index}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#1A1812] px-3 py-3"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F2B935] font-display text-sm text-black">
                  {player.pseudo[0]?.toUpperCase()}
                </span>

                <span className="truncate font-text text-sm font-bold">
                  {player.pseudo}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-white/10 py-3 text-center font-text text-sm text-white/30">
            {remaining > 0 ? `${remaining} places restantes` : "Salle complète"}
          </div>
        </section>
      </div>
    </main>
  );
}
