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
        text-2xl
        font-extrabold
        uppercase
        text-black
        shadow-[0_6px_0_#C77F3A]
        transition
        active:translate-y-0.5
        active:shadow-[0_2px_0_#C77F3A]
      "
    >
      {children}
    </button>
  );
}
