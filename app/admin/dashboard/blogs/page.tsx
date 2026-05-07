"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import { Spinner } from '@/app/Components/Skeleton';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

const ITEMS_PER_PAGE = 10;

export default function BlogsList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      // Sort by date (newest first) - API already sorts, but ensure client-side too
      const sorted = data.sort((a: BlogPost, b: BlogPost) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
      setBlogs(sorted);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Refresh the list to maintain sorting
        fetchBlogs();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('An error occurred while deleting the blog post');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Blog Posts</h1>
            <p className="text-gray-600">Manage your blog posts</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Image","Title","Category","Date","Actions"].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="w-16 h-16 bg-gray-200 rounded-lg" /></td>
                    <td className="px-6 py-4 space-y-2"><div className="h-4 bg-gray-200 rounded w-48" /><div className="h-3 bg-gray-100 rounded w-64" /></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-20" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-100 rounded w-24" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/dashboard/blogs/create"
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-muted font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={20} />
          <span>Create New</span>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
          <p className="text-gray-600 mb-4">No blog posts found.</p>
          <Link
            href="/admin/dashboard/blogs/create"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-muted font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <FiPlus size={20} />
            <span>Create Your First Blog Post</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-primary max-w-md truncate">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-500 max-w-md truncate">
                          {blog.excerpt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(blog.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/blog?post=${blog.id}`}
                            target="_blank"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link
                            href={`/admin/dashboard/blogs/edit/${blog.id}`}
                            className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            disabled={deletingId === blog.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === blog.id
                              ? <Spinner size={18} className="text-red-500" />
                              : <FiTrash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 px-6 py-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, blogs.length)} of {blogs.length} blogs
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-accent text-muted'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 3 ||
                      page === currentPage + 3
                    ) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

