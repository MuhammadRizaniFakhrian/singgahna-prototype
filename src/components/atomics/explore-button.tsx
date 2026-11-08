
'use client'

export default function ExploreButton() {
  const handleExplore = () => {
    const section = document.getElementById('deals-section');

    if (!section) return;

    const targetPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      110;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleExplore}
      className="inline-flex min-w-[260px] items-center justify-between gap-4 rounded-xl bg-[#263A32] px-8 py-[18px] text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#354D42] hover:-translate-y-1"
    >
      <span>Explore Kos</span>
      <span className="text-xl" aria-hidden="true">→</span>
    </button>
  );
}
