// npm install react-markdown

import { Link } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  // Blog posts data - Add your blogs here
  const blogs = [
    {
      id: 'blog1',
      title: 'My First Blog Post',
      date: '2024-01-15',
      category: 'Development',
      coverImage: '/images/blog1-cover.jpg', // Add your cover image path
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

  return (
    <div className="blog-page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Blog</h1>
            <p className="section-subtitle">Thoughts, ideas, and experiences</p>
          </div>

          <div className="blog-grid">
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-card">
                <div className="blog-image">
                  <img src={blog.coverImage} alt={blog.title} />
                  <div className="blog-category">{blog.category}</div>
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{blog.date}</span>
                  </div>

                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-excerpt">{blog.excerpt}</p>

                  <Link to={`/blog/${blog.id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;