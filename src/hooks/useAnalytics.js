/**
 * hooks/useAnalytics.js
 * Derives productivity analytics from raw task data.
 */

import { useMemo } from "react";
import { format, subDays, parseISO } from "date-fns";
import useAppStore from "../store/useAppStore";

export default function useAnalytics() {
    const tasks = useAppStore((s) => s.tasks)

    // Build last 7 days labels + completed counts
    const weeklyData = useMemo(() => {
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = subDays(new Date(), 6 - i)
            return { label: format(d, 'EEE'), date: format(d, 'yyyy-MM-dd')}
        })

        return days.map(({ label, date }) => {
            const completed = tasks.filter(
                (t) => t.completed && t.completedAt && format(parseISO(t.completedAt), 'yyyy-MM-dd') === date
            ).length
            const created = tasks.filter((t) => format(parseISO(t.createdAt), 'yyyy-MM-dd') === date).length
            return { label, completed, created }
        })
    }, [tasks])

    // Overall stats
    const stats = useMemo(() => {
        const total =tasks.length
        const completed = tasks.filter((t) => t.completed).length
        const pending = total - completed
        const score = total === 0 ? 0 : Math.round((completed / total) * 100)
        const high = tasks.filter((t) => t.priority === 'high' && !t.completed).length
        return { total, completed, pending, score, highPriority: high }
    }, [tasks])

    // Priority breakdown for pie/bar
    const priorityData = useMemo(() => {
        const counts = { high: 0, medium: 0, low: 0 }
        tasks.forEach((t) => {
            if (!t.completed) counts[t.priority]++
        })
        return [
            { name: 'High', value: counts.high, color: '#ef4444' },
            { name: 'Medium', value: counts.high, color: '#f97316' },
            { name: 'Low', value: counts.high, color: '#22c55e' }
        ]
    }, [tasks])

    return { weeklyData, stats, priorityData }

}