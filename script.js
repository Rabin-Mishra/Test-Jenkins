// Global variables
let currentBlogPage = 1;
const blogsPerPage = 6;
let allBlogs = [];
let allProjects = [];

// Sample blog data
const blogData = [
  {
    id: 1,
    title: "Getting Started with Kubernetes: A DevOps Journey",
    excerpt:
      "Exploring container orchestration and how Kubernetes transforms deployment strategies in modern cloud infrastructure.",
    category: "DevOps",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["Kubernetes", "Docker", "DevOps", "Cloud"],
    content: "Full blog content here...",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js and AWS Lambda",
    excerpt:
      "Learn how to create serverless APIs that automatically scale and reduce operational overhead using modern cloud services.",
    category: "Backend",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["Node.js", "AWS", "Serverless", "API"],
    content: "Full blog content here...",
  },
  {
    id: 3,
    title: "Machine Learning in Production: MLOps Best Practices",
    excerpt:
      "Bridging the gap between ML experiments and production systems with proper MLOps workflows and monitoring.",
    category: "AI/ML",
    date: "2025-01-05",
    readTime: "15 min read",
    tags: ["MLOps", "Python", "Machine Learning", "Production"],
    content: "Full blog content here...",
  },
  {
    id: 4,
    title: "React Performance Optimization Techniques",
    excerpt:
      "Advanced strategies for building lightning-fast React applications with modern optimization techniques and tools.",
    category: "Frontend",
    date: "2024-12-28",
    readTime: "10 min read",
    tags: ["React", "Performance", "JavaScript", "Optimization"],
    content: "Full blog content here...",
  },
  {
    id: 5,
    title: "Infrastructure as Code with Terraform",
    excerpt:
      "Automating cloud infrastructure deployment and management using Terraform for consistent and scalable environments.",
    category: "DevOps",
    date: "2024-12-20",
    readTime: "14 min read",
    tags: ["Terraform", "IaC", "AWS", "Automation"],
    content: "Full blog content here...",
  },
  {
    id: 6,
    title: "Docker Multi-Stage Builds: Optimizing Container Images",
    excerpt:
      "Reducing container image sizes and improving security with multi-stage Docker builds and best practices.",
    category: "DevOps",
    date: "2024-12-15",
    readTime: "7 min read",
    tags: ["Docker", "Containers", "Optimization", "Security"],
    content: "Full blog content here...",
  },
  {
    id: 7,
    title: "Deep Learning with TensorFlow: From Theory to Practice",
    excerpt:
      "Understanding neural networks and implementing deep learning models using TensorFlow for real-world applications.",
    category: "AI/ML",
    date: "2024-12-10",
    readTime: "18 min read",
    tags: ["TensorFlow", "Deep Learning", "Neural Networks", "Python"],
    content: "Full blog content here...",
  },
  {
    id: 8,
    title: "CI/CD Pipelines with GitHub Actions",
    excerpt:
      "Building robust continuous integration and deployment workflows using GitHub Actions for automated software delivery.",
    category: "DevOps",
    date: "2024-12-05",
    readTime: "11 min read",
    tags: ["GitHub Actions", "CI/CD", "Automation", "DevOps"],
    content: "Full blog content here...",
  },
];

// Sample project data
const projectData = [
  {
    id: 1,
    title: "CloudOps Dashboard",
    description:
      "A comprehensive monitoring dashboard for multi-cloud environments built with React and integrated with AWS, Azure, and GCP APIs.",
    technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
    github: "https://github.com/rabin/cloudops-dashboard",
    demo: "https://cloudops-demo.example.com",
    featured: true,
  },
  {
    id: 2,
    title: "AI-Powered Code Review Bot",
    description:
      "Machine learning model that automatically reviews code quality, suggests improvements, and detects potential bugs in pull requests.",
    technologies: ["Python", "TensorFlow", "GitHub API", "Docker", "FastAPI"],
    github: "https://github.com/rabin/ai-code-reviewer",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "Kubernetes Cluster Autoscaler",
    description:
      "Custom Kubernetes operator that intelligently scales clusters based on workload patterns and cost optimization algorithms.",
    technologies: ["Go", "Kubernetes", "Docker", "Prometheus", "Grafana"],
    github: "https://github.com/rabin/k8s-smart-scaler",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Serverless Data Pipeline",
    description:
      "Event-driven data processing pipeline using AWS Lambda, SQS, and DynamoDB for real-time analytics and reporting.",
    technologies: ["Python", "AWS Lambda", "DynamoDB", "SQS", "CloudWatch"],
    github: "https://github.com/rabin/serverless-pipeline",
    demo: "https://pipeline-demo.example.com",
    featured: false,
  },
  {
    id: 5,
    title: "DevOps Automation Toolkit",
    description:
      "Collection of scripts and tools for automating common DevOps tasks including deployment, monitoring, and infrastructure management.",
    technologies: ["Bash", "Python", "Terraform", "Ansible", "Jenkins"],
    github: "https://github.com/rabin/devops-toolkit",
    demo: null,
    featured: false,
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description:
      "Scalable real-time messaging application with features like file sharing, group chats, and end-to-end encryption.",
    technologies: ["React", "Socket.io", "Node.js", "Redis", "PostgreSQL"],
    github: "https://github.com/rabin/realtime-chat",
    demo: "https://chat-demo.example.com",
    featured: false,
  },
];

