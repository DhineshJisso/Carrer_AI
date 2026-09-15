"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  User,
} from "lucide-react";

import {
  useSearchParams,
} from "next/navigation";

import ProgressOverview from "./components/ProgressOverview";
import ProgressChart from "./components/ProgressChart";
import RecentAchievements from "./components/RecentAcheivements";

import {
  getCareerProgress,
} from "../interceptor/Axios";


export default function ProgressPage() {

  const searchParams =
    useSearchParams();


  // ==========================================
  // CAREER FROM URL
  // ==========================================

  const career =
    searchParams.get("career") ||
    "Your Career";


  const [progress, setProgress] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [user, setUser] =
    useState(null);


  // ==========================================
  // FETCH USER PROFILE FROM LOCALSTORAGE
  // ==========================================

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("User parse error:", err);
      }
    }

  }, []);


  // ==========================================
  // FETCH PROGRESS
  // ==========================================

  useEffect(() => {

    const fetchProgress = async () => {

      try {

        setLoading(true);
        setError("");


        console.log(
          "FETCHING PROGRESS FOR:",
          career
        );


        const response =
          await getCareerProgress(
            career
          );


        console.log(
          "PROGRESS RESPONSE:",
          response.data
        );


        setProgress(
          response.data
        );

      } catch (error) {

        console.error(
          "Progress Fetch Error:",
          error
        );


        setError(
          error.response?.data?.message ||
          error.message ||
          "Failed to load progress"
        );

      } finally {

        setLoading(false);

      }
    };


    fetchProgress();

  }, [career]);


  // ==========================================
  // DYNAMIC USER VALUES
  // ==========================================

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


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <main className="min-h-screen bg-[#080b14] text-white">

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />

            <p className="mt-4 text-sm text-slate-500">
              Loading your progress...
            </p>

          </div>

        </div>

      </main>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <main className="min-h-screen bg-[#080b14] text-white">

        <div className="flex min-h-screen items-center justify-center px-5">

          <div className="glass rounded-3xl p-8 text-center">

            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-5 rounded-xl bg-violet-500 px-5 py-2 text-sm font-semibold"
            >
              Try Again
            </button>

          </div>

        </div>

      </main>
    );
  }


  // ==========================================
  // DEFAULT PROGRESS
  // ==========================================

  const currentProgress =
    progress || {

      overallProgress: 0,

      completedModules: 0,

      totalModules: 0,

      learningHours: 0,

      currentStreak: 0,

      totalBadges: 0,

      skills: [],

      weeklyActivity: [],

      achievements: [],
    };


  const skillsCount =
    currentProgress.skills?.filter(
      (skill) =>
        skill.completed
    ).length || 0;


  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#080b14] text-white">


      {/* HEADER */}

      <header className="border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

          <Link
            href={`/roadmappage?career=${encodeURIComponent(
              career
            )}`}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >

            <ArrowLeft className="h-4 w-4" />

            Roadmap

          </Link>

          <Link href="/" className="cursor-pointer">
            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">

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


          {/* DYNAMIC PROFILE AVATAR & HOVER */}
          <div className="group relative">

            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300 transition hover:scale-105">
              {userInitial}
            </div>

            <div className="pointer-events-none absolute right-0 top-12 w-56 translate-y-2 rounded-2xl border border-white/10 bg-[#111827] p-4 opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 z-50">

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


      {/* CONTENT */}

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">


        {/* HERO */}

        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-500/[0.09] via-transparent to-cyan-400/[0.05] p-6 sm:p-8">

          <div className="relative z-10 max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-medium text-emerald-300">

              <TrendingUp className="h-3.5 w-3.5" />

              YOUR LEARNING PROGRESS

            </div>


            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">

              Keep building your

              <span className="gradient-text">
                {" "}future.
              </span>

            </h1>


            <p className="mt-4 text-sm leading-7 text-slate-500">

              Track your learning activity,
              completed roadmap stages,
              skill development, and
              career readiness in one place.

            </p>


            {/* CAREER */}

            <div className="mt-5 inline-flex rounded-xl border border-violet-400/10 bg-violet-500/5 px-4 py-2">

              <span className="text-xs text-slate-500">
                Career:
              </span>

              <span className="ml-2 text-xs font-semibold text-violet-300">
                {career}
              </span>

            </div>

          </div>

        </section>


        {/* OVERVIEW */}

        <section className="mt-6">

          <ProgressOverview
            progress={currentProgress}
          />

        </section>


        {/* STATS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={
              <Target className="h-5 w-5 text-violet-400" />
            }
            label="Career Progress"
            value={`${currentProgress.overallProgress}%`}
            sub="Overall readiness"
          />


          <StatCard
            icon={
              <Flame className="h-5 w-5 text-orange-400" />
            }
            label="Learning Streak"
            value={`${currentProgress.currentStreak} Days`}
            sub="Keep it going!"
          />


          <StatCard
            icon={
              <BookOpen className="h-5 w-5 text-cyan-400" />
            }
            label="Modules Completed"
            value={
              currentProgress.completedModules
            }
            sub={`of ${currentProgress.totalModules} modules`}
          />


          <StatCard
            icon={
              <Award className="h-5 w-5 text-emerald-400" />
            }
            label="Skills Gained"
            value={skillsCount}
            sub="Skills completed"
          />

        </section>


        {/* CHART */}

        <section className="mt-8">

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
              Weekly Activity
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Your learning activity
            </h2>

          </div>


          <ProgressChart
            progress={currentProgress}
          />

        </section>


        {/* ACHIEVEMENTS */}

        <section className="mt-8">

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
              Achievements
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Recent achievements
            </h2>

          </div>


          <RecentAchievements
            progress={currentProgress}
          />

        </section>


        {/* CONTINUE */}

        <section className="mt-8 flex flex-col gap-5 rounded-3xl border border-white/5 bg-gradient-to-r from-violet-500/[0.08] to-cyan-400/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

              <Rocket className="h-5 w-5 text-violet-400" />

            </div>


            <div>

              <h2 className="text-lg font-semibold">
                Continue your roadmap
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your next learning stage is waiting for you.
              </p>

            </div>

          </div>


          <Link
            href={`/roadmappage?career=${encodeURIComponent(
              career
            )}`}
            className="button-glow inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
          >

            Continue Learning

            <ArrowRight className="h-4 w-4" />

          </Link>

        </section>

      </div>

    </main>
  );
}


/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

function StatCard({
  icon,
  label,
  value,
  sub,
}) {

  return (
    <div className="glass glass-hover rounded-2xl p-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03]">

        {icon}

      </div>

      <p className="mt-4 text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {sub}
      </p>

    </div>
  );
}