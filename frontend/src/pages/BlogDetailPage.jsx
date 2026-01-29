import { useParams, Link, Navigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import './BlogDetailPage.css';

// Blog data - same as BlogPage.jsx
const blogsData = [
  {
    id: 'blog1',
    title: 'My First Blog Post',
    date: '2024-01-15',
    category: 'Development',
    coverImage: '/images/blog1-cover.jpg',
    excerpt: 'Welcome to my blog! This is where I share my thoughts, experiences, and learnings about web development and technology.',
  },
  // {
  //   id: 'blog2',
  //   title: 'Learning React',
  //   date: '2024-01-20',
  //   category: 'React',
  //   coverImage: '/images/blog2-cover.jpg',
  //   excerpt: 'My journey learning React and building modern web applications. Discover the tips and tricks I learned along the way.',
  // },
  // {
  //   id: 'blog3',
  //   title: 'Portfolio Journey',
  //   date: '2024-01-25',
  //   category: 'Personal',
  //   coverImage: '/images/blog3-cover.jpg',
  //   excerpt: 'Building my portfolio website from scratch. The challenges, decisions, and lessons learned throughout the process.',
  // },
];

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState('');
  const [loading, setLoading] = useState(true);

  const blog = blogsData.find(b => b.id === id);

  useEffect(() => {
    if (blog) {
      setLoading(true);
      // Import the markdown file as raw text
      import(`../blogs/${blog.id}.md?raw`)
        .then(module => {
          setBlogContent(module.default);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading blog:', err);
          setBlogContent('# Error loading blog post');
          setLoading(false);
        });
    }
  }, [blog]);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Simple markdown-to-HTML converter
  const renderMarkdown = (text) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
          return `<h3 key=${i}>${line.slice(4)}</h3>`;
        }
        if (line.startsWith('## ')) {
          return `<h2 key=${i}>${line.slice(3)}</h2>`;
        }
        if (line.startsWith('# ')) {
          return `<h1 key=${i}>${line.slice(2)}</h1>`;
        }
        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Links
        line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        // Code
        line = line.replace(/`(.*?)`/g, '<code>$1</code>');
        // Paragraphs
        if (line.trim()) {
          return `<p key=${i}>${line}</p>`;
        }
        return '<br key=${i} />';
      })
      .join('');
  };

  return (
    <div className="blog-detail-page">
      <section className="section">
        <div className="container">
          <Link to="/blog" className="back-link">
            <FiArrowLeft /> Back to Blog
          </Link>

          <article className="blog-detail">
            <div className="blog-header">
              <div className="blog-cover">
                <img src={blog.coverImage} alt={blog.title} />
              </div>

              <div className="blog-header-content">
                <div className="blog-meta-detail">
                  <span className="meta-item">
                    <FiCalendar /> {blog.date}
                  </span>
                  <span className="meta-item">
                    <FiTag /> {blog.category}
                  </span>
                </div>

                <h1 className="blog-title-detail">{blog.title}</h1>
              </div>
            </div>

            <div className="blog-body">
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(blogContent) }}
                />
              )}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;