// Typing animation texts
const typingTexts = [
  "Hi, I'm Rabin",
  "Full Stack Developer",
  "Cloud Enthusiast",
  "DevOps Engineer",
  "AI Explorer",
];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize application
function initializeApp() {
  // Show loading screen
  showLoadingScreen();

  // Initialize data
  allBlogs = [...blogData];
  allProjects = [...projectData];

  // Setup event listeners
  setupEventListeners();

  // Start animations after short delay
  setTimeout(() => {
    hideLoadingScreen();
    startTypingAnimation();
    renderBlogs();
    renderProjects();
    initializeScrollAnimations();
  }, 1500);
}

// Loading screen functions
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "flex";
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden");
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
}

// Event listeners setup
function setupEventListeners() {
  // Navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      scrollToSection(targetId);

      // Close mobile menu
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");

      // Update active link
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Scroll event for navbar
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateActiveNavLink();
  });

  // Load more blogs button
  const loadMoreBtn = document.getElementById("load-more");
  loadMoreBtn.addEventListener("click", loadMoreBlogs);

  // Contact form
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", handleContactForm);

  // Tech cards hover effects
  document.querySelectorAll(".tech-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.animationPlayState = "paused";
    });

    card.addEventListener("mouseleave", () => {
      card.style.animationPlayState = "running";
    });
  });
}

// Typing animation
function startTypingAnimation() {
  const typingElement = document.querySelector(".typing-text");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function typeWriter() {
    const currentText = typingTexts[textIndex];

    if (isWaiting) {
      setTimeout(() => {
        isWaiting = false;
        isDeleting = true;
        typeWriter();
      }, 2000);
      return;
    }

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isWaiting = true;
      }
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
  }

  typeWriter();
}

// Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    const sectionTop = section.offsetTop - navHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const navHeight = document.querySelector(".navbar").offsetHeight;

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Render blog posts
function renderBlogs() {
  const blogGrid = document.getElementById("blog-grid");
  const blogsToShow = allBlogs.slice(0, currentBlogPage * blogsPerPage);

  blogGrid.innerHTML = "";

  blogsToShow.forEach((blog, index) => {
    const blogCard = createBlogCard(blog);
    blogCard.style.animationDelay = `${(index % blogsPerPage) * 0.1}s`;
    blogCard.classList.add("fade-in");
    blogGrid.appendChild(blogCard);
  });

  // Update load more button
  const loadMoreBtn = document.getElementById("load-more");
  if (blogsToShow.length >= allBlogs.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-flex";
  }
}

// Create blog card element
function createBlogCard(blog) {
  const card = document.createElement("div");
  card.className = "blog-card";

  card.innerHTML = `
        <div class="blog-meta">
            <span class="blog-category">${blog.category}</span>
            <span>${formatDate(blog.date)}</span>
        </div>
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <div class="blog-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">
            <span>${blog.readTime}</span>
            <div class="blog-tags" style="display: flex; gap: 0.5rem;">
                ${blog.tags
                  .slice(0, 2)
                  .map(
                    (tag) =>
                      `<span style="background: rgba(255, 255, 255, 0.1); padding: 2px 8px; border-radius: 8px; font-size: 0.8rem;">${tag}</span>`
                  )
                  .join("")}
            </div>
        </div>
    `;

  card.addEventListener("click", () => openBlogModal(blog));

  return card;
}

// Load more blogs
function loadMoreBlogs() {
  currentBlogPage++;
  renderBlogs();
}

// Render projects
function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  const featuredProjects = allProjects.filter((project) => project.featured);

  projectsGrid.innerHTML = "";

  featuredProjects.forEach((project, index) => {
    const projectCard = createProjectCard(project);
    projectCard.style.animationDelay = `${index * 0.1}s`;
    projectCard.classList.add("scale-in");
    projectsGrid.appendChild(projectCard);
  });
}

