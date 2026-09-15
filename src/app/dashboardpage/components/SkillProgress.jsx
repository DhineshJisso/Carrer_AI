export default function SkillProgress({
  name,
  percentage,
}) {
  const safePercentage = Math.min(
    Math.max(Number(percentage) || 0, 0),
    100
  );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs font-medium text-slate-300">
          {name}
        </span>

        <span className="text-xs text-slate-500">
          {safePercentage}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 transition-all duration-1000"
          style={{
            width: `${safePercentage}%`,
          }}
        />

      </div>

    </div>
  );
}