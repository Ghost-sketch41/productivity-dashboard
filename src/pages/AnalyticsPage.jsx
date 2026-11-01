/**
 * pages/AnalyticsPage.jsx 
 * Full analytics view with weekly chart, productivity score, priority breakdown.
 */

import { motion } from "framer-motion"
import { TrendingUp, Target, Zap, AlertTriangle } from "lucide-react"
import { WeeklyChart, PriorityChart, ProductivityBar } from "../components/analytics/Charts"
import  useAnalytics  from "../hooks/useAnalytics"

//Score ring component
function ScroRing({ score }) {
    const radius = 54
    const circumference = 2 * Math.PI * radius
    const progress = (score / 100) * circumference

    return (
        <div className="flex flex-col items-center justify-center">
            <svg width="140" height="140" className="-rotate-90">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-800" />
                <circle cx="70" cy="70" r={radius} fill="none" stroke={score > 70 ? '#22c55e' : score > 40 ? '#f97316' : '#ef4444'} strokeWidth="10" strokeDasharray={`${progress} ${circumference}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{score}%</span>
                <span className="text-xs text-slate-400">Score</span>
            </div>
        </div>
    )
}

export default function AnalyticsPage() {

    const { weeklyData, stats, priorityData } = useAnalytics()

    const insights = [
        {
            icon: TrendingUp,
            color: 'green',
            label: 'Best day',
            value: getBestDay(weeklyData),
        },
        {
            icon: Target,
            color: 'brand',
            label: 'Tasks completed',
            value: stats.completed,
        },
        {
            icon: Zap,
            color: 'orange',
            label: 'Pending tasks',
            value: stats.pending,
        },
        {
            icon: AlertTriangle,
            color: 'red',
            label: 'High priority',
            value: stats.highPriority,
        },
    ]

    const colorCls = {
        green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    }

    return (
        <>
            <div className="space-y-8 max-w-auto w-full">
                {/* Insight Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {insights.map(({ icon: Icon, color, label, value }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.7 }}
                            className="card p-5"
                        >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colorCls[color]}`}>
                                <Icon size={16} />
                            </div>
                            <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{value}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts row */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Weekly overview */}
                    <div className="lg:col-span-2 card p-5">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">Weekly Overview</h3>
                        <p className="text-xs text-slate-400 mb-4">Tasks created vs completed over the past 7 days</p>
                        <WeeklyChart data={weeklyData} />
                    </div>

                    {/* Provuctivity score */}
                    <div className="card p-5 flex flex-col items-center justify-center">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Productivity Score</h3>
                        <div className="relative">
                            <ScroRing core={stats.score} />
                        </div>
                        <p className="text-xs text-slate-400 mt-3 text-center">
                            {stats.score >= 70 ? ' 🔥 Excellent work' : stats.score >= 40 ? '💪 Keep going!' : '📈 Room to grow'}
                        </p>
                    </div>
                </div>

                {/* Second row */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="card p-5">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">Daily Completions</h3>
                        <p className="text-xs text-slate-400 mb-4">Tasks marked done each day this week</p>
                        {/*<ProductivityBar data={weeklyData} />*/}
                    </div>

                    <div className="card p-5">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">Open Tasks by Priority</h3>
                        <p className="text-xs text-slate-400 mb-4">Breakdown of pending tasks</p>
                        {priorityData.every((d) => d.value === 0) ? (
                            <div className="flex items-center justify-center h-[220px] text-slate-400 text-sm">
                                🎉 All tesks completed!
                            </div>
                        ) : (
                            <PriorityChart data={priorityData} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

function getBestDay(weeklyData) {
    if (!weeklyData?.length) return '—'
    const best = weeklyData.reduce((prev, cur) => (cur.completed > prev.completed ? cur : prev), weeklyData[0])
    return best.completed === 0 ? '—' : best.label
}