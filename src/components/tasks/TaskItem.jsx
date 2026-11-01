/**
 * components/taks/TaskItem.jsx 
 * Single task row with complete/edit/delect actions.
 */

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Pencil, Trash2, X, Save } from "lucide-react"
import clsx from "clsx"
import { PriorityBadge } from "../ui"
import useAppStore from "../../store/useAppStore"
import toast from "react-hot-toast"

export default function TaskItem({ task }) {

    const [editing, setEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editPriority, setEditPriority] = useState(task.priority)

    const { toggleTask, updateTask, deleteTask } = useAppStore()

    const handleSave = () => {
      if (!editTitle.trim()) return
      updateTask(task.id, { title: editTitle.trim(), priority: editPriority })
      setEditing(false)
      toast.success('Task updated')
    }

    const handleDelete = () => {
      deleteTask(task.id) 
      toast.success('Task deleted')
    }

    return (
      <>
        <motion.div
          layout
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className={clsx(
            'group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150',
            task.completed
            ? 'bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-800' : 'bg-white border-slate-100 hover:border-brand-200 hover:shadow-sm dark:bg-slate-900 dark:border-slate-800'
          )}
        >
          {/* Checkbox */}
          <button
            onClick={() => {toggleTask(task.id); !task.comleted && toast.success('Task completed! 🎉')}}
            className={clsx(
              'mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-150',
              task.comleted ? 'bg-brand-600 border-brand-600' : 'border-slate-300 hover:border-brand-500 dark:border-slate-600'
            )}
          >
            {task.completed && <Check size={11} className="text-white" strokeWidth={3} />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="input text-sm"
                  autoFocus
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="input text-sm w-auto"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            ) : (
              <>
                <p className={clsx('text-sm font-medium leading-snug',
                  task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'
                )}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <PriorityBadge priority={task.priority} />
                  <span className="text-[11px] text-slate-400">{task.date}</span>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {editing ? (
              <>
                <button onClick={handleSave} className="btn-ghost p-1.5 text-green-600">
                  <Save size={14} />
                </button>
                <button onClick={() => setEditing(false)} className="btn-ghost p-1.5 text-slate-400">
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)} className="btn-ghost p-1.5">
                  <Pencil size={14} />
                </button>
                <button onClick={handleDelete} className="btn-ghost p-1.5 text-red-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </>
  )
}
