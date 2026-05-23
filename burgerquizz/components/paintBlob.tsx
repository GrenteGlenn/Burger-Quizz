
const BP = {
  black: "#000000",
  blue: "#2D5BAA",
  blueSoft: "#95C8E8",
  red: "#C72E25",
  yellow: "#F2B935",
  yellowDeep: "#C77F3A",
  cream: "#FAEFD6",
};


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