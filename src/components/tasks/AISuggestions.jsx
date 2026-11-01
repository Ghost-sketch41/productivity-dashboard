/**
 * components/tasks/AISuggestions.jsx 
 * AI-powered task suggestion panel.
 * Calls the mock AI service and lets users add suggestions to their task list.
 */

import { Sparkles, Plus, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { suggestTasks } from "../../services/aiService";
import { LoadingSpinner, PriorityBadge } from '../ui'
import useAppStore from "../../store/useAppStore";

export default function AISuggestions() {

    const [goal, setGoal] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState(new Set())
    const addTask = useAppStore((s) => s.addTask)

    const handleGenerate = async () => {
        if (!goal.trim()) {
            toast.error('Enter a goal first!')
            return
        }
        setLoading(true)
        setSuggestions([])
        setAdded(new Set())
        try {
            const results = await suggestTasks(goal)
            setSuggestions(results)
            toast.success(`${results.length} suggestions ready!`)
        } catch {
            toast.error('AI service unavailable')
        } finally {
            setLoading(false)
        }
    } 

    const handleAdd = (task) => {
        addTask(task)
        setAdded((prev) => new Set(prev).add(task.title))
        toast.success('Added to your tasks!')
    }

  return (
    <>
        <div className="card p-5 space-y-4">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                    <Sparkles size={16} className="text-purple-500" />
                </div>
                <div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white">AI Task Suggestions</h3>
                    <p className="text-xs text-slate-400">Tell AI your goal & get smart tasks</p>
                </div>
            </div>
            
            <div className="flex gap-2">
                <input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="e.g I want to be more productive today..."
                    className="input flex-1 text-sm"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="btn-primary shrink-0 min-w-[110px] justify-center"
                >
                    {loading ? (
                        <><LoadingSpinner size={15} /> Thinking... </>
                    ) : (
                        <><Sparkles size={15}/> Suggest </>
                    )}
                </button>
            </div>

            <AnimatePresence>
                {suggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exiit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        {suggestions.map((s, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                            >
                                <PriorityBadge priority={s.priority} />
                                <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">{s.title}</span>
                                <button
                                    onClick={() => handleAdd(s)}
                                    disabled={added.has(s.title)}
                                    className={added.has(s.title)
                                        ? 'badge bg-green-50 text-green-600 dark:text-green-900/30' : 'btn-ghost p-1.5 text-brand-600 hover:bg-brand-50'
                                    }
                                >
                                    {added.has(s.title) ? '✓ Added' : <Plus size={15} />}
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    </>
  )
}
