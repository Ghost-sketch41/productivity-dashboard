/**
 * pages/DashboardPage.jsx
 * Overbiew with stats, recent tasks, upcoming reminders, and quick add.
 */

import { Link } from "react-router-dom"
import { CheckSquare, Clock, Zap, AlertCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { isPast, parseISO, format } from "date-fns"
import useAppStore from "../store/useAppStore"
import useAnalytics from "../hooks/useAnalytics.js"
import { StatCard } from "../components/ui"
import AddTaskForm from "../components/tasks/AddTaskForm"
import TaskItem from "../components/tasks/TaskItem"
import { WeeklyChart } from "../components/analytics/Charts"

export default function DashboardPage() {

    const tasks = useAppStore((s) => s.tasks) 
    const reminders = useAppStore((s) => s.reminders)
    const { stats, weeklyData } = useAnalytics()

    const recentTasks = tasks.slice(0, 5)
    const upcomingReminders = reminders
        .filter((r) => !r.done)
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .slice(0, 4)

  return (
    <>
        <div className="space-y-8 max-w-auto w-full">
            {/* Welcome */}
            <div>
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    Good {getGreeting()}, Achiever! 👋 
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                    {format(new Date(), 'EEEE, MMMM d, yyyy')} . {stats.pending}
                    tasks remainning
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Tasks" value={stats.total} icon={CheckSquare} color="brand" />
                <StatCard label="Completed" value={stats.completed} icon={Zap} color="green" />
                <StatCard label="Pending" value={stats.pending} icon={Clock} color="orange" />
                <StatCard label="Productivity" value={`${stats.score}%`} icon={AlertCircle} color="red" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left column: qquick add + tasks */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="card p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white">Quick Add Task</h3>
                        </div>
                        <AddTaskForm />
                    </div>

                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 dark:text-white">Recent Tasks</h3>
                            <Link to="/tasks" className="btn-ghost text-xs text-brand-600 dark:text-brand-400">
                                View All <ArrowRight size={12} />
                            </Link>
                        </div>
                        {recentTasks.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-8">No tasks yet - add your first one above!</p>
                        ) : (
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {recentTasks.map((t) => <TaskItem key={t.id} task={t} />)}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column: reminders + chart */}
                <div className="space-y-4">
                    {/* Upcoming Reminders */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 dark:text-white">Upcoming</h3>
                            <Link to="/reminders" className="btn-ghost text-xs text-brand-600 dark:text-brand-400">
                                View all <ArrowRight size={12} />
                            </Link>
                        </div>
                        {upcomingReminders.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-6">No reminders set</p>
                        ) : (
                            <div className="space-y-2">
                                {upcomingReminders.map((r) => {
                                    const overdue = isPast(parseISO(r.datetime))
                                    return (
                                        <div key={r.id} className={`flex items-center gap-3 p-2.5 rounded-xl text-sm ${overdue ? 'bg-red-50 dark:bg-red-900/10' : 'bg-slate-50 dark:bg-slate-800'}`}>
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${overdue ? 'bg-red-500' : 'bg-brand-500'}`} />
                                            <div className="min-w-0">
                                                <p className="font-medium text-slate-800 dark:text-white truncate text-xs">{r.title}</p>
                                                <p className={`text-[11px] ${overdue ? 'text-red-500' : 'text-slate-400'}`}>
                                                    {overdue ? 'Overdue ‧ ' : ''}
                                                    {format(parseISO(r.datetime), 'MMM d ‧ h:mm a')}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Mini Chart */}
                    <div className="card p-5">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-3">This Week</h3>
                        <WeeklyChart data={weeklyData} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return 'monrning'
    if (h < 17) return 'afternoon'
    return 'evening'
}