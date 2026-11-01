/**
 * components/ui/index.jsx
 * shared UI priminitives: StatCard, PriorityBadge, LoadingSpinner, EmptyStatem Modal
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X } from "lucide-react";
import clsx from "clsx";

// Stat Card

export function StatCard({ label, value, icon: Icon, color = 'brand', trend}) {
    const colorMap = {
        brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-200"
        >
            <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', colorMap[color])}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-2xl font-extrabold text-slate-800 dark:text-white leading-tight">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                {trend && <p className="text-xs text-green-500 font-medium mt-1">{trend}</p>}
            </div>
        </motion.div>
    )
}

// Priority Badge
export function PriorityBadge({ priority }) {
    const styles = {
        high: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400', 
        medium: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400', 
        low: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', 
    }
    return (
        <span className={clsx('badge', styles[priority])}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {priority}
        </span>
    )
}

// Loading Spinner
export function LoadingSpinner({ size= 20, className }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={clsx('animate-spin', className)}
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4Z" />
        </svg>
    )
}

// Empty State
export function EmptyState({ icon: Icon, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Icon size={24} className="text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{title}</p>
            <p className="text-sm text-slate-400 mt-1 max-w-xs">{description}</p>
        </div>
    )
}

// Modal
export function Modal({ open, onClose, title, children }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        <div className="card p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 dark:text-white">{title}</h3>
                                <button onClick={onClose} className="btn-ghost p-1.5">
                                    <X size={16} />
                                </button>
                            </div>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}