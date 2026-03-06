"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/admin/AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Add proper TypeScript interfaces
interface Summary {
  skills: number;
  projects: number;
  experiences: number;
  users: number;
}

interface Activity {
  action: string;
  user: string;
  date: string;
}

interface LoadingState {
  summary: boolean;
  activities: boolean;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const DashboardPage = () => {
  const [summary, setSummary] = useState<Summary>({
    skills: 0,
    projects: 0,
    experiences: 0,
    users: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    summary: true,
    activities: true,
  });
  const [error, setError] = useState<{ summary?: string; activities?: string }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchData = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
      try {
        // Fetch summary
        const summaryRes = await fetch(`${API_URL}/admin/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!summaryRes.ok) {
          if (summaryRes.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/admin/login";
            return;
          }
          throw new Error(`Failed to fetch summary: ${summaryRes.statusText}`);
        }

        const summaryData = await summaryRes.json();
        setSummary(summaryData);
        setLoading(prev => ({ ...prev, summary: false }));
      } catch (err: any) {
        console.error("Error fetching summary:", err);
        setError(prev => ({ ...prev, summary: err.message }));
        setLoading(prev => ({ ...prev, summary: false }));
      }

      try {
        // Fetch activities
        const activitiesRes = await fetch(`${API_URL}/admin/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!activitiesRes.ok) {
          if (activitiesRes.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/admin/login";
            return;
          }
          throw new Error(`Failed to fetch activities: ${activitiesRes.statusText}`);
        }

        const activitiesData = await activitiesRes.json();
        setActivities(activitiesData);
        setLoading(prev => ({ ...prev, activities: false }));
      } catch (err: any) {
        console.error("Error fetching activities:", err);
        setError(prev => ({ ...prev, activities: err.message }));
        setLoading(prev => ({ ...prev, activities: false }));
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const barData = [
    { name: "Skills", count: summary.skills },
    { name: "Projects", count: summary.projects },
    { name: "Experiences", count: summary.experiences },
    { name: "Users", count: summary.users },
  ];

  const pieData = [
    { name: "Skills", value: summary.skills },
    { name: "Projects", value: summary.projects },
    { name: "Experiences", value: summary.experiences },
    { name: "Users", value: summary.users },
  ];

  // Check if all data is still loading
  const isLoading = loading.summary || loading.activities;

  // Check if there are any errors
  const hasErrors = Object.keys(error).length > 0;

  // Render loading state
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  // Render error state
  if (hasErrors) {
    return (
      <AdminLayout>
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Error</h1>
          {error.summary && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-semibold">Summary Error</p>
              <p>{error.summary}</p>
            </div>
          )}
          {error.activities && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mt-4">
              <p className="font-semibold">Activities Error</p>
              <p>{error.activities}</p>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  // Main dashboard content
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your portfolio overview</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Rest of your dashboard UI components */}
      {/* ... */}
    </AdminLayout>
  );
};

export default DashboardPage;