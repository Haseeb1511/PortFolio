// Projects data with tools/technologies and multiple images
const projects = [


  {
    id: "medvision-ai",
    title: "MedVision AI - Medical Multimodal Assistant",
    description: "An intelligent, agentic medical AI assistant combining Multimodal RAG, LangGraph orchestration, and multiple specialized medical MCP tools.",
    fullDescription: `A sophisticated medical AI assistant designed to deliver evidence-based, context-aware clinical insights by reasoning over documents, images, and external biomedical databases. 

Key Technical Implementations:
- **Multimodal RAG & Local Vision**: Ingests PDFs to extract both text and images simultaneously. Uses the lightweight local Salesforce BLIP model for offline image captioning, eliminating the need for expensive external vision APIs.
- **RRF Re-ranking**: Integrates Reciprocal Rank Fusion to merge text and image retrieval results into a highly accurate unified context.
- **Agentic ReAct Workflow**: Powered by GPT-4o and LangGraph, the agent autonomously decides which tools to call, in what order, and when to finalize responses.
- **Medical MCP Servers**: Directly integrated with specialized Medical Context Protocol (MCP) servers to fetch live data from PubMed, OpenFDA, and ClinicalTrials.gov.
- **Dual Memory Architecture**: Implements a conversation summary node for Short-Term Memory (STM) and Supabase pgvector for persistent Long-Term Memory (LTM) across sessions.
- **Real-time Streaming & SaaS Ready**: Features real-time SSE token streaming, JWT-based secure user authentication, and tenant isolation for production readiness.`,
    images: [
      "https://www.youtube.com/embed/W9g9SPKEGOA",
      "/assets/projects/medvision-ai/cover.png",
      "/assets/projects/medvision-ai/1.png",
      "/assets/projects/medvision-ai/3.png",
      "/assets/projects/medvision-ai/4.png",
      "/assets/projects/medvision-ai/5.png",
      "/assets/projects/medvision-ai/graph.png"
    ],
    tools: [
      "FastAPI",
      "LangGraph",
      "React",
      "Tailwind CSS",
      "PostgreSQL (pgvector)",
      "Supabase",
      "Weaviate",
      "GPT-4o & BLIP",
      "MCP (Model Context Protocol)",
      "RAG"
    ],
    github: "https://github.com/Haseeb1511/med-vision-ai.git",
    liveDemo: null,
    featured: true,
    date: "2026-03-18"
  },




  {
    "id": "qanoon-ai",
    "title": "QanoonAI",
    "description": "An advanced legal AI assistant featuring an end-to-end voice pipeline, corrective RAG with hybrid retrieval, and agentic workflows.",
    "fullDescription": "A sophisticated Legal AI Agent designed to answer complex queries by retrieving and synthesizing information from legal documents. Built with a focus on accuracy and user experience, it employs a state-of-the-art RAG pipeline and a responsive voice interface.\n\nKey Technical Implementations:\n- **End-to-End Voice Pipeline**: Implemented a seamless voice interaction system. Audio is recorded on the frontend with waveform visualization, transcribed using OpenAI Whisper (STT), and responses are read back using OpenAI TTS (Text-to-Speech), enabling a complete hands-free experience.\n- **Advanced RAG Architecture**: Features a Hybrid Retrieval system combining BM25 (keyword search) and Dense Vector Search (semantic search) via Reciprocal Rank Fusion (RRF) for high-fidelity retrieval.\n- **Corrective RAG (CRAG)**: Integrating a self-correcting mechanism where retrieved documents are graded for relevance by an LLM. If confidence is low, the system autonomously transforms the query and retries retrieval, ensuring high answer quality.\n- **Agentic Workflow**: Powered by LangGraph, the system functions as a state machine with specialized nodes for document ingestion, query rewriting (for follow-up context), retrieval grading, and summarization to handle long context windows efficiently.\n- **Real-time Streaming**: Full server-sent events (SSE) implementation for token-by-token streaming of text and audio responses.",
    "images": [
      "https://www.youtube.com/embed/agc7DJ01wVM",
      "/assets/projects/qanoon-ai/cover.png",
      "/assets/projects/qanoon-ai/backend_deploy.png",
      "/assets/projects/qanoon-ai/graph.png",
    ],
    "tools": [
      "FastAPI",
      "LangGraph",
      "LangChain",
      "React",
      "PostgreSQL (pgvector)",
      "Supabase",
      "OpenAI Whisper & TTS",
      "Docker",
      "AWS",
      "GithubAction(CICD)"
    ],
    "github": "https://github.com/Haseeb1511/qanoon-ai.git",
    "featured": true,
    "date": "2025-02-14"
  },




  {
    id: "transformer-scratch",
    title: "Pre-Trained Encoder-Decoder Transformer From Scratch",
    description: "Built a complete transformer architecture from scratch using PyTorch, implementing attention mechanisms and training loops for sequence-to-sequence tasks.",
    fullDescription: `A complete implementation of the Transformer architecture from scratch using PyTorch. This project demonstrates deep understanding of attention mechanisms, positional encoding, and the encoder-decoder structure that powers modern large language models.

Key Features:
- Multi-Head Self-Attention: Implemented the core attention mechanism
- Positional Encoding: Added sinusoidal positional encodings
- Encoder-Decoder Architecture: Built both stacks with proper masking
- Training Pipeline: Complete training loops with learning rate scheduling`,
    images: [
      "/assets/projects/llm/cover.jpg",
      "/assets/projects/llm/0.png",
      "/assets/projects/llm/output.png",
      "/assets/projects/llm/encoder.png",
      "/assets/projects/llm/decoder.png",
      "/assets/projects/llm/4.png",
      "/assets/projects/llm/5.png",
    ],
    tools: ["PyTorch", "Python", "NumPy", "Matplotlib"],
    github: "https://github.com/Haseeb1511/LLMs-From-Scratc.git",
    liveDemo: null,
    featured: true,
    date: "2024-12-01"
  },





  {
    id: "agentic-rag",
    title: "Agentic RAG (Memory + Persistence)",
    description: "Developed an intelligent RAG system with conversation memory and persistent storage using LangGraph, enabling contextual multi-turn conversations.",
    fullDescription: `An intelligent RAG (Retrieval Augmented Generation) system built with LangGraph that maintains conversation memory and persistent storage. This enables contextual multi-turn conversations where the system remembers previous interactions.

Key Features:
- Conversation Memory: Maintains context across multiple turns
- Persistent Storage: SQLite-based storage for conversation history
- Memory: ConversationalBufferSummaryMemory 
- Agentic Architecture: Uses LangGraph for intelligent workflow management
- Docker Deployment: Containerized with Docker Compose`,
    images: [
      "/assets/projects/agentic-rag/cover.png",
      "/assets/projects/agentic-rag/2.png"
    ],
    tools: ["FastAPI", "Streamlit", "LangGraph", "Docker-Compose", "SQLite", "Langchain-Memory"],
    github: "https://github.com/Haseeb1511/Agentic-RAG-LangGraph.git",
    liveDemo: null,
    featured: true,
    date: "2024-11-15"
  },




  {
    id: "imdb-sentiment",
    title: "IMDB Review Sentiment Analysis (End-to-End)",
    description: "Complete MLOps pipeline for sentiment analysis with automated deployment, monitoring, and CI/CD. Deployed on AWS with full MLflow experiment tracking.",
    fullDescription: `A complete end-to-end machine learning pipeline for sentiment analysis of IMDB movie reviews. This project showcases full MLOps implementation from data preprocessing to cloud deployment.

Key Features:
- Full MLOps Pipeline: Data preprocessing to deployment
- MLflow Integration: Complete experiment tracking and model registry
- CI/CD Pipeline: Automated with GitHub Actions
- AWS Deployment: EC2, ECR, and S3 integration`,
    images: [
      "/assets/projects/imdb-sentiment/cover.png"
    ],
    tools: ["FastAPI", "Streamlit", "Docker-Compose", "GitHub Actions (CI/CD)", "MLflow", "S3 Storage", "AWS (EC2, ECR)"],
    github: "https://github.com/Haseeb1511/IMDB-Movie-Review-Sentiment-Anaysis-End-to-End.git",
    liveDemo: null,
    featured: true,
    date: "2024-10-20"
  },




  {
    id: "trip-planner",
    title: "Trip Organizer AI Agent (End-to-End)",
    description: "AI-powered trip planning agent with full deployment pipeline, MongoDB persistence, and interactive web interface for personalized itinerary generation.",
    fullDescription: `An AI-powered trip planning agent that generates personalized travel itineraries. Features a full deployment pipeline with MongoDB for persistent storage and an interactive web interface.

Key Features:
- AI-Powered Planning: Intelligent itinerary generation
- MongoDB Persistence: Atlas-based storage
- Interactive UI: User-friendly web interface
- Cloud Deployment: AWS EC2 and ECR`,
    images: [
      "/assets/projects/trip-planner/cover.png",
      "/assets/projects/trip-planner/2.png",
      "/assets/projects/trip-planner/3.png",
      "/assets/projects/trip-planner/4.png"
    ],
    tools: ["FastAPI", "HTML", "CSS", "Docker", "S3 Storage", "GitHub Actions (CI/CD)", "AWS (EC2, ECR)", "MongoDB Atlas"],
    github: "https://github.com/Haseeb1511/End-to-End-Trip-Planer-AI-Agent.git",
    liveDemo: null,
    featured: false,
    date: "2024-09-10"
  },





//   {
//     id: "medical-chatbot",
//     title: "RAG-Based Custom Medical Chatbot (Multimodal)",
//     description: "Multimodal medical chatbot leveraging RAG architecture to provide accurate health information from multiple medical knowledge bases.",
//     fullDescription: `A multimodal medical chatbot that uses RAG architecture to retrieve accurate health information from multiple medical knowledge bases. Supports both text and image inputs for comprehensive medical queries.

// Key Features:
// - Multimodal Input: Text and image support
// - RAG Architecture: Accurate information retrieval
// - Multiple Knowledge Bases: Comprehensive medical data
// - Streamlit Interface: User-friendly chat interface`,
//     images: [
//       "/assets/projects/medical-chatbot/cover.png"
//     ],
//     tools: ["LangChain", "Streamlit", "Python"],
//     github: "https://github.com/Haseeb1511/MedBot_RAG-Powered-multmodel-multidomain-.git",
//     liveDemo: null,
//     featured: false,
//     date: "2024-08-15"
//   },




  {
    id: "ai-lawyer",
    title: "AI Lawyer Chatbot (RAG-Based)",
    description: "Intelligent legal assistant using RAG with CrossEncoder re-ranking for precise legal query responses and document retrieval.",
    fullDescription: `An intelligent legal assistant chatbot using RAG architecture with CrossEncoder re-ranking for precise legal query responses. The system retrieves relevant legal documents and provides accurate answers.

Key Features:
- CrossEncoder Re-ranking: Improved retrieval precision
- Legal Document Retrieval: Accurate legal information
- RAG Architecture: Context-aware responses
- Streamlit Interface: Easy-to-use chat UI`,
    images: [
      "/assets/projects/ai-lawyer/cover.png",
      "/assets/projects/ai-lawyer/2.png",
      "/assets/projects/ai-lawyer/3.png"
    ],
    tools: ["Streamlit", "LangChain", "CrossEncoder (Re-Ranking)", "Python"],
    github: "https://github.com/Haseeb1511/AI_lawyer_chatbot.git",
    liveDemo: null,
    featured: false,
    date: "2024-07-20"
  },




  {
    id: "youtube-rag",
    title: "RAG-Powered YouTube Video Chatbot",
    description: "Interactive chatbot that processes YouTube videos, extracts insights using FAISS vector search, and enables Q&A on video content.",
    fullDescription: `An interactive chatbot that processes YouTube videos and enables question-answering on video content. Uses FAISS for efficient vector search and retrieval.

Key Features:
- YouTube Video Processing: Automatic transcript extraction
- FAISS Vector Search: Efficient similarity search
- Interactive Q&A: Ask questions about video content
- Streamlit Interface: Simple and intuitive UI`,
    images: [
      "/assets/projects/youtube-rag/cover.png",
      "/assets/projects/youtube-rag/2.png"
    ],
    tools: ["Streamlit", "LangChain", "FAISS", "Python"],
    github: "https://github.com/Haseeb1511/RAG_Powered_YT_VIDEO_Q-A.git",
    liveDemo: null,
    featured: false,
    date: "2024-06-25"
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getAllProjects = () => projects;
export const getProjectById = (id) => projects.find(p => p.id === id);

export default projects;
