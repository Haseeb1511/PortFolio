import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../data/projects';
import './ProjectsPage.css';

const ProjectsPage = () => {
    const allProjects = getAllProjects();

    return (
        <div className="projects-page">
            <section className="section">
                <div className="container">
                    <p className="section-subtitle-light">Browse My Recent</p>
                    <h1 className="section-title">Projects</h1>

                    <div className="projects-list">
                        {allProjects.map(project => (
                            <ProjectCard key={project.id} project={project} isLandscape={true} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;
