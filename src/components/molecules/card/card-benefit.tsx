
function CardBenefit({
  benefit
}: {
  benefit: string
}) {
  return (
    <li className="flex items-center space-x-3">

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DDE8D2] text-[#526746]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </span>

      <span className="font-semibold text-lg leading-[27px] text-[#263A32]">
        {benefit}
      </span>

    </li>
  )
}

export default CardBenefit
