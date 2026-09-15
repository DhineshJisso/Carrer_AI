"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Map,
  Sparkles,
  Target,
  UserRound,
  X,
} from "lucide-react";


export default function Sidebar({
  isOpen = false,
  onClose = () => {},
}) {

  const pathname = usePathname();


  // ==========================================
  // SIDEBAR MENU
  // ==========================================

  const menuItems = [

    {
      name: "Dashboard",
      href: "/dashboardpage",
      icon: LayoutDashboard,
    },

    {
      name: "Assessment",
      href: "/assessmentpage",
      icon: ClipboardCheck,
    },

    {
      name: "Career Matches",
      href: "/careerspage",
      icon: Target,
    },

    {
      name: "Skill Gap",
      href: "/skillgappage",
      icon: BarChart3,
    },

    {
      name: "Recommended Courses",
      href: "/coursepage",
      icon: BookOpen,
    },

    {
      name: "Career Roadmap",
      href: "/roadmappage",
      icon: Map,
    },

    {
      name: "Job Opportunities",
      href: "/jobspage",
      icon: BriefcaseBusiness,
    },

  ];


  // ==========================================
  // ACTIVE ROUTE CHECK
  // ==========================================

  const isActive = (href) => {

    return pathname === href;

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/loginpage";

  };


  return (

    <>

      {/* ====================================== */}
      {/* MOBILE BACKDROP */}
      {/* ====================================== */}

      {isOpen && (

        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
        />

      )}


      {/* ====================================== */}
      {/* SIDEBAR */}
      {/* ====================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px] flex-col
          border-r border-white/5
          bg-[#0b0f19]/95
          px-4 py-5
          backdrop-blur-xl
          transition-transform duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >


        {/* ==================================== */}
        {/* LOGO */}
        {/* ==================================== */}

        <div className="flex items-center justify-between px-2">


          <Link
            href="/"
            onClick={onClose}
            className="group flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">

              <Sparkles className="h-5 w-5 text-white" />

            </div>


            <div>

              <p className="text-base font-bold tracking-tight text-white">

                Career
                <span className="text-violet-400">
                  AI
                </span>

              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">

                Career Intelligence

              </p>

            </div>

          </Link>


          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >

            <X className="h-5 w-5" />

          </button>


        </div>


        {/* ==================================== */}
        {/* NAVIGATION */}
        {/* ==================================== */}

        <nav className="mt-10 flex-1 space-y-1">


          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">

            Career Journey

          </p>


          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              isActive(item.href);


            return (

              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm font-medium
                  transition-all

                  ${
                    active
                      ? `
                        border border-violet-500/20
                        bg-violet-500/10
                        text-violet-300
                      `
                      : `
                        border border-transparent
                        text-slate-400
                        hover:bg-white/[0.04]
                        hover:text-white
                      `
                  }
                `}
              >

                <div
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-lg transition

                    ${
                      active
                        ? "bg-violet-500/15 text-violet-400"
                        : "bg-white/[0.03] text-slate-500 group-hover:text-violet-300"
                    }
                  `}
                >

                  <Icon className="h-4 w-4" />

                </div>


                <span>
                  {item.name}
                </span>


              </Link>

            );

          })}


        </nav>


        {/* ==================================== */}
        {/* BOTTOM */}
        {/* ==================================== */}

        <div className="border-t border-white/5 pt-4">


          {/* PROFILE */}

          <Link
            href="/profilepage"
            onClick={onClose}
            className={`
              mb-2 flex items-center gap-3
              rounded-xl px-3 py-3
              text-sm font-medium
              transition

              ${
                isActive("/profilepage")
                  ? `
                    border border-violet-500/20
                    bg-violet-500/10
                    text-violet-300
                  `
                  : `
                    text-slate-400
                    hover:bg-white/[0.04]
                    hover:text-white
                  `
              }
            `}
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500">

              <UserRound className="h-4 w-4" />

            </div>


            My Profile

          </Link>


          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">

              <LogOut className="h-4 w-4" />

            </div>


            Logout

          </button>


        </div>


      </aside>

    </>

  );

}