// Create project card element
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
        <div class="project-header">
            <h3>${project.title}</h3>
            <div class="project-links">
                ${
                  project.github
                    ? `<a href="${project.github}" target="_blank" class="project-link" title="GitHub"><i class="fab fa-github"></i></a>`
                    : ""
                }
                ${
                  project.demo
                    ? `<a href="${project.demo}" target="_blank" class="project-link" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>`
                    : ""
                }
            </div>
        </div>
        <p>${project.description}</p>
        <div class="project-tech">
            ${project.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
        </div>
    `;

  return card;
}

// Blog modal functions
function openBlogModal(blog) {
  // Create modal
  const modal = document.createElement("div");
  modal.className = "blog-modal";
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

  modal.innerHTML = `
        <div class="blog-modal-content" style="
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 15px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: scaleIn 0.3s ease;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
            ">&times;</button>
            <div class="blog-meta" style="margin-bottom: 1rem;">
                <span style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.8rem;">${
                  blog.category
                }</span>
                <span style="margin-left: 1rem; color: #666;">${formatDate(
                  blog.date
                )} • ${blog.readTime}</span>
            </div>
            <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem;">${
              blog.title
            }</h2>
            <p style="color: #666; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">${
              blog.excerpt
            }</p>
            <div style="color: #555; line-height: 1.8; font-size: 1rem;">
                <p>This is where the full blog content would be displayed. In a real implementation, you would fetch the complete article content from your backend or markdown files.</p>
                <p>The blog post would include detailed explanations, code examples, diagrams, and other rich content related to ${blog.title.toLowerCase()}.</p>
            </div>
            <div class="blog-tags" style="margin-top: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${blog.tags
                  .map(
                    (tag) =>
                      `<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 12px; border-radius: 12px; font-size: 0.9rem;">${tag}</span>`
                  )
                  .join("")}
            </div>
        </div>
    `;

  // Add event listeners
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeBlogModal(modal);
    }
  });

  modal.querySelector(".close-modal").addEventListener("click", () => {
    closeBlogModal(modal);
  });

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
}

function closeBlogModal(modal) {
  modal.style.animation = "fadeOut 0.3s ease";
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.style.overflow = "auto";
  }, 300);
}

// Contact form handler
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Reset form
    e.target.reset();

    // Show success message
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document
    .querySelectorAll("section, .blog-card, .project-card, .tech-card")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Search functionality (can be extended)
function searchBlogs(query) {
  const filteredBlogs = blogData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase().includes(query.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  allBlogs = filteredBlogs;
  currentBlogPage = 1;
  renderBlogs();
}

// Filter blogs by category
function filterBlogsByCategory(category) {
  if (category === "all") {
    allBlogs = [...blogData];
  } else {
    allBlogs = blogData.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  currentBlogPage = 1;
  renderBlogs();
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// Initialize dark mode from localStorage
function initializeDarkMode() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark-mode");
  }
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Theme color animation
function animateThemeColors() {
  const root = document.documentElement;
  const colors = [
    { primary: "#667eea", secondary: "#764ba2" },
    { primary: "#f093fb", secondary: "#f5576c" },
    { primary: "#4facfe", secondary: "#00f2fe" },
    { primary: "#43e97b", secondary: "#38f9d7" },
    { primary: "#667eea", secondary: "#764ba2" },
  ];

  let colorIndex = 0;

  setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    const color = colors[colorIndex];

    root.style.setProperty("--primary-color", color.primary);
    root.style.setProperty("--secondary-color", color.secondary);
  }, 10000);
}

// Parallax scrolling effect
function initializeParallax() {
  const parallaxElements = document.querySelectorAll(".parallax");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach((element) => {
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  });
}

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
  if (!("scrollBehavior" in document.documentElement.style)) {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js";
    document.head.appendChild(script);
  }
}

// Easter egg: Konami code
function initializeKonamiCode() {
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function activateEasterEgg() {
  // Add rainbow animation to the entire page
  document.body.style.animation = "rainbow 2s infinite";

  // Add CSS for rainbow animation if it doesn't exist
  if (!document.querySelector("#rainbow-style")) {
    const style = document.createElement("style");
    style.id = "rainbow-style";
    style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(style);
  }

  showNotification(
    "🌈 Rainbow mode activated! You found the easter egg!",
    "success"
  );

  // Reset after 5 seconds
  setTimeout(() => {
    document.body.style.animation = "";
  }, 5000);
}

// Progressive Web App functionality
function initializePWA() {
  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  // Add to home screen prompt
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show install button
    const installBtn = document.createElement("button");
    installBtn.className = "install-btn btn btn-primary";
    installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
    installBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
            animation: bounce 2s infinite;
        `;

    installBtn.addEventListener("click", () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          document.body.removeChild(installBtn);
        }
        deferredPrompt = null;
      });
    });

    document.body.appendChild(installBtn);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (document.body.contains(installBtn)) {
        document.body.removeChild(installBtn);
      }
    }, 10000);
  });
}

