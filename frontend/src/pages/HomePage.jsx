import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../data/projects';
import './HomePage.css';

const HomePage = () => {
    const featuredProjects = getFeaturedProjects();

    return (
        <div className="home-page">
            <Hero />

            {/* About Preview Section */}
            <section className="section about-preview" id="about">
                <div className="container">
                    <h2 className="section-title">About</h2>
                    <div className="about-grid">
                        <div className="about-info-card card">
                            <h3>AI Engineer</h3>
                            <p className="intro-text">
                                I build intelligent, production-ready AI systems that scale—from research to deployment.
                            </p>

                            <h4>Core Expertise</h4>
                            <ul className="expertise-list">
                                <li><strong>Machine Learning & AI:</strong> Deep Learning, NLP, Computer Vision, Generative AI</li>
                                <li><strong>LLM Engineering:</strong> Fine-tuning, RAG systems, Agentic AI (LangChain, LangGraph)</li>
                                <li><strong>MLOps & Deployment:</strong> Docker, FastAPI, MLflow, DVC, CI/CD with GitHub Actions</li>
                                <li><strong>Cloud Infrastructure:</strong> AWS (EC2, ECR, S3, IAM)</li>
                            </ul>

                            <Link to="/about" className="btn btn-primary">
                                Learn More
                            </Link>
                        </div>

                        <div className="skills-column">
                            <div className="skills-box">
                                <h4>Skills</h4>
                                <div className="skills-list">
                                    <span className="skill-tag">Python</span>
                                    <span className="skill-tag">Machine Learning</span>
                                    <span className="skill-tag">Deep Learning</span>
                                    <span className="skill-tag">NLP</span>
                                    <span className="skill-tag">LangChain</span>
                                    <span className="skill-tag">LangGraph</span>
                                    <span className="skill-tag">AWS</span>
                                </div>
                            </div>

                            <div className="skills-box">
                                <h4>MLOps</h4>
                                <div className="skills-list">
                                    <span className="skill-tag">MLflow</span>
                                    <span className="skill-tag">Docker</span>
                                    <span className="skill-tag">DVC</span>
                                    <span className="skill-tag">GitHub Actions</span>
                                </div>
                            </div>

                            <div className="skills-box">
                                <h4>Backend & Cloud</h4>
                                <div className="skills-list">
                                    <span className="skill-tag">FastAPI</span>
                                    <span className="skill-tag">Flask</span>
                                    <span className="skill-tag">AWS (EC2, ECR, S3)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="section featured-projects" id="projects">
                <div className="container">
                    <p className="section-subtitle-light">Browse My Recent</p>
                    <h2 className="section-title">Featured Projects</h2>

                    <div className="projects-grid landscape">
                        {featuredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} isLandscape={true} />
                        ))}
                    </div>

                    <div className="view-more-container">
                        <Link to="/projects" className="btn btn-primary view-more-btn">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
