/**
 * pages/RemindersPage.jsx 
 * Time-based reminder management with overdue highlighting.
 */

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Bell, Plus } from "lucide-react"
import toast from "react-hot-toast"
import { isPast, parseISO } from "date-fns"
import ReminderItem from '../components/reminders/ReminderItem'
import { EmptyState, Modal } from "../components/ui"
import useAppStore from "../store/useAppStore"

export default function RemindersPage() {

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')
    const [datetime, setDatetime] = useState('')
    const [filter, setFilter] = useState('upcoming')

    const reminders = useAppStore((s) => s.reminders)
    const addReminder = useAppStore((s) => s.addReminder)

    const handleAdd = () => {
        if (!title.trim()) { toast.error('Please enter a title'); return }
        if (!datetime) { toast.error('Please set a date & time'); return }
        addReminder({ title: title.trim(), datetime })
        setTitle('')
        setDatetime('')
        setShowModal(false)
        toast.success('Reminder set!')
    }

    const filterd = reminders.filter((r) => {
        if (filter === 'upcoming') return !r.done && !isPast(parseISO(r.datetime))
        if (filter === 'overdue') return !r.done && !isPast(parseISO(r.datetime))
        if (filter === 'done') return r.done
        return true
    }).sort((a, b) => new Date(a.datetime) - new Date(b.datetime))

    const overdueCount = reminders.filter((r) => !r.done && isPast(parseISO(r.datetime))).length

  return (
    <>
        <div className="max-w-auto w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    {overdueCount > 0 && (
                        <span className="badge bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {overdueCount} overdue
                        </span>
                    )}
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                    <Plus size={15} /> Set Reminder
                </button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
                {['all', 'upcoming', 'overdue', 'done'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
                            ${filter === f
                                ? 'bg-brand-600 text-white shadow-sm'
                                : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="card p-5">
                {filterd.lenght === 0 ? (
                    <EmptyState icon={Bell} title="No reminders" description="Set a reminder and never miss an important task." />
                ) : (
                    <div className="space-y-2">
                        <AnimatePresence mode="popLayout">
                            {filterd.map((r) => <ReminderItem key={r.id} reminder={r} />)}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal open={showModal} onClose={() => setShowModal(false)} title="New Reminder">
                <div className="space-y-3">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Reminder title..."
                        className="input"
                    />
                    <div>
                        <label className="block text-xs font-medium text-slate-500 bg-1.5">Date & Time</label>
                        <input 
                            type="datetime-local"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                        <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                        <button onClick={handleAdd} className="btn-primary">Set Reminder</button>
                    </div>
                </div>
            </Modal>
        </div>
    </>
  )
}
