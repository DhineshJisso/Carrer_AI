import Link from "next/link";

import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Github,
  Heart,
  Mail,
  Map,
  Sparkles,
  Target,
} from "lucide-react";


export default function Footer() {

  const currentYear =
    new Date().getFullYear();


  return (

    <footer className="border-t border-white/5 bg-[#080b14] text-white">


      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">


        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">


          {/* ================================== */}
          {/* BRAND */}
          {/* ================================== */}

          <div>


            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">

                <Sparkles className="h-5 w-5" />

              </div>


              <div>

                <span className="text-lg font-bold">

                  Career
                  <span className="text-violet-400">
                    AI
                  </span>

                </span>


                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">

                  Career Intelligence

                </p>

              </div>

            </Link>


            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">

              Discover the career path that fits you
              best with personalized AI insights,
              skill-gap analysis, learning recommendations,
              and a roadmap built around your goals.

            </p>


            <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">

              <BrainCircuit className="h-4 w-4 text-violet-400" />

              AI-powered career guidance

            </div>


          </div>


          {/* ================================== */}
          {/* PLATFORM */}
          {/* ================================== */}

          <div>


            <h3 className="text-sm font-semibold">

              Platform

            </h3>


            <div className="mt-5 flex flex-col gap-3">


              <FooterLink
                href="/assessmentpage"
                label="Assessment"
              />


              <FooterLink
                href="/careerspage"
                label="Career Matches"
              />


              <FooterLink
                href="/skillgappage"
                label="Skill Gap Analysis"
              />


              <FooterLink
                href="/coursepage"
                label="Courses"
              />


            </div>


          </div>


          {/* ================================== */}
          {/* JOURNEY */}
          {/* ================================== */}

          <div>


            <h3 className="text-sm font-semibold">

              Your Journey

            </h3>


            <div className="mt-5 flex flex-col gap-3">


              <FooterLink
                href="/dashboardpage"
                label="Dashboard"
              />


              <FooterLink
                href="/roadmappage"
                label="Career Roadmap"
              />


              <FooterLink
                href="/jobspage"
                label="Job Opportunities"
              />


              <FooterLink
                href="/profilepage"
                label="My Profile"
              />


            </div>


          </div>


          {/* ================================== */}
          {/* CAREERAI */}
          {/* ================================== */}

          <div>


            <h3 className="text-sm font-semibold">

              CareerAI

            </h3>


            <p className="mt-5 text-sm leading-6 text-slate-500">

              Build skills, track your progress,
              and discover opportunities that
              match your career potential.

            </p>


            <Link
              href="/assessmentpage"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:text-violet-300"
            >

              Start your journey

              <ArrowUpRight className="h-4 w-4" />

            </Link>


          </div>


        </div>


        {/* ==================================== */}
        {/* BOTTOM BAR */}
        {/* ==================================== */}

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">


          <p>

            © {currentYear} CareerAI.
            All rights reserved.

          </p>


          <div className="flex flex-wrap items-center gap-5">


            <span className="flex items-center gap-1.5">

              Built with

              <Heart className="h-3.5 w-3.5 text-violet-400" />

              for your future

            </span>


            <Link
              href="/"
              className="transition hover:text-slate-300"
            >

              Home

            </Link>


            <Link
              href="/profilepage"
              className="transition hover:text-slate-300"
            >

              Profile

            </Link>


          </div>


        </div>


      </div>

    </footer>

  );

}


// ==========================================
// FOOTER LINK COMPONENT
// ==========================================

function FooterLink({
  href,
  label,
}) {

  return (

    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-slate-500 transition hover:text-violet-300"
    >

      <span>
        {label}
      </span>

      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />

    </Link>

  );

}