import {
    GraduationCap,
    Mail,
    UserRound,
} from "lucide-react";

export default function ProfileDetails({ profile }) {
    return (
        <section className="glass rounded-3xl p-6 sm:p-7">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                    <UserRound className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                    <h2 className="text-base font-semibold">
                        Personal Information
                    </h2>

                    <p className="mt-1 text-[10px] text-slate-600">
                        Your basic profile information
                    </p>
                </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <Detail
                    icon={<UserRound className="h-4 w-4" />}
                    label="Full Name"
                    value={profile?.name || "Not available"}
                />

                <Detail
                    icon={<Mail className="h-4 w-4" />}
                    label="Email Address"
                    value={profile?.email || "Not available"}
                />

                <Detail
                    icon={<GraduationCap className="h-4 w-4" />}
                    label="Education"
                    value={profile?.education || "Not provided"}
                />

                <Detail
                    icon={<UserRound className="h-4 w-4" />}
                    label="Experience"
                    value={
                        profile?.experienceLevel ||
                        profile?.experience ||
                        "Not provided"
                    }
                />

            </div>

        </section>
    );
}


function Detail({
    icon,
    label,
    value,
}) {
    return (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]">

            <div className="flex items-center gap-2 text-slate-600">
                {icon}

                <span className="text-[9px] uppercase tracking-wider">
                    {label}
                </span>
            </div>

            <p className="mt-2 truncate text-sm font-medium text-slate-300">
                {value}
            </p>

        </div>
    );
}