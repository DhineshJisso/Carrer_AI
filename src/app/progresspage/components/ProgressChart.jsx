"use client";

import { useMemo, useState } from "react";
import {
    Activity,
    ChevronDown,
} from "lucide-react";

export default function ProgressChart({ progress }) {

    const [period, setPeriod] = useState("This Week");

    const weeklyData = useMemo(() => {

        const backendData =
            progress?.weeklyActivity || [];

        const defaultDays = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ];

        return defaultDays.map((day) => {

            const existing =
                backendData.find(
                    (item) => item.day === day
                );

            return {
                day,
                hours: existing?.hours ?? 0,
            };
        });

    }, [progress]);


    const totalHours = weeklyData.reduce(
        (total, item) =>
            total + Number(item.hours || 0),
        0
    );


    const maxHours = Math.max(
        5,
        ...weeklyData.map(
            (item) => Number(item.hours || 0)
        )
    );


    return (
        <div className="glass rounded-3xl p-6 sm:p-8">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">

                        <Activity className="h-5 w-5 text-cyan-400" />

                    </div>

                    <div>

                        <h3 className="text-sm font-semibold">
                            Learning Hours
                        </h3>

                        <p className="mt-1 text-[10px] text-slate-600">
                            Time spent learning
                        </p>

                    </div>

                </div>


                <div className="relative">

                    <select
                        value={period}
                        onChange={(e) =>
                            setPeriod(e.target.value)
                        }
                        className="appearance-none rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-3 pr-8 text-[10px] text-slate-400 outline-none"
                    >
                        <option>This Week</option>
                        <option>Last Week</option>
                        <option>This Month</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-600" />

                </div>

            </div>


            {/* Total */}

            <div className="mt-7">

                <span className="text-3xl font-bold">
                    {totalHours.toFixed(1)}
                </span>

                <span className="ml-2 text-xs text-slate-600">
                    hours
                </span>

            </div>


            {/* Chart */}

            <div className="mt-8 flex h-56 items-end justify-between gap-2 sm:gap-5">

                {weeklyData.map((item) => {

                    const hours =
                        Number(item.hours || 0);

                    const height =
                        maxHours > 0
                            ? (hours / maxHours) * 100
                            : 0;

                    return (
                        <div
                            key={item.day}
                            className="group flex h-full flex-1 flex-col items-center justify-end"
                        >

                            {/* Value */}

                            <div className="mb-2 opacity-0 transition group-hover:opacity-100">

                                <span className="rounded-lg bg-white/[0.08] px-2 py-1 text-[9px] text-slate-300">
                                    {hours.toFixed(1)}h
                                </span>

                            </div>


                            {/* Bar */}

                            <div className="flex h-full w-full items-end justify-center">

                                <div
                                    className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-violet-500/30 to-cyan-400 transition-all duration-300 group-hover:from-violet-500 group-hover:to-cyan-400"
                                    style={{
                                        height: `${height}%`,
                                        minHeight:
                                            hours > 0
                                                ? "6px"
                                                : "0px",
                                    }}
                                />

                            </div>


                            {/* Day */}

                            <span className="mt-3 text-[10px] text-slate-600">
                                {item.day}
                            </span>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}