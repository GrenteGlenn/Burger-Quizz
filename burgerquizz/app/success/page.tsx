// /screens/SuccessScreen.tsx

export default function SuccessScreen() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#218F5B] px-6 pt-5 text-[#FAEFD6]">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 font-text text-sm font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            M
          </span>
          Mayo-Master
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-text text-sm font-bold">
          <span className="text-[#F2B935]">★</span>
          322 pts
        </div>
      </div>

      {/* Background doodles */}
      <div className="absolute left-1 top-24 text-4xl font-black text-white/10">✓</div>
      <div className="absolute right-12 top-32 rotate-[25deg] text-5xl font-black text-white/10">⌞</div>
      <div className="absolute left-20 top-52 rotate-[8deg] text-5xl font-black text-white/10">⌟</div>
      <div className="absolute right-10 bottom-44 rotate-[-25deg] text-5xl font-black text-white/10">⌟</div>
      <div className="absolute left-14 bottom-52 rotate-[20deg] text-5xl font-black text-white/10">⌜</div>

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center">
        <svg
          viewBox="0 0 160 105"
          className="mb-8 w-36"
          role="img"
          aria-label="Burger mascot"
        >
          <ellipse cx="80" cy="38" rx="56" ry="30" fill="#D79750" />
          <path d="M25 42Q80 6 135 42v6Q80 18 25 48Z" fill="#E8B374" opacity=".7" />
          <ellipse cx="54" cy="35" rx="4" ry="5" fill="#FAEFD6" />
          <ellipse cx="78" cy="25" rx="4" ry="5" fill="#FAEFD6" />
          <ellipse cx="102" cy="34" rx="4" ry="5" fill="#FAEFD6" />
          <circle cx="68" cy="48" r="4" fill="#111" />
          <circle cx="91" cy="48" r="4" fill="#111" />
          <path d="M65 57Q80 66 96 57" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M30 63Q42 56 52 63Q62 56 72 63Q82 56 92 63Q104 56 118 63L122 69H28Z" fill="#5E8C3A" />
          <path d="M28 66h104l-9 11Q89 84 38 77Z" fill="#F2B935" />
          <rect x="25" y="72" width="110" height="13" rx="5" fill="#5A2F1B" />
          <path d="M25 83Q80 108 135 83v8Q80 116 25 91Z" fill="#C77F3A" />
        </svg>

        <h1 className="font-display text-[3.2rem] uppercase leading-[0.85] tracking-tight sm:text-7xl">
          Dans la
          <br />
          sauce !
        </h1>

        <p className="mt-4 font-text text-lg font-bold">
          B · Vendeur de hot dog, bien joué.
        </p>

        <div className="mt-9 flex items-center gap-8">
          <div>
            <p className="mb-1 font-text text-xs font-bold uppercase tracking-[0.22em] text-[#FAEFD6]/60">
              Cette question
            </p>
            <p className="font-serif text-5xl italic leading-none">
              +82
            </p>
          </div>

          <div className="h-14 w-px bg-[#FAEFD6]/25" />

          <div>
            <p className="mb-1 font-text text-xs font-bold uppercase tracking-[0.22em] text-[#FAEFD6]/60">
              Total
            </p>
            <p className="font-serif text-5xl italic leading-none">
              322
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}