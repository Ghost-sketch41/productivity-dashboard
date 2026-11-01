/**
 * App.jsx
 * Root component: sets up routing and global toast provider.
 */

import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import useAppStore from "./store/useAppStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import TasksPage from "./pages/TasksPage";
import NotesPage from "./pages/NotesPage";
import RemindersPage from "./pages/RemindersPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {

    const initTheme = useAppStore((s) => s.initTheme)

    // Apply saved theme on first load
    useEffect(() => {
        initTheme()
    }, [])

    return (
        <>
        <Toaster 
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '14px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                },
            }}
        />

            <Routes>
               <Route path="/" element={<Layout />} >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="tasks" element={<TasksPage />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="reminders" element={<RemindersPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                </Route>
            </Routes>
        </>
    )
}
