import './AboutPage.css';

/* Devicons CDN is loaded in index.html - these are icon class names */
const skills = {
    core: [
        { name: 'Python', icon: 'devicon-python-plain colored' },
        { name: 'PyTorch', icon: 'devicon-pytorch-plain colored' },
        { name: 'TensorFlow', icon: 'devicon-tensorflow-original colored' },
        { name: 'Scikit-learn', icon: 'devicon-scikitlearn-plain colored' },
        { name: 'Streamlit', icon: 'devicon-streamlit-plain colored' },
        { name: 'LangChain', icon: null },
        { name: 'LangGraph', icon: null },
        { name: 'CrewAI', icon: null },
        { name: 'MCP', icon: null },
        { name: 'Fine-tuning', icon: null },
        { name: 'NLP', icon: null },
    ],
    mlops: [
        { name: 'MLflow', icon: null },
        { name: 'Docker', icon: 'devicon-docker-plain colored' },
        { name: 'DVC', icon: null },
        { name: 'GitHub Actions', icon: 'devicon-github-original' },
    ],
    backend: [
        { name: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
        { name: 'Flask', icon: 'devicon-flask-original' },
    ],
    cloud: [
        { name: 'AWS EC2', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'AWS S3', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'AWS ECR', icon: null },
        { name: 'IAM', icon: null },
    ],
    database: [
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'SQLite', icon: 'devicon-sqlite-plain colored' },
        { name: 'Pinecone', icon: null },
        { name: 'ChromaDB', icon: null },
        { name: 'Weaviate', icon: null },
    ],
};

const SkillTag = ({ skill }) => (
    <span className="skill-chip">
        {skill.icon && <i className={`${skill.icon} skill-icon`} />}
        {skill.name}
    </span>
);

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">About Me</h1>
                    <p className="section-subtitle">Building AI that scales from research to production</p>

                    <div className="about-layout">
                        <div className="about-main">
                            <div className="about-card card">
                                <div className="about-header">
                                    <div className="about-avatar">
                                        <img src="/assets/profile_pic/haseeb_image.jpg" alt="Haseeb Manzoor" />
                                    </div>
                                    <div>
                                        <h2>Haseeb Manzoor</h2>
                                        <span className="about-role-badge">AI Engineer & MLOps Specialist</span>
                                    </div>
                                </div>

                                <p className="intro-text">
                                    I engineer production-ready AI systems — from training custom LLMs and RAG pipelines
                                    to full MLOps deployment on AWS. I'm passionate about building AI that
                                    <strong> doesn't just work, but scales, adapts, and creates real business value.</strong>
                                </p>

                                <h3>Core Expertise</h3>
                                <ul className="expertise-list">
                                    <li><strong>Machine Learning & AI:</strong> Deep Learning, NLP, PyTorch, TensorFlow, Computer Vision (CNN, ViT), Generative AI</li>
                                    <li><strong>LLM Engineering:</strong> Fine-tuning, RAG systems, Agentic AI (LangChain, LangGraph, CrewAI, MCP)</li>
                                    <li><strong>MLOps & Deployment:</strong> Docker, FastAPI, MLflow, DVC, CI/CD with GitHub Actions</li>
                                    <li><strong>Cloud Infrastructure:</strong> AWS (EC2, ECR, S3, IAM)</li>
                                    <li><strong>Frameworks:</strong> PyTorch, TensorFlow, Scikit-learn, Streamlit</li>
                                </ul>

                                <h3>What I Deliver</h3>
                                <ul className="deliverables-list">
                                    <li>End-to-end AI solutions from data preprocessing to cloud deployment</li>
                                    <li>Custom LLM applications with fine-tuned models for specific domains</li>
                                    <li>Clean, modular code following software engineering best practices</li>
                                    <li>Scalable systems designed for real-world business impact</li>
                                </ul>
                            </div>
                        </div>

                        <div className="skills-sidebar">
                            {Object.entries(skills).map(([category, items]) => (
                                <div key={category} className="skills-section">
                                    <h3 className="skills-category-title">
                                        {{
                                            core: '🧠 Core AI / ML',
                                            mlops: '⚙️ MLOps',
                                            backend: '🔌 Backend',
                                            cloud: '☁️ Cloud',
                                            database: '🗄️ Databases',
                                        }[category]}
                                    </h3>
                                    <div className="skill-tags">
                                        {items.map((skill, idx) => (
                                            <SkillTag key={idx} skill={skill} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
