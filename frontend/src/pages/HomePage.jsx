import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../data/projects';
import { FiArrowRight, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
    const featuredProjects = getFeaturedProjects();

    const highlights = [
        {
            icon: <FiCpu />,
            title: 'LLM Engineering',
            desc: 'Fine-tuning, RAG systems, Agentic AI (LangChain, LangGraph, CrewAI, MCP)',
        },
        {
            icon: <FiCode />,
            title: 'MLOps & Deployment',
            desc: 'Docker, FastAPI, MLflow, DVC, CI/CD with GitHub Actions on AWS',
        },
        {
            icon: <FiDatabase />,
            title: 'AI Infrastructure',
            desc: 'Vector DBs (Pinecone, Weaviate, ChromaDB), AWS EC2/ECR/S3, PostgreSQL',
        },
    ];

    return (
        <div className="home-page">
            <Hero />

            {/* About Teaser */}
            <section className="section about-preview" id="about">
                <div className="container">
                    <p className="section-subtitle-light">Who I Am</p>
                    <h2 className="section-title">Building AI That Ships</h2>
                    <p className="about-teaser-text">
                        I'm an AI Engineer focused on taking models from notebook to production.
                        My stack spans the full AI lifecycle — from designing neural networks and
                        fine-tuning LLMs to deploying scalable services on AWS.
                    </p>

                    <div className="highlights-grid">
                        {highlights.map((h, idx) => (
                            <div key={idx} className="highlight-card card">
                                <div className="highlight-icon">{h.icon}</div>
                                <h3>{h.title}</h3>
                                <p>{h.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="view-more-container">
                        <Link to="/about" className="btn btn-primary">
                            More About Me <FiArrowRight />
                        </Link>
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
                            View All Projects <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
