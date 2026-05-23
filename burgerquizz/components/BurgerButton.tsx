interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function BurgerButton({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        relative
        w-full
        rounded-2xl
        bg-[#F2B935]
        py-4
        font-display
        text-2xl
        uppercase
        text-black
        shadow-[0_6px_0_#C77F3A]
        transition
        active:translate-y-[2px]
        active:shadow-[0_2px_0_#C77F3A]
      "
    >
      {children}

      <span className="absolute right-10 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#C72E25]" />
      <span className="absolute right-7 top-1/2 h-3 w-1 -translate-y-1/2 rotate-[-20deg] rounded-full bg-[#C72E25]" />
    </button>
  );
}
