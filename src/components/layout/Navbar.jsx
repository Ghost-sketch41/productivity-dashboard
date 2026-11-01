/**
 * components/layout/Navbar.jsx
 * Top navigation bar with page title, dark mode toggle, and mobile menu.
 */

import { useLocation } from "react-router-dom"
import { Menu, Sun, Moon, Bell } from "lucide-react"
import useAppStore from "../../store/useAppStore"

const TITLES = {
    '/dashboard': 'Dashboard',
    '/tasks': 'Task Planner',
    '/notes': 'Notes & Summaries',
    '/reminders': 'Smart Reminders',
    '/analytics': 'Analytics',
}

export default function Navbar({ onMenuClick }) {

    const { pathname } = useLocation()
    const darkMode = useAppStore((s) => s.darkMode)
    const toggleDarkMode = useAppStore((s) => s.toggleDarkMode)
    const reminders = useAppStore((s) => s.reminders)

    const overdueCount = reminders.filter(
        (r) => !r.done && new Date(r.datetime) < new Date()
    ).length

    return (
        <>
            <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden btn-ghost p-2"
                        aria-label="Open menu"
                    >
                        <Menu size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                        {TITLES[pathname] || 'FlowDesk'}
                    </h1>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    {/* Overdude reminder badge */}
                    {overdueCount > 0 && (
                        <div className="relative">
                            <button className="btn-ghost p-2 relative">
                                <Bell size={18} />
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px]
                                font-bold flex items-center justify-center">
                                    {overdueCount}
                                </span>
                            </button>
                        </div>
                    )}

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="btn-ghost p-2 rounded-xl"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={18} className="text-amber-400" /> : 
                        <Moon size={18} /> }
                    </button>
                </div>
            </header>
        </>
    )
}
