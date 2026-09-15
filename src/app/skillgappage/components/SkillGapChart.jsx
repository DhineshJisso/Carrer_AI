"use client";

import { BarChart3, CheckCircle2, CircleAlert } from "lucide-react";

export default function SkillGapChart({ skills = [] }) {
  // Defensive fallbacks to prevent 0 division/rendering breaks
  const validSkills = Array.isArray(skills) ? skills : [];

  const strongSkills = validSkills.filter(
    (skill) => (skill.status === "strong" || skill.current >= (skill.required || 80))
  );

  const gapSkills = validSkills.filter(
    (skill) => (skill.status === "gap" || skill.current < (skill.required || 80))
  );

  const totalCurrent = validSkills.reduce((total, skill) => total + (Number(skill.current) || 0), 0);
  const averageReadiness = validSkills.length > 0 
    ? Math.round(totalCurrent / validSkills.length) 
    : 0;

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Skill Performance</h2>
            <p className="mt-1 text-xs text-slate-600">
              Personalized comparison based on your assessment
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {validSkills.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">No skill performance data loaded yet.</p>
        ) : (
          validSkills.map((skill) => {
            const requiredVal = skill.required || 80;
            const currentVal = skill.current || 0;
            const gap = Math.max(requiredVal - currentVal, 0);
            const hasGap = gap > 0;

            return (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {hasGap ? (
                      <CircleAlert className="h-3.5 w-3.5 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    )}
                    <span className="text-xs font-medium text-slate-300">
                      {skill.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-semibold text-violet-400">
                      {currentVal}%
                    </span>
                    <span className="text-slate-700">/</span>
                    <span className="text-slate-500">{requiredVal}%</span>
                  </div>
                </div>

                <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/10"
                    style={{ width: `${Math.min(requiredVal, 100)}%` }}
                  />
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${
                      hasGap
                        ? "bg-gradient-to-r from-violet-500 to-cyan-400"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                    }`}
                    style={{ width: `${Math.min(currentVal, 100)}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between">
                  <span className="text-[9px] text-slate-700">
                    Current proficiency
                  </span>
                  {hasGap ? (
                    <span className="text-[9px] text-amber-400">
                      {gap}% improvement needed
                    </span>
                  ) : (
                    <span className="text-[9px] text-emerald-400">
                      Career requirement achieved
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 grid gap-3 border-t border-white/5 pt-6 sm:grid-cols-3">
        <Summary
          label="Strong Skills"
          value={strongSkills.length}
          type="success"
        />
        <Summary
          label="Skills to Improve"
          value={gapSkills.length}
          type="warning"
        />
        <Summary
          label="Average Readiness"
          value={`${averageReadiness}%`}
          type="primary"
        />
      </div>
    </div>
  );
}

function Summary({ label, value, type }) {
  const valueClass =
    type === "success"
      ? "text-emerald-400"
      : type === "warning"
      ? "text-amber-400"
      : "text-violet-400";

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
      <p className="text-[9px] uppercase tracking-[0.14em] text-slate-600">
        {label}
      </p>
      <p className={`mt-1 text-xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}