
function CardStar({
  rating,
  variant,
}: {
  rating: number;
  variant: "review" | "detail";
}) {
  const normalizedRating = Math.max(0, Math.min(5, rating));

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating ${normalizedRating} dari 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const isActive = normalizedRating >= index + 1;

        return (
          <svg
            key={index}
            viewBox="0 0 24 24"
            fill={isActive ? "#8A9B76" : "#D9DED2"}
            className={variant === "detail" ? "h-5 w-5" : "h-5 w-5"}
            aria-hidden="true"
          >
            <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57l-5.9 3.11 1.13-6.58-4.78-4.66 6.6-.96L12 2.5z" />
          </svg>
        );
      })}
    </div>
  );
}

export default CardStar;
