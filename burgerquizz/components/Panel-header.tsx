interface PanelHeaderProps {
  nbPlayers?: number;
}

export default function PanelHeader(props: PanelHeaderProps) {
  const { nbPlayers } = props;

  return (
    <div>
      <header className="flex flex-col gap-4 border-b border-white/10 bg-[#1A1812] px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍔</span>
          <h1 className="font-display text-xl uppercase tracking-wide">
            Burger Party
          </h1>
          <span className="rounded bg-[#F2B935]/20 px-2 py-1 font-text text-xs font-bold uppercase text-[#F2B935]">
            Console animateur
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-text text-sm text-white/60">
          <span className="hidden h-6 w-px bg-white/10 lg:block" />

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#7FBE6A]" />
            {nbPlayers} / 137 connectés
          </span>

          <span className="rounded bg-[#7FBE6A]/20 px-3 py-1 text-xs font-bold uppercase text-[#A9DC8F]">
            En partie
          </span>

          {/* <button className="rounded bg-white/10 px-3 py-2 font-bold text-white">
            Pause
          </button>

          <button className="rounded bg-[#C72E25]/25 px-3 py-2 font-bold text-[#F5A8A4]">
            Fin de partie
          </button> */}
        </div>
      </header>
    </div>
  );
}
