import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Target,
} from "lucide-react";

import Link from "next/link";

export default function CareerMatchCard({
  career,
  skillGap,
}) {
  const matchPercentage =
    Math.min(
      Math.max(
        Number(career?.matchPercentage) || 0,
        0
      ),
      100
    );

  const strongestArea =
    skillGap?.matchedSkills?.[0] ||
    "Complete your assessment";

  const recommendedFocus =
    skillGap?.missingSkills?.[0] ||
    "Continue improving your skills";

  if (!career) {
    return (
      <div className="glass gradient-border rounded-3xl p-6">

        <div className="flex h-[320px] flex-col items-center justify-center text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
            <Target className="h-7 w-7 text-violet-400" />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            No career recommendation yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Complete your assessment to receive
            personalized AI career recommendations.
          </p>

          <Link
            href="/assessmentpage"
            className="mt-6 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
          >
            Start Assessment
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="glass gradient-border relative overflow-hidden rounded-3xl p-6">

      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
              Your #1 Career Match
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {career.name}
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
              {career.reason ||
                "Based on your assessment, skills, interests, and learning profile."}
            </p>

          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10">
            <Target className="h-7 w-7 text-violet-400" />
          </div>

        </div>

        <div className="mt-7">

          <div className="flex items-end justify-between">

            <span className="text-xs text-slate-500">
              AI Compatibility
            </span>

            <span className="text-3xl font-bold text-violet-400">
              {matchPercentage}%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">

            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 transition-all duration-1000"
              style={{
                width: `${matchPercentage}%`,
              }}
            />

          </div>

        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">

            <BrainCircuit className="h-5 w-5 text-cyan-400" />

            <p className="mt-3 text-xs text-slate-500">
              Strongest Skill
            </p>

            <p className="mt-1 text-sm font-semibold">
              {strongestArea}
            </p>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">

            <CheckCircle2 className="h-5 w-5 text-emerald-400" />

            <p className="mt-3 text-xs text-slate-500">
              Recommended Focus
            </p>

            <p className="mt-1 text-sm font-semibold">
              {recommendedFocus}
            </p>

          </div>

        </div>

        <Link
          href="/careerspage"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-violet-300"
        >
          Explore career details

          <ArrowRight className="h-4 w-4 text-violet-400 transition-transform group-hover:translate-x-1" />
        </Link>

      </div>

    </div>
  );
}