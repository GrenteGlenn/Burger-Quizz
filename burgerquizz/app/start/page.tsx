import BurgerButton from "@/components/BurgerButton";
import BurgerLogo from "@/components/BurgerLogo";
import { PaintBlob } from "@/components/paintBlob";
import Link from "next/link";
const BP = {
  black: "#000000",
  blue: "#2D5BAA",
  blueSoft: "#95C8E8",
  red: "#C72E25",
  yellow: "#F2B935",
  yellowDeep: "#C77F3A",
  cream: "#FAEFD6",
};

export default function LandingScreen() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8 text-center">
      <PaintBlob
        color={BP.yellow}
        className="-left-8 -top-4 h-28 w-32 sm:h-32 sm:w-36"
      />
      <PaintBlob
        color={BP.red}
        className="-right-10 bottom-28 h-32 w-36 rotate-20 sm:bottom-24 sm:h-40 sm:w-44"
      />

      <BurgerLogo />

      <svg
        viewBox="0 0 160 105"
        className="mt-9 w-32 sm:mt-10 sm:w-40"
        role="img"
        aria-label="Burger mascot"
      >
        <ellipse cx="80" cy="38" rx="56" ry="30" fill="#D79750" />
        <path
          d="M25 42Q80 6 135 42v6Q80 18 25 48Z"
          fill="#E8B374"
          opacity=".7"
        />
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

      <h1 className="mt-10 font-display text-4xl uppercase leading-none">
        La partie commence
        <br />
        dans un instant.
      </h1>

      <p className="mt-5 max-w-70 font-text text-lg text-white/70">
        Choisis un pseudo, l'animateur lance la partie quand tout le monde est
        dans la salle.
      </p>

      <div className="mt-10 w-full">
        <Link href="/pseudo" className="w-full mt-10">
          <BurgerButton>C'est parti</BurgerButton>
        </Link>
      </div>
    </div>
  );
}
