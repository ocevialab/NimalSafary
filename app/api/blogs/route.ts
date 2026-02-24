import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogs, createBlog } from '@/lib/blog-storage';
import { getSession } from '@/lib/auth';

// GET all blogs
export async function GET() {
  try {
    const blogs = await getAllBlogs();
    // Sort by date (newest first)
    const sortedBlogs = blogs.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
    return NextResponse.json(sortedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, author, date, image, category, readTime } = body;

    if (!title || !excerpt || !content || !author || !date || !image || !category || !readTime) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newBlog = await createBlog({
      title,
      excerpt,
      content,
      author,
      date,
      image,
      category,
      readTime,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

