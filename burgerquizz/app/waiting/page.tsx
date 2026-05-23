
import BurgerLogo from "@/components/BurgerLogo";
import { PaintBlob } from "@/components/paintBlob";

export default function WaitingScreen() {
  return (
      <div className="relative flex flex-1 flex-col overflow-hidden px-6 pt-4 text-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-text text-sm font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2B935] font-display text-black">
              M
            </span>
            {/* change this to dynamic user name */}
            <span>Mayo Master</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-text text-sm font-bold">
            <span className="text-[#F2B935]">★</span>
            <span>0 pts</span>
          </div>
        </div>

        <PaintBlob
          color="#8A6A16"
          className="-left-12 top-16 h-36 w-40"
        />

        <PaintBlob
          color="#811E18"
          className="-right-16 bottom-16 h-40 w-44"
        />

        <div className="mt-24 flex flex-col items-center">
          <div className="grid h-40 w-40 place-items-center rounded-full border-4 border-dashed border-white/35">
            <svg
              viewBox="0 0 160 105"
              className="w-32"
              role="img"
              aria-label="Burger mascot"
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
                d="M30 63Q42 56 52 63Q62 56 72 63Q82 56 92 63Q104 56 118 63L122 69H28Z"
                fill="#5E8C3A"
              />
              <path d="M28 66h104l-9 11Q89 84 38 77Z" fill="#F2B935" />
              <rect x="25" y="72" width="110" height="13" rx="5" fill="#5A2F1B" />
              <path d="M25 83Q80 108 135 83v8Q80 116 25 91Z" fill="#C77F3A" />
            </svg>
          </div>

          <h1 className="mt-8 font-display text-4xl uppercase leading-none">
            On t'attend.
          </h1>

          <p className="mt-5 max-w-70 font-text text-lg font-bold leading-snug text-white/65">
            La partie démarre dès que l'animateur lance la première manche.
          </p>

          <div className="mt-10 flex items-center gap-3 rounded-full bg-white/10 px-6 py-4 font-text text-base font-bold">
            <span className="h-3 w-3 rounded-full bg-[#69B95C] shadow-[0_0_10px_#69B95C]" />
            {/* change this to dynamic number of ready players */}
            <span>127 joueurs prêts</span>
          </div>
        </div>
      </div>
  );
}