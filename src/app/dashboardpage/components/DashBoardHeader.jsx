import Link from "next/link";
import {
  Bell,
  Sparkles,
  Mail,
} from "lucide-react";

export default function DashboardHeader({
  user,
}) {
  const name = user?.name || "User";

  const initial =
    name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>

          <span className="font-bold tracking-tight">
            Career
            <span className="text-violet-400">
              AI
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
          >
            <Bell className="h-4 w-4" />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
          </button>

          <div className="hidden text-right sm:block">

            <p className="max-w-[150px] truncate text-xs font-semibold text-white">
              {name}
            </p>

            <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-slate-500">
              <Mail className="h-3 w-3" />

              <span className="max-w-[150px] truncate">
                {user?.email || "No email"}
              </span>
            </div>

          </div>

          <Link
            href="/profilepage"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/15 text-sm font-bold text-violet-300 transition hover:scale-105 hover:bg-violet-500/25"
          >
            {initial}
          </Link>

        </div>

      </div>

    </header>
  );
}