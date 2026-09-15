"use client";

import AssessmentForm from "./components/AssessmentForm";
import InterestSelector from "./components/InterestSelector";
import SkillSelector from "./components/SkillSelector";

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[#080b14] text-white">

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">

        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-400">
            AI Career Assessment
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Tell us about yourself
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Select your interests and current skills so our AI can
            personalize your career recommendations.
          </p>
        </div>

        <div className="space-y-6">

          <AssessmentForm />

          <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Your Interests
            </h2>

            <InterestSelector />
          </section>

          <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Your Skills
            </h2>

            <SkillSelector />
          </section>

        </div>

      </div>

    </main>
  );
}