export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="glass glass-hover group relative overflow-hidden rounded-2xl p-5">

      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/5 blur-2xl transition group-hover:bg-violet-500/10" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </p>

        </div>

        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03]">
            <Icon className="h-5 w-5 text-violet-400" />
          </div>
        )}

      </div>

      <p className="relative mt-3 text-xs leading-5 text-slate-600">
        {description}
      </p>

    </div>
  );
}