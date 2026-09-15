"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  User,
} from "lucide-react";

import api from "../interceptor/Axios";

import SkillComparison from "./components/SkillComparison";
import LearningPriority from "./components/LearningPriority";
import SkillGapChart from "./components/SkillGapChart";

export default function SkillGapPage() {
  const [skillGapData, setSkillGapData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const fetchSkillGap = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get("/skill-gap");

        setSkillGapData(
          response.data.data
        );
      } catch (error) {
        console.error(
          "Skill Gap Fetch Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load skill gap analysis"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkillGap();

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(
          JSON.parse(storedUser)
        );
      } catch (error) {
        console.error(
          "User Parse Error:",
          error
        );
      }
    }
  }, []);

  const skillData = useMemo(() => {
    if (!skillGapData) return [];

    const {
      requiredSkills = [],
      matchedSkills = [],
      missingSkills = [],
    } = skillGapData;

    return requiredSkills.map(
      (skill) => {
        const isMatched =
          matchedSkills.some(
            (item) =>
              item.toLowerCase() ===
              skill.toLowerCase()
          );

        const isMissing =
          missingSkills.some(
            (item) =>
              item.toLowerCase() ===
              skill.toLowerCase()
          );

        /*
          Dynamic UI proficiency

          Later nee assessment model-la
          skill proficiency add pannina
          actual percentage use pannalam.
        */

        let current = 0;

        if (isMatched) {
          current =
            Math.floor(
              Math.random() * 16
            ) + 75;
        }

        if (isMissing) {
          current =
            Math.floor(
              Math.random() * 31
            ) + 35;
        }

        return {
          name: skill,
          current,
          required: 80,
          status:
            isMatched
              ? "strong"
              : "gap",
        };
      }
    );
  }, [skillGapData]);

  const strongSkills =
    skillData.filter(
      (skill) =>
        skill.status === "strong"
    );

  const gapSkills =
    skillData.filter(
      (skill) =>
        skill.status === "gap"
    );

  const estimatedWeeks =
    gapSkills.length * 2;

  const userName =
    user?.name ||
    user?.userName ||
    "Career Explorer";

  const userEmail =
    user?.email ||
    "";

  const userInitial =
    userName
      ?.charAt(0)
      ?.toUpperCase() ||
    "U";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
            <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            Analyzing your skills
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            CareerAI is preparing your personalized analysis...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">
        <div className="glass max-w-md rounded-3xl border border-red-500/10 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            Unable to load skill analysis
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <Link
            href="/careerspage"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
          >
            Explore Careers

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  const career =
    skillGapData?.career ||
    "Your Career";

  const readiness =
    skillGapData?.skillMatchPercentage ||
    0;

  const gapPercentage =
    skillGapData?.skillGapPercentage ||
    0;

  return (
    <main className="min-h-screen bg-[#080b14] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

          <Link
            href="/careerspage"
            className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

            <span className="hidden sm:inline">
              Careers
            </span>
          </Link>

          <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-4 w-4" />
            </div>

            <span className="font-bold">
              Career
              <span className="text-violet-400">
                AI
              </span>
            </span>

          </div>
          </Link>

          <div className="group relative">

            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300 transition hover:scale-105">
              {userInitial}
            </div>

            <div className="pointer-events-none absolute right-0 top-12 w-56 translate-y-2 rounded-2xl border border-white/10 bg-[#111827] p-4 opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                  <User className="h-4 w-4 text-violet-400" />
                </div>

                <div className="min-w-0">

                  <p className="truncate text-xs font-semibold">
                    {userName}
                  </p>

                  <p className="truncate text-[10px] text-slate-500">
                    {userEmail || "CareerAI User"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </header>


      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-500/[0.14] via-[#0b0f19] to-cyan-400/[0.08] p-6 sm:p-8 lg:p-10">

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 left-1/2 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs font-semibold text-violet-300">

              <BrainCircuit className="h-3.5 w-3.5" />

              AI SKILL INTELLIGENCE

            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">

              Know exactly what

              <span className="gradient-text block mt-1">
                to learn next.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">

              Hi {userName}! CareerAI analyzed your
              current skills and compared them with the
              requirements for becoming a{" "}

              <span className="font-semibold text-white">
                {career}
              </span>.

            </p>

          </div>

        </section>


        {/* CAREER TARGET */}

        <section className="mt-6 glass relative overflow-hidden rounded-3xl p-6">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                <Target className="h-6 w-6 text-violet-400" />
              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.16em] text-slate-600">
                  Target Career
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  {career}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Personalized based on your assessment
                </p>

              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="text-right">

                <p className="text-xs text-slate-500">
                  Career Readiness
                </p>

                <p className="text-3xl font-bold text-violet-400">
                  {readiness}%
                </p>

              </div>


              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    #8b5cf6 ${readiness * 3.6}deg,
                    rgba(255,255,255,0.08) 0deg
                  )`,
                }}
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#080b14]">

                  <TrendingUp className="h-5 w-5 text-violet-400" />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* STATS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            }
            title="Matched Skills"
            value={strongSkills.length}
            description="Skills already aligned"
          />

          <StatCard
            icon={
              <CircleAlert className="h-5 w-5 text-amber-400" />
            }
            title="Skill Gaps"
            value={gapSkills.length}
            description="Skills to develop"
          />

          <StatCard
            icon={
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            }
            title="Readiness"
            value={`${readiness}%`}
            description="Career preparedness"
          />

          <StatCard
            icon={
              <Clock3 className="h-5 w-5 text-violet-400" />
            }
            title="Skill Gap"
            value={`${gapPercentage}%`}
            description={`${estimatedWeeks || 0} weeks estimated`}
          />

        </section>


        {/* SKILL COMPARISON */}

        <section className="mt-8">

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.18em] text-violet-400">
              Skill Intelligence
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Your skills vs career requirements
            </h2>

          </div>

          <SkillComparison
            skills={skillData}
          />

        </section>


        {/* LEARNING PRIORITY */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">
              AI Learning Priority
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Focus on these skills next
            </h2>

          </div>

          <LearningPriority
            missingSkills={
              skillGapData?.missingSkills || []
            }
            career={career}
          />

        </section>


        {/* SKILL GAP CHART */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.18em] text-violet-400">
              Performance Overview
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Detailed readiness analysis
            </h2>

          </div>

          <SkillGapChart
            skills={skillData}
          />

        </section>


        {/* CTA */}

        <section className="mt-10 flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-violet-500/[0.12] via-transparent to-cyan-400/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

          <div>

            <div className="flex items-center gap-2 text-violet-400">

              <Sparkles className="h-4 w-4" />

              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Your Next Move
              </span>

            </div>

            <h2 className="mt-3 text-xl font-semibold">

              Turn your skill gaps into progress.

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              You have {gapSkills.length} skills
              remaining to strengthen for your target career.

            </p>

          </div>


          <Link
            href="/roadmappage"
            className="button-glow inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
          >

            Build My Roadmap

            <ArrowRight className="h-4 w-4" />

          </Link>

        </section>

      </div>

    </main>
  );
}


function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] transition group-hover:bg-violet-500/10">
        {icon}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {description}
      </p>

    </div>
  );
}