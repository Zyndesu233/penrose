document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projectsGrid');
    const userNameSpan = document.getElementById('userName');
    const userNameDisplaySpan = document.getElementById('userNameDisplay');
    const searchButton = document.getElementById('searchButton');
    const addProjectButton = document.getElementById('addProjectButton');

    // --- User Name Display ---
    const userName = "Jane Doe"; // Replace with actual user name from backend
    userNameSpan.textContent = userName;
    userNameDisplaySpan.textContent = userName;

    // --- Skeleton Loader and Project/Program Display ---
    const numberOfSkeletons = 9; // 3 rows with 3 blocks per row
    const projectData = [
        {
            title: "Project Alpha",
            description: "A comprehensive solution for data analysis and visualization.",
            imageUrl: "https://via.placeholder.com/300x180/0A2463/FFFFFF?text=Project+Alpha"
        },
        {
            title: "Program Beta",
            description: "An innovative program designed to enhance productivity.",
            imageUrl: "https://via.placeholder.com/300x180/00C4CC/0A2463?text=Program+Beta"
        },
        {
            title: "Project Gamma",
            description: "Developing a new mobile application for seamless communication.",
            imageUrl: "https://via.placeholder.com/300x180/0A2463/FFFFFF?text=Project+Gamma"
        },
        {
            title: "Program Delta",
            description: "A training initiative focused on skill development in AI.",
            imageUrl: "https://via.placeholder.com/300x180/00C4CC/0A2463?text=Program+Delta"
        },
        {
            title: "Project Epsilon",
            description: "Research and development into sustainable energy solutions.",
            imageUrl: "https://via.placeholder.com/300x180/0A2463/FFFFFF?text=Project+Epsilon"
        },
        {
            title: "Program Zeta",
            description: "Community outreach program for digital literacy.",
            imageUrl: "https://via.placeholder.com/300x180/00C4CC/0A2463?text=Program+Zeta"
        },
        {
            title: "Project Eta",
            description: "Creating a new e-commerce platform with enhanced features.",
            imageUrl: "https://via.placeholder.com/300x180/0A2463/FFFFFF?text=Project+Eta"
        },
        {
            title: "Program Theta",
            description: "Mentorship program for aspiring software developers.",
            imageUrl: "https://via.placeholder.com/300x180/00C4CC/0A2463?text=Program+Theta"
        },
        {
            title: "Project Iota",
            description: "Designing a responsive user interface for a new web application.",
            imageUrl: "https://via.placeholder.com/300x180/0A2463/FFFFFF?text=Project+Iota"
        }
    ];

    // Function to create a skeleton loader block
    function createSkeletonBlock() {
        const skeletonBlock = document.createElement('div');
        skeletonBlock.classList.add('project-block', 'skeleton');
        skeletonBlock.innerHTML = `
            <div class="project-block-picture skeleton"></div>
            <div class="project-block-content">
                <div class="project-block-title skeleton"></div>
                <div class="project-block-description skeleton"></div>
                <div class="project-block-description skeleton"></div>
            </div>
        `;
        return skeletonBlock;
    }

    // Function to create a project/program block with actual data
    function createProjectBlock(project) {
        const projectBlock = document.createElement('div');
        projectBlock.classList.add('project-block');
        projectBlock.innerHTML = `
            <div class="project-block-picture">
                <img src="${project.imageUrl}" alt="${project.title}">
            </div>
            <div class="project-block-content">
                <h3 class="project-block-title">${project.title}</h3>
                <p class="project-block-description">${project.description}</p>
            </div>
        `;
        return projectBlock;
    }

    // Display skeleton loaders initially
    for (let i = 0; i < numberOfSkeletons; i++) {
        projectsGrid.appendChild(createSkeletonBlock());
    }

    // Simulate data loading
    setTimeout(() => {
        // Clear existing skeletons
        projectsGrid.innerHTML = '';
        // Add actual project blocks
        projectData.forEach(project => {
            projectsGrid.appendChild(createProjectBlock(project));
        });
    }, 2000); // Simulate a 2-second loading time

    // --- Basic Event Listeners (for demonstration) ---
    searchButton.addEventListener('click', () => {
        const searchTerm = document.getElementById('projectSearch').value;
        alert(`Searching for: "${searchTerm}" (No actual search logic implemented)`);
    });

    addProjectButton.addEventListener('click', () => {
        alert("Add Project or Program button clicked! (No actual add logic implemented)");
    });
});