// Analytics and performance monitoring
function initializeAnalytics() {
  // Track page views
  console.log("Page view tracked:", window.location.pathname);

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      // Send analytics event for scroll milestones
      if (maxScroll % 25 === 0 && maxScroll > 0) {
        console.log(`Scroll milestone: ${maxScroll}%`);
      }
    }
  });

  // Track time on site
  const startTime = Date.now();
  window.addEventListener("beforeunload", () => {
    const timeOnSite = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time on site: ${timeOnSite} seconds`);
  });
}

// Accessibility improvements
function initializeA11y() {
  // Add focus indicators for keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });

  // Add skip to content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 0 0 4px 4px;
        z-index: 10001;
        transition: top 0.3s ease;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "0";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content ID
  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroSection.id = "main-content";
    heroSection.setAttribute("tabindex", "-1");
  }
}

// Error handling and fallbacks
function initializeErrorHandling() {
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error);
    showNotification("Something went wrong. Please refresh the page.", "error");
  });

  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
    e.preventDefault();
  });
}

// Performance monitoring
function monitorPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        console.log(`Page load time: ${loadTime}ms`);

        // Show performance warning if load time is too high
        if (loadTime > 3000) {
          console.warn("Page load time is high. Consider optimization.");
        }
      }, 0);
    });
  }
}

// Initialize all advanced features
function initializeAdvancedFeatures() {
  initializeLazyLoading();
  animateThemeColors();
  initializeParallax();
  smoothScrollPolyfill();
  initializeKonamiCode();
  initializePWA();
  initializeAnalytics();
  initializeA11y();
  initializeErrorHandling();
  monitorPerformance();
}

// Blog filtering and search UI
function createBlogFilters() {
  const blogSection = document.getElementById("blog");
  const blogHeader = blogSection.querySelector(".section-header");

  // Create filter container
  const filterContainer = document.createElement("div");
  filterContainer.className = "blog-filters";
  filterContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    `;

  // Get unique categories
  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

  categories.forEach((category) => {
    const filterBtn = document.createElement("button");
    filterBtn.className = `filter-btn ${category === "All" ? "active" : ""}`;
    filterBtn.textContent = category;
    filterBtn.style.cssText = `
            padding: 8px 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: transparent;
            color: white;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        `;

    filterBtn.addEventListener("click", () => {
      // Update active button
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      filterBtn.classList.add("active");

      // Filter blogs
      const categoryToFilter = category === "All" ? "all" : category;
      filterBlogsByCategory(categoryToFilter);
    });

    filterBtn.addEventListener("mouseover", () => {
      if (!filterBtn.classList.contains("active")) {
        filterBtn.style.background = "rgba(255, 255, 255, 0.1)";
      }
    });

    filterBtn.addEventListener("mouseout", () => {
      if (!filterBtn.classList.contains("active")) {
        filterBtn.style.background = "transparent";
      }
    });

    filterContainer.appendChild(filterBtn);
  });

  // Add search input
  const searchContainer = document.createElement("div");
  searchContainer.style.cssText = `
        margin-bottom: 1rem;
        text-align: center;
    `;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search blog posts...";
  searchInput.style.cssText = `
        padding: 12px 16px;
        width: 300px;
        max-width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 25px;
        color: white;
        font-size: 1rem;
    `;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    if (query.length > 2 || query.length === 0) {
      searchBlogs(query);
    }
  });

  searchContainer.appendChild(searchInput);

  // Insert filters after header
  blogHeader.parentNode.insertBefore(searchContainer, blogHeader.nextSibling);
  blogHeader.parentNode.insertBefore(
    filterContainer,
    searchContainer.nextSibling
  );
}

// Initialize blog filters after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for other initializations
  setTimeout(() => {
    createBlogFilters();
    initializeAdvancedFeatures();
  }, 100);
});

// Export functions for potential use in other scripts
window.RabinBlog = {
  searchBlogs,
  filterBlogsByCategory,
  scrollToSection,
  showNotification,
  toggleDarkMode,
};
