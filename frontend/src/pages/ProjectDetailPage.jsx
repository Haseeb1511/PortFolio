import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjectById, getAllProjects } from '../data/projects';
import { FiGithub, FiExternalLink, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const project = getProjectById(id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    const allProjects = getAllProjects();
    const currentIndex = allProjects.findIndex(p => p.id === id);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    const hasMultipleImages = project.images && project.images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <div className="project-detail-page">
            <section className="section">
                <div className="container">
                    <Link to="/projects" className="back-link">
                        <FiArrowLeft /> Back to Projects
                    </Link>

                    <article className="project-detail">
                        <div className="project-gallery">
                            <div className="gallery-main">
                                <img
                                    src={project.images[currentImageIndex]}
                                    alt={project.title}
                                    className="gallery-image"
                                />
                                {hasMultipleImages && (
                                    <>
                                        <button className="gallery-btn prev" onClick={prevImage}>
                                            <FiChevronLeft />
                                        </button>
                                        <button className="gallery-btn next" onClick={nextImage}>
                                            <FiChevronRight />
                                        </button>
                                    </>
                                )}
                            </div>
                            {hasMultipleImages && (
                                <div className="gallery-thumbnails">
                                    {project.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(idx)}
                                        >
                                            <img src={img} alt={`${project.title} ${idx + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="project-info">
                            <h1 className="project-title">{project.title}</h1>

                            <div className="tools-section">
                                <h3>Technologies Used</h3>
                                <div className="tools-container">
                                    {project.tools.map((tool, idx) => (
                                        <span key={idx} className="tool-badge">{tool}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-description-full">
                                <h3>Overview</h3>
                                <div className="description-content">
                                    <div className="markdown-content">
                                        <ReactMarkdown>{project.fullDescription}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>

                            <div className="project-actions">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <FiGithub /> View on GitHub
                                </a>
                                {project.liveDemo && (
                                    <a
                                        href={project.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        <FiExternalLink /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>

                    <nav className="project-nav">
                        {prevProject ? (
                            <Link to={`/projects/${prevProject.id}`} className="nav-link prev">
                                <FiChevronLeft />
                                <span>Previous: {prevProject.title}</span>
                            </Link>
                        ) : <div />}
                        {nextProject && (
                            <Link to={`/projects/${nextProject.id}`} className="nav-link next">
                                <span>Next: {nextProject.title}</span>
                                <FiChevronRight />
                            </Link>
                        )}
                    </nav>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetailPage;
