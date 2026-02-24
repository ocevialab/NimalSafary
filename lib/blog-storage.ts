import { promises as fs } from 'fs';
import path from 'path';
import { defaultBlogs } from './default-blogs';

export interface BlogPost {
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

const BLOG_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Initialize with default blogs if file doesn't exist
async function initializeBlogsFile() {
  await ensureDataDirectory();
  
  try {
    await fs.access(BLOG_FILE_PATH);
  } catch {
    // File doesn't exist, create with default blogs
    await fs.writeFile(BLOG_FILE_PATH, JSON.stringify(defaultBlogs, null, 2));
  }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  await initializeBlogsFile();
  try {
    const data = await fs.readFile(BLOG_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export async function getBlogById(id: number): Promise<BlogPost | null> {
  const blogs = await getAllBlogs();
  return blogs.find(blog => blog.id === id) || null;
}

export async function createBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  await initializeBlogsFile();
  const blogs = await getAllBlogs();
  const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
  const newBlog: BlogPost = { ...blog, id: newId };
  blogs.push(newBlog);
  await fs.writeFile(BLOG_FILE_PATH, JSON.stringify(blogs, null, 2));
  return newBlog;
}

export async function updateBlog(id: number, updates: Partial<Omit<BlogPost, 'id'>>): Promise<BlogPost | null> {
  await initializeBlogsFile();
  const blogs = await getAllBlogs();
  const index = blogs.findIndex(blog => blog.id === id);
  if (index === -1) return null;
  
  blogs[index] = { ...blogs[index], ...updates };
  await fs.writeFile(BLOG_FILE_PATH, JSON.stringify(blogs, null, 2));
  return blogs[index];
}

export async function deleteBlog(id: number): Promise<boolean> {
  await initializeBlogsFile();
  const blogs = await getAllBlogs();
  const filtered = blogs.filter(blog => blog.id !== id);
  if (filtered.length === blogs.length) return false;
  
  await fs.writeFile(BLOG_FILE_PATH, JSON.stringify(filtered, null, 2));
  return true;
}

