/**
 * store/useAppStore.js
 * Global Zustand store managing tasks, notes, reminders, and theme.
 * All data is persisted to localStorage via a custom middleware pattern.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";

// Helpers

const uid = () => Math.random().toString(36).slice(2, 9)
const today = () => format(new Date(), 'yyyy-MM-dd')

const useAppStore = create(
    persist(
        (set, get) => ({
            //Theme
            darkMode: false,
            toggleDarkMode: () => {
                const next = !get().darkMode 
                set({ darkMode: next })
                document.documentElement.classList.toggle('dark', next)
            },
            initTheme: () => {
                const { darkMode } = get()
                document.documentElement.classList.toggle('dark', darkMode)
            },

            // Tasks
            tasks: [],

            addTask: (task) => 
                set((s) => ({
                    tasts: [
                        {
                            id: uid(),
                            title: task.title,
                            priority: task.priority || 'medium',
                            completed: false,
                            date: task.date || today(),
                            createdAt: new Date().toISOString(),
                        },
                        ...s.tasks
                    ],
                })),

            updateTask: (id, updates) =>
                set((s) => ({
                    tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } :
                    t)),
                })),
            
            deleteTask: (id) => 
                set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

            toggleTask: (id) =>
                set((s) => ({
                    tasks: s.tasks.map((t) =>
                        t.id === id
                           ? { ...t, completed: !t.completed, completedAt: !t.
                            completed ? new Date().toISOString() : null }
                            : t
                    ),
                })),

            // Notes

            notes: [],

            addNote: (note) => 
                set((s) => ({
                    notes: [
                        {
                            id: uid(),
                            title: note.title || 'Untitled Note',
                            content: note.content,
                            summary: null,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        },
                        ...s.notes,
                    ],
                })),

            updateNote: (id, updates) => 
                set((s) => ({
                    notes: s.notes.map((n) =>
                        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString } : n
                    ),
                })),

            deleteNote: (id) =>
                set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

            // Reminders

            reminders: [],
            
            addReminder: (reminder) =>
                set((s) => ({
                    reminders: [
                        {
                            id: uid(),
                            title: reminder.title,
                            datetime: reminder.datetime,
                            done: false,
                            createdAt: new Date().toISOString(),
                        },
                        ...s.reminders,
                    ],
                })),

            toggleReminder: (id) =>
                set((s) => ({
                    reminders: s.reminders.map((r) =>
                        r.id === id ? { ...r, done: !r.done } : r 
                    ),
                })),

            deleteReminder: (id) => 
                set((s) => ({ reminders: s.reminders.filter((r) => r.id !== id) })),
        }),
        {
            name: 'flowdesk-storage', // localStorage key
        }
    )
)

export default useAppStore