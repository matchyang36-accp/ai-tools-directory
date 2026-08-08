// Placeholder for an AdSense leaderboard. Swap the inner comment block for the
// real AdSense <ins> snippet once your account is approved.
export default function AdSlot({
  label = "AdSense leaderboard 728x90",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-md border border-dashed border-ink-400 bg-black/[0.03] flex items-center justify-center text-[12px] text-ink-400 " +
        className
      }
    >
      {label}
    </div>
  );
}
