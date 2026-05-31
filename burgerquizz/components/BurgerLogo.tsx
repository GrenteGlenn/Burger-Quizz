export default function BurgerLogo() {
  const top = [
    ["B", "#2D5BAA", "#95C8E8", "rotate-[-4deg]"],
    ["U", "#C72E25", "#FAEFD6", "rotate-[-2deg]"],
    ["R", "#F2B935", "#FAEFD6", "rotate-[-5deg]"],
    ["G", "#2D5BAA", "#95C8E8", "rotate-[3deg]"],
    ["E", "#C72E25", "#FAEFD6", "rotate-[-2deg]"],
    ["R", "#F2B935", "#FAEFD6", "rotate-[2deg]"],
  ]

  const bottom = [
    ["P", "#2D5BAA", "#95C8E8", "rotate-[0deg]"],
    ["A", "#C72E25", "#FAEFD6", "rotate-[2deg]"],
    ["R", "#F2B935", "#FAEFD6", "rotate-[-4deg]"],
    ["T", "#2D5BAA", "#95C8E8", "rotate-[3deg]"],
    ["Y", "#C72E25", "#FAEFD6", "rotate-[2deg]"],
  ]
  const Tile = ({ item }: any) => (
    <span
      className={`grid h-12 w-12 place-items-center font-letter text-5xl shadow-md font-horse ${item[3]}`}
      style={{
        background: item[1],
        color: item[2],
      }}
    >
      {item[0]}
    </span>
  )

  return (
    <div className="flex flex-col items-center gap-1 leading-none ">
      <div className="flex gap-1">
        {top.map((item, i) => (
          <Tile key={i} item={item} />
        ))}
      </div>

      <div className="flex gap-1">
        {bottom.map((item, i) => (
          <Tile key={i} item={item} />
        ))}
      </div>
    </div>
  )
}