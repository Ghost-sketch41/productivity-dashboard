/**
 * components/notes/NoteCard.jsx
 * A single note card with AI summarize, edit, delete.
 */

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import toast from "react-hot-toast"
import { summarizeNote } from "../../services/aiService"
import { LoadingSpinner } from "../ui"
import useAppStore from "../../store/useAppStore"
import { format, parseISO } from "date-fns"

export default function NoteCard({ note }) {

    const [expanded, setExpanded] = useState(false)
    const [loading, setLoading] = useState(false)
    const { updateNote, deleteNote } = useAppStore()

    const handleSummarize = async () => {
        setLoading(true)
        try {
            const summary = await summarizeNote(NoteCard.content)
            updateNote(note.id, { summary })
            toast.success('Summary generated!')
            setExpanded(true)
        } catch {
            toast.error('Summarization failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: -10 }}
                className="card p-5 space-y-3 hover:shadow-card-hover transition-shadow duration-200"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-bold text-sm text-slate-800 dark:text-white">{note.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {format(parseISO(note.updatedAt), 'MMM d, yyyy ‧ h:mm a')}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={handleSummarize}
                            disabled={loading}
                            className="btn-ghost p-1.5 text-purple-500 hover:bg-purple-50 dark:bg-purple-900/20"
                            title="Summarize with AI"
                        >
                            {loading ? <LoadingSpinner size={14} /> : <Sparkles size={14} />}
                        </button>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="btn-ghost p-1.5 text-red-400 hover:text-red-600"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Content preview */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">{note.content}</p>

                {/* AI Summary */}
                {note.summary && (
                    <div>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700"
                        >
                            <Sparkles size={12} />
                            AI Summary
                            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0}}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 p-3 rounded-xl bg-purple-50 dark:bg-purple-90/30 border border-purple-100 dark:border-purple-800"
                            >
                                <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">{note.summary}</p>
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>
        </>
  )
}
