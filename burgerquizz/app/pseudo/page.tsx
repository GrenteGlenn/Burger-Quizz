"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import BurgerButton from "@/components/BurgerButton";
import BurgerLogo from "@/components/BurgerLogo";

export default function PseudoScreen() {
  const router = useRouter();

  const [pseudo, setPseudo] = useState("Mayo-Master");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const cleanPseudo = pseudo.trim();

    if (cleanPseudo.length < 2) {
      setSuccess("");
      setError("Pseudo trop court");
      setAvailable(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `/api/players/check?pseudo=${encodeURIComponent(cleanPseudo)}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      if (data.available) {
        setSuccess(data.message);
        setError("");
        setAvailable(true);
      } else {
        setError(data.message);
        setSuccess("");
        setAvailable(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [pseudo]);

  async function handleSubmit() {
    const cleanPseudo = pseudo.trim();

    if (!available) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo: cleanPseudo }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      setLoading(false);
      return;
    }

    const playersRes = await fetch("/api/players", {
      cache: "no-store",
    });

    const players = await playersRes.json();

    socket.emit("players:joined", players);

    router.push("/waiting");
  }

  return (
    <div className="flex flex-1 flex-col px-6 pt-6">
      <div className="flex justify-center">
        <BurgerLogo />
      </div>

      <div className="mt-10">
        <h1 className="font-display text-5xl uppercase leading-none">
          Ton pseudo
        </h1>

        <p className="mt-3 font-text text-lg text-white/65">
          C'est le nom que verra l'animateur sur le classement. Entre 2 et 20 caractères.
        </p>

        <input
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="mt-6 h-16 w-full rounded-2xl border-2 border-[#F2B935] bg-[#FAEFD6] px-5 font-display text-3xl text-black outline-none shadow-[0_4px_0_#C77F3A]"
        />

        {success && (
          <p className="mt-3 font-text text-sm font-bold text-[#69B95C]">
            {success}
          </p>
        )}

        {error && (
          <p className="mt-3 font-text text-sm font-bold text-[#a80000]">
            ✕ {error}
          </p>
        )}
      </div>

      <div className="mt-auto pb-6">
        <BurgerButton onClick={handleSubmit}>
          {loading ? "Chargement..." : "Rejoindre la partie"}
        </BurgerButton>
      </div>
    </div>
  );
}