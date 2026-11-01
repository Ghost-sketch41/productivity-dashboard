/**
 * components/tasks/AddTaskFrom.jsx
 * Inline from to quicly add a new task
 */

import { useState } from "react"
import { Plus } from "lucide-react"
import useAppStore from "../../store/useAppStore"
import toast from "react-hot-toast"

export default function AddTaskForm() {

    const [title, setTitle] = useState('')
    const [priority, setPriorty] = useState('medium')
    const addTask = useAppStore((s) => s.addTask)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return
        addTask({ title: title.trim(), priority })
        setTitle('')
        toast.success('Task added!')
    }

  return (
    <>
        <from inSubmit={handleSubmit} className="flex gap-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                className="input flex-1"
            />

            <select
                value={priority}
                onChange={(e) => setPriorty(e.target.value)}
                className="input w-28"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="btn-primary shrink-0">
                <Plus size={16} />
                Add
            </button>
        </from>
    </>
  )
}
