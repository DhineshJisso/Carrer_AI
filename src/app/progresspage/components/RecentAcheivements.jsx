import {
    Award,
    CheckCircle2,
    Code2,
    Flame,
    Medal,
    Trophy,
} from "lucide-react";


const iconMap = {
    streak: Flame,
    project: Code2,
    skill: CheckCircle2,
    roadmap: Trophy,
    fast: Medal,
    badge: Award,
};


export default function RecentAchievements({ progress }) {

    const achievements =
        progress?.achievements || [];


    if (achievements.length === 0) {

        return (
            <div className="glass rounded-2xl p-8 text-center">

                <Trophy className="mx-auto h-8 w-8 text-slate-700" />

                <p className="mt-3 text-sm text-slate-500">
                    No achievements yet.
                </p>

                <p className="mt-1 text-xs text-slate-700">
                    Complete your roadmap modules to unlock achievements.
                </p>

            </div>
        );
    }


    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {achievements.map((achievement, index) => {

                const Icon =
                    iconMap[achievement.type] || Award;

                return (
                    <div
                        key={`${achievement.title}-${index}`}
                        className="glass glass-hover rounded-2xl p-5"
                    >

                        <div className="flex items-start justify-between">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03]">

                                <Icon className="h-5 w-5 text-violet-400" />

                            </div>

                            <span className="text-[9px] text-slate-700">

                                {achievement.date
                                    ? new Date(
                                        achievement.date
                                    ).toLocaleDateString()
                                    : "Recently"
                                }

                            </span>

                        </div>


                        <h3 className="mt-5 text-sm font-semibold">
                            {achievement.title}
                        </h3>


                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                            {achievement.description}
                        </p>

                    </div>
                );
            })}

        </div>
    );
}