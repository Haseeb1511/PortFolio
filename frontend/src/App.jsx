import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import ExperiencePage from './pages/ExperiencePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage'; // Add this import
import './index.css';
import ChatbotWidget from "./components/ChatbotWidget";

function App() {
  console.log('App component rendering'); // Debug log

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} /> {/* Add this route */}
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>

      {/* Chatbot Widget added globally */}
      <ChatbotWidget />
    </ThemeProvider>
  );
}

export default App;