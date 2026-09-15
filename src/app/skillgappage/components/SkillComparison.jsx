import {
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

export default function SkillComparison({
  skills = [],
}) {
  if (!skills.length) {
    return (
      <div className="glass rounded-3xl p-8 text-center text-sm text-slate-500">
        No skill comparison data available.
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">

      <div className="space-y-7">

        {skills.map((skill) => {

          const hasGap =
            skill.status === "gap";

          const gap =
            Math.max(
              skill.required -
              skill.current,
              0
            );

          return (
            <div key={skill.name}>

              <div className="mb-3 flex items-center justify-between gap-4">

                <div className="flex items-center gap-2">

                  {hasGap ? (
                    <CircleAlert className="h-4 w-4 text-amber-400" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}

                  <span className="text-sm font-medium text-slate-200">
                    {skill.name}
                  </span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${hasGap
                        ? "bg-amber-400/10 text-amber-400"
                        : "bg-emerald-400/10 text-emerald-400"
                      }`}
                  >
                    {hasGap
                      ? `${gap}% gap`
                      : "Ready"}
                  </span>

                </div>


                <span className="text-xs text-slate-500">

                  {skill.current}%

                </span>

              </div>


              <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.04]">

                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/10"
                  style={{
                    width: `${skill.required}%`,
                  }}
                />

                <div
                  className={`relative z-10 h-full rounded-full transition-all duration-700 ${hasGap
                      ? "bg-gradient-to-r from-violet-500 to-cyan-400"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                    }`}
                  style={{
                    width: `${skill.current}%`,
                  }}
                />

              </div>


              <div className="mt-2 flex justify-between text-[10px] text-slate-600">

                <span>
                  Current level
                </span>

                <span>
                  Target: {skill.required}%
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}