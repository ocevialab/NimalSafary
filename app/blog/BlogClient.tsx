"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/app/Components/Nav";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

// Component that uses search params - needs to be wrapped in Suspense
const BlogContent = () => {
  const searchParams = useSearchParams();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
      setBlogPosts(sorted);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Fallback to empty array if API fails
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Get initial post from query parameter or default to first post
  const getInitialPost = () => {
    if (blogPosts.length === 0) return null;
    const postId = searchParams.get('post');
    if (postId) {
      const post = blogPosts.find(p => p.id === parseInt(postId));
      if (post) return post;
    }
    return blogPosts[0];
  };

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(getInitialPost());

  // Update selected post when query parameter or blogPosts change
  useEffect(() => {
    if (blogPosts.length > 0) {
      const postId = searchParams.get('post');
      if (postId) {
        const post = blogPosts.find(p => p.id === parseInt(postId));
        if (post) {
          setSelectedPost(post);
          return;
        }
      }
      // If no post selected or post not found, select first post
      if (!selectedPost || !blogPosts.find(p => p.id === selectedPost.id)) {
        setSelectedPost(blogPosts[0]);
      }
    }
  }, [searchParams, blogPosts, selectedPost]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-lg">Loading blog...</div>
      </div>
    );
  }

  if (!selectedPost || blogPosts.length === 0) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-lg">No blog posts found.</div>
      </div>
    );
  }

  return <BlogClientContent selectedPost={selectedPost} setSelectedPost={setSelectedPost} blogPosts={blogPosts} />;
};

// Legacy hardcoded data removed - now using API

// Main blog content component (doesn't use search params)
const BlogClientContent = ({ selectedPost, setSelectedPost, blogPosts }: { selectedPost: BlogPost; setSelectedPost: (post: BlogPost) => void; blogPosts: BlogPost[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Pagination calculations for sidebar
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = blogPosts.slice(startIndex, endIndex);

  // Reset to page containing selected post when it changes
  useEffect(() => {
    const selectedIndex = blogPosts.findIndex(p => p.id === selectedPost.id);
    if (selectedIndex !== -1) {
      const pageForSelected = Math.floor(selectedIndex / POSTS_PER_PAGE) + 1;
      setCurrentPage(prevPage => {
        if (pageForSelected !== prevPage) {
          return pageForSelected;
        }
        return prevPage;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost.id, blogPosts.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "bottom 65%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .fromTo(
          lineRef.current,
          {
            width: 0,
            opacity: 0,
          },
          {
            width: "10%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        )
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Main content animation
      if (mainContentRef.current) {
        gsap.fromTo(
          mainContentRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mainContentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Sidebar animation
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selectedPost]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderBlogContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('## ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-primary mt-8 mb-4">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold text-primary mt-6 mb-3">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ')) {
        inList = true;
        currentList.push(trimmedLine.substring(2));
      } else if (trimmedLine === '') {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(<br key={`br-${index}`} />);
      } else if (trimmedLine !== '') {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });

    // Handle any remaining list items
    if (inList && currentList.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc ml-6 mb-4 space-y-2">
          {currentList.map((item, i) => (
            <li key={i} className="ml-2">{item}</li>
          ))}
        </ul>
      );
    }

    return <>{elements}</>;
  };

  return (
    <>
      <Nav textcolor="text-black" />
      <div
        ref={containerRef}
        className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 pt-24 pb-16 bg-background font-display"
      >
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-4 mb-12">
          <hr
            ref={lineRef}
            className="w-16 sm:w-20 md:w-24 bg-secondary border-primary h-0.5"
          />
          <h2
            ref={titleRef}
            className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
          >
            Safari Blog
          </h2>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Main Blog Content */}
          <div
            ref={mainContentRef}
            className="flex-1 lg:w-2/3 space-y-6"
          >
            {/* Featured Blog Post */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 800px"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category and Date */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-accent text-muted rounded-full font-semibold">
                    {selectedPost.category}
                  </span>
                  <span>{formatDate(selectedPost.date)}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                  {selectedPost.title}
                </h1>

                {/* Author */}
                <div className="mb-6 text-gray-600">
                  <span className="font-semibold">By {selectedPost.author}</span>
                </div>

                {/* Content */}
                <article className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
                    {selectedPost.excerpt}
                  </p>
                  <div className="text-gray-700 leading-relaxed">
                    {renderBlogContent(selectedPost.content)}
                  </div>
                </article>
              </div>
            </article>
          </div>

          {/* Right Side - Recent Blog List */}
          <aside
            ref={sidebarRef}
            className="lg:w-1/3 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-accent">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {paginatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`w-full rounded-lg transition-all duration-300 ${
                      selectedPost.id === post.id
                        ? "ring-2 ring-accent bg-accent/10"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="w-full text-left group p-3"
                    >
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="100px"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm sm:text-base font-semibold mb-2 line-clamp-2 transition-colors ${
                            selectedPost.id === post.id
                              ? "text-accent"
                              : "text-primary group-hover:text-accent"
                          }`}>
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination for sidebar */}
              {totalPages > 1 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Previous"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Next"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

// Export BlogContent for use with Suspense
export { BlogContent };

