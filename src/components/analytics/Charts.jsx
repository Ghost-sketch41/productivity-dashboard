/**
 * components/analytics/Charts.jsx 
 * Recharts-based charts for weekly overview and priority breakdown.
 */

import { AreaChart, Area, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import useAppStore from "../../store/useAppStore";

// Custom tooltip style
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.datekey} className="text-xs" style={{ color: p.color  }}>
                    {p.name}: <strong>{p.value}</strong>
                </p>
            ))}
        </div>
    )
} 

// Weekly completed vs created area chart
export function WeeklyChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
                <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}></stop>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}></stop>
                    </linearGradient>
                     <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.15}></stop>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}></stop>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15" />
                <XAxis dataKey="label" tick={{fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="completed" name="Completed" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorCompleted)" />
                <Area type="monotone" dataKey="created" name="Created" stroke="#f97316" strokeWidth={2} fill="url(#colorCreated)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

// Priority breakdown pie chart
export function PriorityChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                        <span className="text-xs text-slate-600 dark:text-slate-400">{value}</span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

// Productivity score bar chart
export function ProductivityBar({ data }) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completed" name="Completed" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
        </ResponsiveContainer>
    )
}