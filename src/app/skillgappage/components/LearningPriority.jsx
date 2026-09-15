import {
  ArrowRight,
  BookOpen,
  CircleAlert,
  Zap,
} from "lucide-react";

export default function LearningPriority({
  missingSkills = [],
  career,
}) {
  if (!missingSkills.length) {
    return (
      <div className="glass rounded-3xl p-8 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
          <Zap className="h-6 w-6 text-emerald-400" />
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          Amazing! You&apos;re well aligned.
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          No major skill gaps were found for your
          {career} career path.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">

      {missingSkills.map(
        (skill, index) => {

          const priority =
            String(index + 1)
              .padStart(2, "0");

          return (
            <div
              key={skill}
              className="glass glass-hover group rounded-2xl p-5 transition duration-300 hover:-translate-y-1"
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-xs font-bold text-violet-400 transition group-hover:scale-110">
                    {priority}
                  </div>

                  <div>

                    <h3 className="text-sm font-semibold">
                      {skill}
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-600">
                      Recommended learning priority
                    </p>

                  </div>

                </div>

                <Zap className="h-4 w-4 text-amber-400" />

              </div>


              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-400/5 bg-amber-400/[0.03] p-3">

                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                <p className="text-xs leading-5 text-slate-500">

                  Improving {skill} will help strengthen
                  your profile for becoming a {career}.

                </p>

              </div>


              <div className="mt-5 grid grid-cols-3 gap-2">

                <Info
                  label="Priority"
                  value={
                    index === 0
                      ? "High"
                      : index === 1
                        ? "Medium"
                        : "Focus"
                  }
                />

                <Info
                  label="Target"
                  value="80%"
                />

                <Info
                  label="Time"
                  value="2 Weeks"
                />

              </div>


              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-xs font-semibold text-slate-300 transition hover:border-violet-400/20 hover:bg-violet-500/5 hover:text-white">

                <BookOpen className="h-3.5 w-3.5" />

                Start Learning

                <ArrowRight className="h-3.5 w-3.5 text-violet-400" />

              </button>

            </div>
          );
        }
      )}

    </div>
  );
}


function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">

      <p className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-300">
        {value}
      </p>

    </div>
  );
}