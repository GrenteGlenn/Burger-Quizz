// /screens/AnswerSentScreen.tsx

import { PaintBlob } from "@/components/paintBlob";

export default function AnswerSentScreen() {
  return (
    <div className="relative flex flex-1 flex-col bg-[#315DAE] overflow-hidden px-6 pt-4 text-center">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-text text-sm font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2B935] font-display text-black">
            M
          </span>

          <span>Mayo-Master</span>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-text text-sm font-bold">
          <span className="text-[#F2B935]">★</span>
          <span>240 pts</span>
        </div>
      </div>

      {/* BLOBS */}
      <PaintBlob color="#B5A26B" className="right-[-40px] top-28 h-32 w-36" />

      <PaintBlob color="#9E3554" className="-left-12 bottom-24 h-32 w-36" />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* CHECK */}
        <div className="relative grid h-40 w-40 place-items-center rounded-full bg-[#F2B935]">
          <div className="absolute inset-[-14px] rounded-full border-[14px] border-white/10" />

          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        </div>

        <h1
          className="
              mt-8
              font-display
              text-5xl
              uppercase
              leading-[0.9]
              text-[#95C8E8]
            "
        >
          Réponse
          <br />
          envoyée
        </h1>

        <p
          className="
              mt-5
              max-w-[280px]
              font-text
              text-lg
              font-bold
              leading-snug
              text-white/45
            "
        >
          Garde le ketchup pour plus tard, l'animateur dévoile la bonne réponse
          dans un instant.
        </p>

        {/* ANSWER CHIP */}
        <div
          className="
              mt-10
              rounded-full
              bg-[#274D91]
              px-6
              py-4
              font-text
              text-sm
              font-bold
              text-white/50
            "
        >
          Ta réponse :{" "}
          <span className="text-[#95C8E8]">B · Vendeur de hot dog</span>
        </div>
      </div>
    </div>
  );
}
