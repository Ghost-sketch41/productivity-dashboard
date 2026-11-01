/**
 * pages/NotesPage.jsx
 * Notes management with AI summarisation
 */

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { FileText, Plus } from "lucide-react"
import toast from "react-hot-toast"
import useAppStore from "../store/useAppStore"
import { EmptyState, Modal } from "../components/ui"
import NoteCard from "../components/notes/NoteCard"

export default function NotesPage() {

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const notes = useAppStore((s) => s.notes)
    const addNote = useAppStore((s) => s.addNote)

    const handleAdd = () => {
        if(!content.trim()) { toast.error('Note cannot be empty'); return}
        addNote({ title: title.trim() || 'Untitled Note', content: content.trim() })
        setTitle('')
        setContent('') 
        setShowModal(false)
        toast.success('Note Saved!')
    }

  return (
    <>
        <div className="max-w-auto w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400">{notes.length} note {notes.lenght !==1 ? 's' : ''} stored</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                    <Plus size={15} /> New Note
                </button>
            </div>

            {/* Notes grid */}
            {notes.lenght === 0 ? (
                <div className="card">
                    <EmptyState
                        icon={FileText}
                        title="No notes yet"
                        description="Create your first note and use AI to summarize it instantly."
                    />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {notes.map((n) => <NoteCard key={n.id} note={n} />)}
                    </AnimatePresence>
                </div>
            )}

            {/* Add Note Modal */}
            <Modal open={showModal} onClose={() => setShowModal(false)} title="New Note">
                <div className="space-y-3">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note title (optional)"
                        className="input"
                    />
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="White your note here..."
                        rows={6}
                        className="input resize-none"
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                        <button onClick={handleAdd} className="btn-primary">Save Note</button>
                    </div>
                </div>
            </Modal>
        </div>
    </>
  )
}
