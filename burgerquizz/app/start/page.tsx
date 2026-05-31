import BurgerButton from "@/components/BurgerButton";
import BurgerLogo from "@/components/BurgerLogo";
import { PaintBlob } from "@/components/paintBlob";
import { MoveRight } from "lucide-react";
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
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8 text-center bg-[#315DAE]">
      <PaintBlob
        color={BP.yellow}
        className="-left-8 -top-4 h-28 w-32 sm:h-32 sm:w-36"
      />
      <PaintBlob
        color={BP.red}
        className="-right-10 bottom-28 h-32 w-36 rotate-20 sm:bottom-24 sm:h-40 sm:w-44"
      />

      <BurgerLogo />

      <img className="mt-9 w-32 sm:mt-10 sm:w-40" src="image/burger-logo.svg" alt="Burger Logo" />

      <h1 className="mt-10 text-4xl uppercase leading-none font-bold ">
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
          <BurgerButton>
            <span className="font-weight-bold flex items-center justify-center">
              C'est parti <MoveRight className="w-20" />
            </span>
          </BurgerButton>
        </Link>
      </div>
    </div>
  );
}
