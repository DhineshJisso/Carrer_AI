"use client";

import { useEffect, useState } from "react";
import Navbar from "../app/components/layout/Navbar";
import Link from "next/link";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  LineChart,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import api from "../app/interceptor/Axios";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD USER PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        // User not logged in
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await api.get("/profile/me");

        if (response.data?.success) {
          setProfile(response.data.profile);
        }
      } catch (error) {
        console.error(
          "HOME PROFILE ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =====================================================
  // DYNAMIC VALUES
  // =====================================================

  const careerGoal =
    profile?.careerGoal || "Complete your assessment";

  const careerReadiness =
    Number(profile?.careerReadiness) || 0;

  const assessmentScore =
    Number(profile?.assessmentScore) || 0;

  const skills = Array.isArray(profile?.skills)
    ? profile.skills
    : [];

  // =====================================================
  // GET SKILL VALUE
  // =====================================================

  const getSkillData = (skill, index) => {
    let name = "";
    let level = 0;

    if (typeof skill === "object" && skill !== null) {
      name =
        skill.name ||
        skill.skillName ||
        "Unknown Skill";

      level =
        Number(
          skill.level ??
          skill.percentage ??
          skill.score ??
          0
        );
    } else {
      name = skill;
      
      // Fallback only when backend returns skill names
      const fallbackLevels = [94, 86, 72, 61];

      level =
        fallbackLevels[index] || 50;
    }

    return {
      name,
      level: Math.min(
        Math.max(level, 0),
        100
      ),
    };
  };

  // Show only first 4 skills
  const displaySkills = skills
    .slice(0, 4)
    .map(getSkillData);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b14] text-white">

      <Navbar />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32 sm:px-8 lg:px-12">

        {/* Background Effects */}

        <div className="career-glow left-[-180px] top-[180px]" />

        <div className="career-glow-cyan right-[-180px] top-[100px]" />

        <div className="career-grid absolute inset-0 opacity-40" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="fade-up">

            {/* AI Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs font-medium text-violet-300 backdrop-blur-md">

              <Sparkles className="h-3.5 w-3.5" />

              AI-POWERED CAREER INTELLIGENCE

              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 pulse-animation" />

            </div>
 
            {/* Heading */}

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">

              Your Skills.
              <br />

              <span className="gradient-text">
                Your Path.
              </span>

              <br />

              Your Future.

            </h1>

            {/* Description */}

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">

              Discover the career path that fits you best with
              personalized AI insights, skill-gap analysis, and
              an intelligent roadmap built around your goals.

            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/assessmentpage"
                className="button-glow group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-violet-400"
              >

                Start Your Assessment

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

              </Link>
              

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-300 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >

                Explore How It Works

              </a>

            </div>

            {/* Trust Points */}

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Personalized recommendations
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Skill-gap insights
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Learning roadmap
              </div>

            </div>

          </div>

          {/* =================================================
              AI VISUAL
          ================================================= */}

          <div className="relative hidden lg:block">

            <div className="relative mx-auto h-[520px] w-full max-w-[560px]">

              {/* Outer Glow */}

              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

              {/* Main Card */}

              <div className="glass gradient-border absolute left-1/2 top-1/2 w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 shadow-2xl shadow-black/40">

                {/* Card Header */}

                <div className="flex items-center justify-between border-b border-white/10 pb-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

                      <BrainCircuit className="h-5 w-5 text-violet-400" />

                    </div>

                    <div>

                      <p className="text-sm font-semibold text-white">
                        Career Intelligence
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Personalized analysis
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    AI Active

                  </div>

                </div>

                {/* =================================================
                    CAREER MATCH
                ================================================= */}

                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.025] p-5">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-xs text-slate-500">
                        Top Career Match
                      </p>

                      <h3 className="mt-1 max-w-[220px] text-xl font-semibold">
                        {loading
                          ? "Analyzing..."
                          : careerGoal}
                      </h3>

                    </div>

                    <div className="text-right">

                      <p className="text-3xl font-bold text-violet-400">

                        {loading
                          ? "--"
                          : `${careerReadiness}%`}

                      </p>

                      <p className="text-[10px] text-slate-500">
                        compatibility
                      </p>

                    </div>

                  </div>

                  {/* Progress */}

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                      style={{
                        width: `${careerReadiness}%`,
                      }}
                    />

                  </div>

                </div>

                {/* =================================================
                    SKILL ANALYSIS
                ================================================= */}

                <div className="mt-4">

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-xs font-medium text-slate-300">
                      Skill Readiness
                    </p>

                    <p className="text-xs text-slate-500">

                      {loading
                        ? "--"
                        : `${careerReadiness}%`}

                    </p>

                  </div>

                  <div className="space-y-3">

                    {loading ? (

                      <>
                        <SkillSkeleton />
                        <SkillSkeleton />
                        <SkillSkeleton />
                        <SkillSkeleton />
                      </>

                    ) : displaySkills.length > 0 ? (

                      displaySkills.map((skill, index) => (

                        <SkillRow
                          key={`${skill.name}-${index}`}
                          name={skill.name}
                          percentage={`${skill.level}%`}
                          width={`${skill.level}%`}
                        />

                      ))

                    ) : (

                      <div className="rounded-xl border border-dashed border-white/10 p-4 text-center">

                        <p className="text-[10px] text-slate-600">
                          Complete your assessment to see your skills.
                        </p>

                      </div>

                    )}

                  </div>

                </div>

                {/* =================================================
                    RECOMMENDATION
                ================================================= */}

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-3.5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">

                    <TrendingUp className="h-4 w-4 text-cyan-400" />

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-white">
                      Recommended next step
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-500">

                      {skills.length > 0
                        ? "Continue strengthening your priority skills"
                        : "Complete your assessment to get recommendations"}

                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  FLOATING CAREER CARD
              ================================================= */}

              <div className="float-animation glass absolute -right-2 top-16 w-44 rounded-2xl p-4 shadow-xl shadow-black/30">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">

                    <Target className="h-4 w-4 text-emerald-400" />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-500">
                      Career Match
                    </p>

                    <p className="text-sm font-bold text-white">

                      {loading
                        ? "--"
                        : `${careerReadiness}%`}

                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  FLOATING ROADMAP CARD
              ================================================= */}

              <div className="glass absolute -bottom-2 -left-2 w-48 rounded-2xl p-4 shadow-xl shadow-black/30">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10">

                    <Compass className="h-4 w-4 text-violet-400" />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-500">
                      Your Roadmap
                    </p>

                    <p className="text-xs font-semibold text-white">
                      Personalized path
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="relative border-t border-white/5 px-6 py-24 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">

              <Zap className="h-4 w-4" />

              How it works

            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">

              From self-discovery to

              <span className="gradient-text">
                {" "}career clarity.
              </span>

            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">

              CareerAI turns your skills, interests, education, and
              goals into a personalized career strategy.

            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            <FeatureCard
              number="01"
              icon={<GraduationCap className="h-5 w-5" />}
              title="Tell us about you"
              description="Complete a guided assessment covering your education, skills, interests, experience, and career preferences."
            />

            <FeatureCard
              number="02"
              icon={<BrainCircuit className="h-5 w-5" />}
              title="AI analyzes your profile"
              description="Our recommendation engine compares your profile against career requirements to identify your strongest matches."
            />

            <FeatureCard
              number="03"
              icon={<LineChart className="h-5 w-5" />}
              title="Get your career roadmap"
              description="Discover your match score, skill gaps, recommended learning path, and practical next steps."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          CAREER INSIGHTS
      ===================================================== */}

      <section
        id="careers"
        className="relative border-t border-white/5 px-6 py-24 sm:px-8 lg:px-12"
      >

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">

              <Target className="h-4 w-4" />

              Personalized insights

            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">

              Know where you stand.

              <br />

              <span className="gradient-text">
                Know what to learn next.
              </span>

            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">

              Instead of guessing which career is right for you,
              CareerAI gives you measurable insights that help you
              make confident decisions.

            </p>

            <Link
              href="/assessmentpage"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >

              Discover your career match

              <ChevronRight className="h-4 w-4 text-violet-400 transition-transform group-hover:translate-x-1" />

            </Link>

          </div>

          {/* Insight Cards */}

          <div className="grid gap-4 sm:grid-cols-2">

            {/* Career Match */}

            <InsightCard
              icon={<Target className="h-5 w-5" />}
              title="Career Match"
              value={
                loading
                  ? "--"
                  : `${careerReadiness}%`
              }
              description={
                careerGoal !== "Complete your assessment"
                  ? `Best-fit career: ${careerGoal}`
                  : "Complete your assessment to discover your best-fit career."
              }
            />

            {/* Skill Readiness */}

            <InsightCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Skill Readiness"
              value={
                loading
                  ? "--"
                  : `${careerReadiness}%`
              }
              description="Your current readiness for the selected career."
            />

            {/* Skill Gaps */}

            <InsightCard
              icon={<Zap className="h-5 w-5" />}
              title="Skill Gaps"
              value="—"
              description="Priority skill gaps will appear after skill analysis."
            />

            {/* Roadmap */}

            <InsightCard
              icon={<Compass className="h-5 w-5" />}
              title="Roadmap"
              value="—"
              description="Your personalized learning roadmap."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative px-6 py-24 sm:px-8 lg:px-12">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.02] to-cyan-400/[0.06] p-8 text-center sm:p-12 lg:p-16">

          <div className="career-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">

              <Sparkles className="h-6 w-6 text-violet-400" />

            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">

              Your next career move

              <span className="gradient-text">
                {" "}starts here.
              </span>

            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">

              Take the assessment and let CareerAI help you turn
              your potential into a clear, actionable career path.

            </p>

            <Link
              href="/assessmentpage"
              className="button-glow group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >

              Start Your Journey

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/5 px-6 py-8 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>

            <p className="text-sm font-bold text-white">
              Career<span className="text-violet-400">AI</span>
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Your Skills. Your Path. Your Future.
            </p>

          </div>

          <p className="text-xs text-slate-600">
            © 2026 CareerAI. Built for smarter career decisions.
          </p>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   SKILL ROW
========================================================= */

function SkillRow({
  name,
  percentage,
  width,
}) {
  return (
    <div>

      <div className="mb-1.5 flex items-center justify-between">

        <span className="text-[11px] text-slate-400">
          {name}
        </span>

        <span className="text-[10px] font-medium text-slate-500">
          {percentage}
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
          style={{
            width,
          }}
        />

      </div>

    </div>
  );
}


/* =========================================================
   SKILL SKELETON
========================================================= */

function SkillSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="mb-1.5 flex items-center justify-between">

        <div className="h-2.5 w-20 rounded bg-white/5" />

        <div className="h-2 w-7 rounded bg-white/5" />

      </div>

      <div className="h-1.5 rounded-full bg-white/5" />

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  number,
  icon,
  title,
  description,
}) {
  return (
    <div className="glass glass-hover group rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          {icon}
        </div>

        <span className="text-xs font-semibold text-slate-700">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   INSIGHT CARD
========================================================= */

function InsightCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="glass glass-hover rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>

      </div>

      <h3 className="mt-5 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}