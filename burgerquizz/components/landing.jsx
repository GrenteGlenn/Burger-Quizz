import { MoveRight } from "lucide-react";
import React from "react";

const BP = {
  black: "#000000",
  blue: "#2D5BAA",
  blueSoft: "#95C8E8",
  red: "#C72E25",
  yellow: "#F2B935",
  yellowDeep: "#C77F3A",
  cream: "#FAEFD6",
};

const logoRows = [
  [
    { char: "B", bg: BP.blue, color: BP.blueSoft, r: -2, y: 2 },
    { char: "U", bg: BP.red, color: BP.cream, r: -1, y: 1 },
    { char: "R", bg: BP.yellow, color: BP.cream, r: -4, y: 0 },
    { char: "G", bg: BP.blue, color: BP.blueSoft, r: 3, y: -3 },
    { char: "E", bg: BP.red, color: BP.cream, r: -2, y: 1 },
    { char: "R", bg: BP.yellow, color: BP.cream, r: 2, y: 0 },
  ],
  [
    { char: "P", bg: BP.blue, color: BP.blueSoft, r: 0, y: 0 },
    { char: "A", bg: BP.red, color: BP.cream, r: 1, y: 2 },
    { char: "R", bg: BP.yellow, color: BP.cream, r: -4, y: -1 },
    { char: "T", bg: BP.blue, color: BP.blueSoft, r: 3, y: 1 },
    { char: "Y", bg: BP.red, color: BP.cream, r: 2, y: -1 },
  ],
];

export function BurgerPartyLogo({ className = "", tileClassName = "" }) {
  return (
    <div
      className={`flex flex-col items-center gap-[0.28em] font-letter leading-none ${className}`}
    >
      {logoRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-end gap-[0.08em]">
          {row.map((l, i) => (
            <span
              key={`${l.char}-${i}`}
              className={`grid place-items-center shadow-[0_0.08em_0_rgba(0,0,0,.22)] ${tileClassName}`}
              style={{
                width: "0.72em",
                height: "1.04em",
                background: l.bg,
                color: l.color,
                transform: `rotate(${l.r}deg) translateY(${l.y}px)`,
              }}
            >
              {l.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function PaintBlob({ color = BP.yellow, className = "" }) {
  return (
    <div className={`absolute ${className}`} aria-hidden="true">
      <svg viewBox="0 0 130 115" className="h-full w-full drop-shadow-sm">
        <path
          d="M18 52C6 43 9 27 23 24c5-16 24-17 33-7 14-19 42-8 40 12 20 5 22 35 5 43 7 19-14 34-31 22-13 15-38 10-40-9-21 2-30-20-12-33Z"
          fill={color}
        />
        <circle cx="12" cy="96" r="5" fill={color} />
        <circle cx="112" cy="91" r="7" fill={color} />
        <circle cx="105" cy="17" r="6" fill={color} />
      </svg>
    </div>
  );
}

export function BurgerMascot({ className = "" }) {
  return (
    <svg
      viewBox="0 0 160 105"
      className={className}
      role="img"
      aria-label="Burger mascot"
    >
      <ellipse cx="80" cy="38" rx="56" ry="30" fill="#D79750" />
      <path d="M25 42Q80 6 135 42v6Q80 18 25 48Z" fill="#E8B374" opacity=".7" />
      <ellipse
        cx="54"
        cy="35"
        rx="4"
        ry="5"
        fill="#FAEFD6"
        transform="rotate(-18 54 35)"
      />
      <ellipse
        cx="78"
        cy="25"
        rx="4"
        ry="5"
        fill="#FAEFD6"
        transform="rotate(8 78 25)"
      />
      <ellipse
        cx="102"
        cy="34"
        rx="4"
        ry="5"
        fill="#FAEFD6"
        transform="rotate(17 102 34)"
      />
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
  );
}

export function BurgerButton({
  children = "C'est parti",
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full rounded-xl bg-[#F2B935] px-6 py-4 text-center font-display text-xl uppercase tracking-wide text-black shadow-[0_7px_0_#C77F3A] transition active:translate-y-1 active:shadow-[0_3px_0_#C77F3A] sm:text-2xl ${className}`}
    >
      {children}
    </button>
  );
}

// Page component for the landing page, which can be used in app/start/page.tsx
export function BurgerPartyLanding({ onStart }) {
  return (
    <main className=" bg-black px-4 py-8 text-[#FAEFD6] sm:px-6 lg:grid lg:place-items-center lg:py-12">
      <div className=" flex min-h-[calc(100vh-4rem)] w-full max-w-97.5 flex-col items-center justify-center overflow-hidden rounded-none bg-black px-8 text-center sm:min-h-190 sm:rounded-4xl sm:shadow-2xl lg:max-w-115 lg:px-10">
        <PaintBlob
          color={BP.yellow}
          className="-left-8 -top-4 h-28 w-32 sm:h-32 sm:w-36"
        />
        <PaintBlob
          color={BP.red}
          className="-right-10 bottom-28 h-32 w-36 rotate-20 sm:bottom-24 sm:h-40 sm:w-44"
        />

        <div className="relative z-10 flex w-full flex-col items-center">
          <BurgerPartyLogo className="text-[3.2rem] sm:text-[3.8rem]" />

          <BurgerMascot className="mt-9 w-32 sm:mt-10 sm:w-40" />

          <h1 className="mt-10 max-w-85 font-display text-[1.68rem] uppercase leading-[.95] tracking-tight text-[#FAEFD6] sm:text-[2rem]">
            La partie commence dans un instant.
          </h1>

          <p className="mt-5 max-w-71.25 font-text text-base font-bold leading-snug text-[#FAEFD6]/70 sm:max-w-82.5 sm:text-lg">
            Choisis un pseudo, l'animateur lance la partie quand tout le monde
            est dans la salle.
          </p>

          <BurgerButton onClick={onStart} className="mt-9 sm:mt-10">
            C'est parti <MoveRight className="inline-block ml-2" size={24} />
          </BurgerButton>
        </div>
      </div>
    </main>
  );
}

export default function Landing() {
  return <BurgerPartyLanding />;
}
