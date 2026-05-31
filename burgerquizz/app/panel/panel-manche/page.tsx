"use client";

import { useEffect, useRef, useState } from "react";
import PanelHeader from "@/components/Panel-header";
import { socket } from "@/lib/socket";

type RoundKey = "nuggets" | "sel-poivre" | "menus";

const rounds: {
  key: RoundKey;
  title: string;
  icon: string;
  answerPage: string;
}[] = [
  {
    key: "nuggets",
    title: "Nuggets",
    icon: "N",
    answerPage: "/answer/answerNug",
  },
  {
    key: "sel-poivre",
    title: "Sel ou poivre",
    icon: "S/P",
    answerPage: "/answer/answerSetP",
  },
  {
    key: "menus",
    title: "Menus",
    icon: "M",
    answerPage: "/answer/answerMenu",
  },
];

const answersByRound = {
  nuggets: [
    ["A", "#C72E25"],
    ["B", "#F2B935"],
    ["C", "#218F5B"],
    ["D", "#5e8bff"],
  ],
  "sel-poivre": [
    ["SEL", "#218F5B"],
    ["POIVRE", "#5e8bff"],
    ["LES_DEUX", "#C72E25"],
  ],
  menus: [
    ["VRAI", "#218F5B"],
    ["FAUX", "#C72E25"],
  ],
};

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
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null,
  );
  const [secondsLeft, setSecondsLeft] = useState(7);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestionIdRef = useRef<string | null>(null);
  const [selectedRound, setSelectedRound] = useState<RoundKey>("nuggets");
  const currentRound = rounds.find((round) => round.key === selectedRound)!;
  const currentAnswers = answersByRound[selectedRound];

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

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  async function startQuestion() {
    if (!selectedAnswer) {
      alert("Sélectionne d'abord la bonne réponse.");
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const res = await fetch("/api/questions/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        round: selectedRound,
        correctAnswer: selectedAnswer,
      }),
    });

    const data = await res.json();

    if (!data.success) return;

    setCurrentQuestionId(data.question.id);
    currentQuestionIdRef.current = data.question.id;
    setSecondsLeft(7);
    setIsQuestionOpen(true);

    socket.emit("question:started", {
      questionId: data.question.id,
      round: selectedRound,
      answerPage: currentRound.answerPage,
      correctAnswer: selectedAnswer,
      startedAt: data.question.startedAt,
    });

    let counter = 7;

    timerRef.current = setInterval(() => {
      counter -= 1;
      setSecondsLeft(counter);

      if (counter <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        closeQuestion(data.question.id);
      }
    }, 1000);
  }
  async function closeQuestion(questionIdParam?: string) {
    const questionId =
      questionIdParam ?? currentQuestionIdRef.current ?? currentQuestionId;
    if (!questionId) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setSecondsLeft(0);
    setIsQuestionOpen(false);

    const res = await fetch("/api/questions/close", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
      }),
    });

    const data = await res.json();

    socket.emit("question:closed", data.question);
  }
  async function revealAnswer() {
    const questionId = currentQuestionIdRef.current ?? currentQuestionId;

    if (!questionId || !selectedAnswer) return;

    const res = await fetch("/api/questions/reveal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
        correctAnswer: selectedAnswer,
      }),
    });

    const data = await res.json();

    if (!data.success) return;

    setLeaderboard(data.players);

    socket.emit("leaderboard:update", data.players);
    socket.emit("question:revealed", {
      questionId,
      round: selectedRound,
      answerPage: currentRound.answerPage,
      correctAnswer: selectedAnswer,
      results: data.results,
      players: data.players,
    });
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
            {rounds.map((round) => {
              const isActive = selectedRound === round.key;

              return (
                <button
                  key={round.key}
                  onClick={() => {
                    if (isQuestionOpen) return;
                    setSelectedRound(round.key);
                    setSelectedAnswer(null);
                  }}
                  className={`
        flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition
        ${
          isActive
            ? "border-[#F2B935] bg-[#F2B935]/10"
            : "border-transparent hover:bg-white/5"
        }
      `}
                >
                  <span
                    className={`
          grid h-8 w-8 place-items-center rounded-md font-display text-sm
          ${isActive ? "bg-[#F2B935] text-black" : "bg-white/10 text-white/45"}
        `}
                  >
                    {round.icon}
                  </span>

                  <p className="font-display text-sm uppercase leading-none">
                    {round.title}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex items-end justify-end border-b border-white/10 bg-[#1A1812] px-6 py-4">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#F2B935] font-display text-2xl">
                  {secondsLeft}
                </div>
                <p className="font-text text-xs uppercase tracking-[0.18em] text-white/35">
                  Secondes
                  <br />
                  restantes
                </p>
              </div>

              <button
                onClick={startQuestion}
                disabled={!selectedAnswer || isQuestionOpen}
                className={`
    rounded-lg px-7 py-4 font-display text-sm uppercase text-black shadow-[0_4px_0_rgba(0,0,0,.25)]
    ${
      selectedAnswer && !isQuestionOpen
        ? "bg-[#69B95C] cursor-pointer"
        : "bg-white/20 cursor-not-allowed opacity-50"
    }
  `}
              >
                Lancer la question
              </button>

              <button
                onClick={() => closeQuestion()}
                disabled={!isQuestionOpen}
                className={`
                  rounded-lg px-7 py-4 font-display text-sm uppercase text-black
                  ${
                    isQuestionOpen
                      ? "bg-[#FAEFD6] cursor-pointer"
                      : "bg-white/20 cursor-not-allowed opacity-50"
                  }
                `}
              >
                ■ Clôturer
              </button>

              <button
                onClick={revealAnswer}
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

                <div
                  className={`mt-4 grid gap-3 ${
                    selectedRound === "menus" ? "grid-cols-2" : "grid-cols-2"
                  }`}
                >
                  {currentAnswers.map(([letter, color]) => {
                    const isSelected = selectedAnswer === letter;

                    return (
                      <button
                        key={letter}
                        onClick={() => setSelectedAnswer(letter)}
                        className={`
          grid h-20 place-items-center rounded-lg border font-display text-3xl uppercase transition
          ${
            isSelected
              ? "scale-105 border-[#FAEFD6] shadow-[0_0_0_3px_rgba(250,239,214,.18)]"
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
