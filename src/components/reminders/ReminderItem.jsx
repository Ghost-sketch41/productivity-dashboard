/** 
 * components/reminders/ReminderItem.jsx 
 * Single reminder row with overdue highlighting.
 */

import { motion } from "framer-motion"
import { Bell, Trash2, Check, AlertCircleIcon, AlertTriangle } from "lucide-react"
import clsx from "clsx"
import { format, parseISO, isPast } from "date-fns"
import useAppStore from "../../store/useAppStore"
import toast from "react-hot-toast"

export default function ReminderItem({ reminder }) {

    const { toggleReminder, deleteReminder } = useAppStore()
    const isOverdue = !reminder.done && isPast(parseISO(reminder.datetime))

  return (
    <>
        <motion.div
            layout
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={clsx(
                'group flex items-center gap-3 p-4 rounded-xl border transition-all duration-150',
                reminder.done 
                ? 'bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-800'
                : isOverdue
                ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30'
                : 'bg-white border-slate-100 hover:shadow-sm dark:bg-slate-900 dark:border-slate-800'
            )}
        >
            {/* Icon */}
            <div className={clsx(
                'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                reminder.done ? 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                : isOverdue ? 'bg-red-100 text-red-500 dark:bg-red-900/30'
                : 'bg-brand-50 text-brand-600 dark:bg-brand-900/30'
            )}>
                {isOverdue ? <AlertTriangle size={16} /> : <Bell size={16} />}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <p className={clsx(
                    'text-sm font-medium',
                    reminder.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'
                )}>
                    {reminder.title}
                </p>
                <p className={clsx(
                    'text-xs mt-0.5',
                    isOverdue ? 'text-red-500 font-semibold' : 'text-slate-400'
                )}>
                    {isOverdue && !reminder.done ? '⚠ Overdue ‧ ' : ''}
                    {format(parseISO(reminder.datetime), 'MMM d, yyyy ‧ h:mm a')}
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
                {!reminder.done && (
                    <button
                        onClick={() => {toggleReminder(reminder.id); toast.success('Reminder done!') }}
                        className="btn-ghost p-1.5 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Check size={14} />
                    </button>
                )}
                <button 
                    onClick={() => { deleteReminder(reminder.id); toast.success('Reminder deleted') }}
                    className="btn-ghost p-1.5 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </motion.div>
    </>
  )
}
