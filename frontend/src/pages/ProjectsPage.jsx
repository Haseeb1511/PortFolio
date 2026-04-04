import { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../data/projects';
import './ProjectsPage.css';

// Category → keywords to match against tools array
const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'llm', label: 'LLM / Agents' },
    { id: 'rag', label: 'RAG' },
    { id: 'mlops', label: 'MLOps' },
    { id: 'ml', label: 'ML / DL' },
];

const CATEGORY_KEYWORDS = {
    llm: ['langgraph', 'langchain', 'langchain-memory', 'gpt', 'openai', 'mcp', 'crewai', 'agentic', 'llm', 'agent', 'whisper'],
    rag: ['rag', 'faiss', 'weaviate', 'pinecone', 'chroma', 'pgvector', 'retrieval', 'crossencoder', 're-ranking'],
    mlops: ['mlflow', 'docker', 'github actions', 'ci/cd', 'aws', 'ec2', 'ecr', 's3', 'dvc'],
    ml: ['pytorch', 'tensorflow', 'scikit', 'lstm', 'bert', 'numpy', 'transformer', 'deep learning'],
};

const matchesCategory = (project, categoryId) => {
    if (categoryId === 'all') return true;
    const keywords = CATEGORY_KEYWORDS[categoryId] || [];
    const toolsLower = project.tools.map(t => t.toLowerCase());
    const titleLower = project.title.toLowerCase();
    const descLower = project.description.toLowerCase();

    return keywords.some(kw =>
        toolsLower.some(t => t.includes(kw)) ||
        titleLower.includes(kw) ||
        descLower.includes(kw)
    );
};

const ProjectsPage = () => {
    const allProjects = getAllProjects();
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = useMemo(
        () => allProjects.filter(p => matchesCategory(p, activeFilter)),
        [activeFilter]
    );

    return (
        <div className="projects-page">
            <section className="section">
                <div className="container">
                    <p className="section-subtitle-light">Browse My Recent</p>
                    <h1 className="section-title">Projects</h1>

                    {/* Filter tabs */}
                    <div className="filter-tabs" role="tablist" aria-label="Project categories">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                role="tab"
                                aria-selected={activeFilter === cat.id}
                                className={`filter-tab ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                {cat.label}
                                {cat.id !== 'all' && (
                                    <span className="filter-count">
                                        {allProjects.filter(p => matchesCategory(p, cat.id)).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="projects-list">
                        {filtered.length === 0 ? (
                            <p className="no-results">No projects found for this category.</p>
                        ) : (
                            filtered.map(project => (
                                <ProjectCard key={project.id} project={project} isLandscape={true} />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;
