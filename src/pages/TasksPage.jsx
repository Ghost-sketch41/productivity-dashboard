/**
 * pages/TasksPage.jsx 
 * Full task management with filter tabs, add form, and AI suggestions.
 */

import { useState } from "react";
import AddTaskForm from "../components/tasks/AddTaskForm";
import AISuggestions from "../components/tasks/AISuggestions"
import useAppStore from "../store/useAppStore";
import { clsx } from "clsx";
import { EmptyState } from "../components/ui"
import { CheckSquare } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "../components/tasks/TaskItem";

const FILTERS = ['all', 'pending', 'completed', 'high', 'medium', 'low' ]

export default function TasksPage() {

    const [filter, setFilter] = useState('all')
    const tasks = useAppStore((s) => s.tasks)

    const filtered = tasks.filter((t) => {
        if (filter === 'pending') return !t.completed
        if (filter === 'completed') return t.completed
        if(['high', 'medium', 'low'].includes(filter)) return t.priority === filter && !t.completed
        return true
    })

    return (
        <>
            <div className="space-y-8 max-w-auto w-full">
                {/* Add form */}
                <div className="card p-5">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Add Task</h3>
                    <AddTaskForm />
                </div>

                {/* AI Suggestions */}
                <AISuggestions />

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={clsx('px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all',
                                filter === f 
                                    ? 'bg-brand-600 text-white shaddow-sm'
                                    : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-300 dark:bg-slate-900 dark:hover-slate-700 dark:text-slate-400'
                            )}
                        >
                            {f}
                            {f === 'all' && ` (${tasks.length}) `}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                <div className="card p-5">
                    {filtered.length === 0 ? (
                        <EmptyState icon={CheckSquare} title="No tasks here" description="Add some tasks or try a different filter." />
                    ) : (
                        <div className="space-y-2">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((t) => <TaskItem key={t.id} task={t} />)}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}