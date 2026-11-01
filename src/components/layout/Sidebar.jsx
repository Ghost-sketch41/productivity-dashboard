/**
 * components/layout/Sidebar.jsx
 * Collapsible sidebar with navigation links,
 */

import { NavLink } from "react-router-dom"
import { LayoutDashboard, CheckSquare, FileText, Bell, BarChart2, Zap, X } from "lucide-react"
import clsx from "clsx"

const NAV = [
    { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { to: '/tasks', label: 'Tasks', Icon: CheckSquare },
    { to: '/notes', label: 'Notes', Icon: FileText },
    { to: '/reminders', label: 'Reminders', Icon: Bell },
    { to: '/analytics', label: 'Analytics', Icon: BarChart2 },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
        <aside
            className={clsx(
                'fixed insey-y-0 left-0 z-30 w-64 flex flex-col',
                'bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800',
                'transition-transform duration-300 ease-in-out',
                'lg:relative lg:translate-x-0',
                open ? 'translate-x-0' : '-translate-x-full'
            )}
        >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-16 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm">
                        <Zap size={16} className="text-white" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight text-slate-800 dark:text-white">
                        FlowDesk
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden btn-ghost p-1.5"
                    aria-label="Close menu"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                    Menu
                </p>
                {NAV.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                                isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover-slate-800 dark:text-slate-100'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={18} className={isActive ? 'text-brand-600 dark:text-brand-400' : ''} />
                                {label}
                            </>
                        )}
                    </NavLink> 
                ))} 
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white text-xs font-bold">U</div>
                    <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-wrap">User</p>
                        <p className="text-xs text-slate-400">Pro Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    </>
  )
}
 