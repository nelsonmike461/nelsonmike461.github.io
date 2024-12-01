function setupVideoHover() {
  const projectContainers = document.querySelectorAll(
    ".project-hover-container"
  );

  projectContainers.forEach((container) => {
    const video = container.querySelector("video");

    if (!video) return;

    container.addEventListener("mouseenter", () => {
      video.play();
    });

    container.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

// Handle active state for navigation
function setupActiveNavigation() {
  const sections = document.querySelectorAll("#about, #skills, #projects");
  const navLinks = document.querySelectorAll(".navigation__link");

  const observerOptions = {
    threshold: 1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Handle click events separately
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

// Handle resume download
function ResumeDownload() {
  const resumeLink = document.querySelector(".resume-link");
  if (resumeLink) {
    resumeLink.addEventListener("click", (e) => {
      fetch(resumeLink.href)
        .then((response) => {
          if (!response.ok) {
            e.preventDefault();
            alert(
              "Resume file is currently unavailable. Please try again later."
            );
          }
        })
        .catch(() => {
          e.preventDefault();
          alert("Unable to download resume. Please try again later.");
        });
    });
  }
}

// Close mobile navigation when links are clicked
function setupMobileNavigation() {
  const navLinks = document.querySelectorAll(".navigation__link");
  const navCheckbox = document.getElementById("nav-toggle");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navCheckbox.checked = false;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("projectList");
  const showMoreBtn = document.getElementById("showMoreBtn");

  // Initial setup
  setupVideoHover();
  ResumeDownload();
  setupMobileNavigation();
  setupActiveNavigation();

  // Additional projects data
  const additionalProjects = [
    {
      name: "Google Clone",
      description: "A responsive front-end clone of Google's website.",
      technologies: ["HTML", "CSS"],
      codeLink: "https://github.com/nelsonmike461/Google-clone",
      demoLink: "https://youtu.be/9R7HyW_71II?si=0OKd8OLSDl3idEmY",
      videoPath: "/static/portfolio/images/mp4/Gclone.mp4",
    },
    {
      name: "Mail",
      description:
        "A Single-page email client that makes API calls with React.js",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Django",
        "Python",
        "ORM",
      ],
      codeLink: "https://github.com/nelsonmike461/mail",
      demoLink: "",
      videoPath: "/static/portfolio/images/mp4/Mail.mp4",
    },
  ];

  let projectsShown = 2;

  showMoreBtn.addEventListener("click", () => {
    // Render next set of projects
    const projectsToShow = additionalProjects.slice(0, 2);
    const initialProjectCount = projectList.children.length;

    projectsToShow.forEach((project) => {
      const projectItem = document.createElement("li");
      projectItem.innerHTML = `
            <div class="details__projects--container">
              <h3>
                <span><a href="${project.codeLink}" target="_blank">${
        project.name
      }</a></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </h3>
              <div class="project-hover-container">
                <p>${project.description}</p>
                <div class="project-hover-gif">
                  <video 
                    src="${project.videoPath}" 
                    alt="${project.name} Project Demo"
                    muted 
                    loop 
                    playsinline
                  ></video>
                </div>
              </div>
              <ul>
                ${project.technologies
                  .map((tech) => `<li>${tech}</li>`)
                  .join("")}
              </ul>
              <ul class="details__projects--container-link">
                <li>
                  <a href="${project.codeLink}" target="_blank">CODE</a>
                </li>
                ${
                  project.demoLink
                    ? `
                <li>
                  <a href="${project.demoLink}" target="_blank">DEMO</a>
                </li>
                `
                    : ""
                }
              </ul>
            </div>
          `;

      projectList.appendChild(projectItem);
    });

    setupVideoHover();

    projectsShown += projectsToShow.length;

    // Scroll to the newly added projects
    const newProjects = Array.from(projectList.children).slice(
      initialProjectCount
    );
    if (newProjects.length > 0) {
      newProjects[0].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Hide button if no more projects
    if (projectsShown >= additionalProjects.length + 2) {
      showMoreBtn.style.display = "none";
    }
  });
});
