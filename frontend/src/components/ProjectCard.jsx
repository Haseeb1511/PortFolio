import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, isLandscape = true }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasMultipleImages = project.images && project.images.length > 1;

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <article className={`project-card ${isLandscape ? 'landscape' : ''}`}>
            <div className="project-image-container">
                <Link to={`/projects/${project.id}`} className="project-image-link">
                    <img
                        src={project.images[currentImageIndex]}
                        alt={project.title}
                        className="project-image"
                    />
                </Link>
                {hasMultipleImages && (
                    <>
                        <button className="carousel-btn prev" onClick={prevImage} aria-label="Previous image">
                            <FiChevronLeft />
                        </button>
                        <button className="carousel-btn next" onClick={nextImage} aria-label="Next image">
                            <FiChevronRight />
                        </button>
                        <div className="carousel-dots">
                            {project.images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentImageIndex(idx);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="project-content">
                <Link to={`/projects/${project.id}`} className="project-title-link">
                    <h3 className="project-title">{project.title}</h3>
                </Link>

                <p className="project-description">{project.description}</p>

                <div className="tools-container">
                    {project.tools.map((tool, idx) => (
                        <span key={idx} className="tool-badge">{tool}</span>
                    ))}
                </div>

                <div className="project-actions">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn project-btn"
                    >
                        <FiGithub /> GitHub
                    </a>
                    {project.liveDemo && (
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn project-btn"
                        >
                            <FiExternalLink /> Live Demo
                        </a>
                    )}
                    <Link to={`/projects/${project.id}`} className="btn btn-primary project-btn">
                        Read More
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
