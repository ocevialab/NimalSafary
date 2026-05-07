"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiFileText, FiPlus, FiTrendingUp } from 'react-icons/fi';
import { SkStatCard } from '@/app/Components/Skeleton';

interface BlogStats {
  total: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<BlogStats>({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setStats({ total: data.length || 0 });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <>
            <SkStatCard />
            <SkStatCard />
            <SkStatCard />
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Blogs</p>
                  <p className="text-3xl font-bold text-primary">{stats.total}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <FiFileText className="text-accent" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Blogs</p>
                  <p className="text-3xl font-bold text-primary">{stats.total}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiTrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <Link
              href="/admin/dashboard/blogs/create"
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:border-accent hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Create New</p>
                  <p className="text-lg font-semibold text-primary">Blog Post</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <FiPlus className="text-accent" size={24} />
                </div>
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/dashboard/blogs"
            className="p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FiFileText className="text-accent" size={20} />
              <span className="font-medium">View All Blogs</span>
            </div>
          </Link>
          <Link
            href="/admin/dashboard/blogs/create"
            className="p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FiPlus className="text-accent" size={20} />
              <span className="font-medium">Create New Blog</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

