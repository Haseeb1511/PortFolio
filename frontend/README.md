# React Portfolio

A modern, responsive portfolio website built with React.js featuring dynamic project showcases, image carousels, and light/dark theme support.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?logo=reactrouter&logoColor=white)

## ✨ Features

- 🎨 **Light/Dark Theme** - Toggle between light and dark modes with persistent preference
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🖼️ **Image Carousel** - Multiple images per project with smooth sliding navigation
- 🏷️ **Technology Badges** - Prominent display of tools and technologies used
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development and builds
- 🧭 **Client-Side Routing** - Seamless navigation with React Router

## 🛠️ Technologies Used

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, React Router DOM |
| **Build Tool** | Vite |
| **Icons** | React Icons |
| **Styling** | CSS3 with CSS Variables |
| **State Management** | React Context API |

## 📁 Project Structure

```
react-portfolio/
├── public/
│   └── assets/
│       ├── images/           # Profile and general images
│       │   └── profile.jpg
│       ├── projects/         # Project images (organized by project)
│       │   ├── agentic-rag/
│       │   │   ├── cover.png
│       │   │   └── 2.png
│       │   ├── trip-planner/
│       │   │   ├── cover.png
│       │   │   ├── 2.png
│       │   │   ├── 3.png
│       │   │   └── 4.png
│       │   └── ...
│       └── Haseeb_CV.pdf     # CV/Resume file
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── ProjectCard.jsx
│   │   └── ProjectCard.css
│   ├── context/              # React Context providers
│   │   └── ThemeContext.jsx
│   ├── data/                 # Data files
│   │   └── projects.js       # ⭐ Project data (add new projects here)
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx
│   │   ├── HomePage.css
│   │   ├── AboutPage.jsx
│   │   ├── AboutPage.css
│   │   ├── ProjectsPage.jsx
│   │   ├── ProjectsPage.css
│   │   ├── ProjectDetailPage.jsx
│   │   ├── ProjectDetailPage.css
│   │   ├── ContactPage.jsx
│   │   └── ContactPage.css
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles & theme variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-portfolio.git
   cd react-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## 📝 Adding New Projects

### Step 1: Add Project Images

Create a new folder for your project in `public/assets/projects/`:

```
public/assets/projects/your-project-name/
├── cover.png    # Main image (required, shown first)
├── 2.png        # Additional image
├── 3.png        # Additional image
└── ...          # Add as many as needed
```

> **Tip:** Use landscape images(16:9 ratio) for best results. Name your first/main image `cover.png`.

### Step 2: Add Project Data

Open `src/data/projects.js` and add a new project object to the `projects` array:

```javascript
{
  id: "your-project-id",           // Unique URL-friendly ID (used in routes)
  title: "Your Project Title",
  description: "Short description for the project card (1-2 sentences)",
  fullDescription: `
    Detailed description that appears on the project detail page.
    Can be multi-line with markdown-like formatting.
    
    Key Features:
    - Feature 1
    - Feature 2
  `,
  images: [
    "/assets/projects/your-project-name/cover.png",
    "/assets/projects/your-project-name/2.png",
    "/assets/projects/your-project-name/3.png"
  ],
  tools: ["React", "Node.js", "MongoDB"],  // Technologies used (shown as badges)
  github: "https://github.com/yourusername/your-repo",
  liveDemo: "https://your-demo-url.com",   // Optional, set to null if none
  featured: true,                          // Show on homepage if true
  date: "2024-01-15"                       // For sorting (newest first)
}
```

### Step 3: Verify

1. Save the file
2. The dev server will hot-reload automatically
3. Visit `/projects` to see your new project
4. Click on it to view the detail page with image carousel

## 🎨 Customization

### Theme Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #0ea5ea;
  --secondary-color: #0bd1d1;
  --bg-color: #ffffff;
  --text-color: #1a1a2e;
  /* ... */
}

body.dark {
  --bg-color: #0a0a0f;
  --text-color: #ffffff;
  /* ... */
}
```

### Personal Information

- **Profile Image**: Replace `public/assets/images/profile.jpg`
- **CV/Resume**: Replace `public/assets/Haseeb_CV.pdf`
- **Social Links**: Edit links in `src/components/Hero.jsx` and `src/components/Footer.jsx`
- **About Content**: Edit `src/pages/AboutPage.jsx`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ by Haseeb
