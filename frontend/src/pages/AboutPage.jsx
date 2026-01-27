import './AboutPage.css';

const AboutPage = () => {
    const skills = {
        core: ['Python', 'Machine Learning', 'Deep Learning',"Pytorch","Tensorflow", 'NLP', 'Streamlit', 'Fine-tuning', 'LangChain', 'LangGraph', "CrewAI", "MCP","A2A Protocol"],
        mlops: ['MLflow', 'Docker', 'DVC', 'GitHub Actions (CI/CD)'],
        backend: ['FastAPI', 'Flask'],
        cloud: ['AWS (EC2, ECR, IAM, S3)'],
        database: ['MySQL', "Supabase(PostgreSQL)", "Pinecone","Weaviate","ChromaDB", "SQLite"]
    };

    return (
        <div className="about-page">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">About</h1>

                    <div className="about-layout">
                        <div className="about-main">
                            <div className="about-card card">
                                <h2>AI Engineer</h2>
                                <p className="intro-text">
                                    I build intelligent, production-ready AI systems that scale—from research to deployment.
                                </p>

                                <h3>Core Expertise</h3>
                                <ul className="expertise-list">
                                    <li><strong>Machine Learning & AI:</strong> Deep Learning, NLP,Pytorch,Tensorflow,Computer Vision(CNN,ViT), Generative AI</li>
                                    <li><strong>LLM Engineering:</strong> Fine-tuning, RAG systems, Agentic AI (LangChain, LangGraph,CrewAI)</li>
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

                                <p className="closing-statement">
                                    I'm passionate about building <strong>AI systems that don't just work — but scale, adapt, and evolve</strong> with your business needs.
                                </p>
                            </div>
                        </div>

                        <div className="skills-sidebar">
                            <div className="skills-section">
                                <h3>Skills</h3>
                                <div className="skill-tags">
                                    {skills.core.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="skills-section">
                                <h3>MLOps</h3>
                                <div className="skill-tags">
                                    {skills.mlops.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="skills-section">
                                <h3>Backend</h3>
                                <div className="skill-tags">
                                    {skills.backend.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="skills-section">
                                <h3>Cloud</h3>
                                <div className="skill-tags">
                                    {skills.cloud.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="skills-section">
                                <h3>Database</h3>
                                <div className="skill-tags">
                                    {skills.database.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
