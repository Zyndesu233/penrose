document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENT SELECTION ---
    const projectGrid = document.getElementById('project-grid');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- MOCK PROJECT DATA ---
    // In a real application, this data would come from an API
    const projects = [
        { title: 'Project Alpha', description: 'User authentication and dashboard development.', status: 'on-time', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070' },
        { title: 'Project Beta', description: 'API integration for third-party services.', status: 'late', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974' },
        { title: 'Project Gamma', description: 'Client onboarding and initial setup.', status: 'onboarding', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070' },
        { title: 'Delta Initiative', description: 'Developing the core e-commerce features.', status: 'on-time', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931' },
        { title: 'Epsilon Task', description: 'Data migration from legacy systems.', status: 'on-time', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070' },
        { title: 'Zeta Project', description: 'Mobile application design phase.', status: 'onboarding', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974' },
        { title: 'Project Eta', description: 'Performance optimization and bug fixes.', status: 'late', img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070' },
        { title: 'Theta Deployment', description: 'Server setup and deployment automation.', status: 'on-time', img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070' },
        { title: 'Iota Research', description: 'User experience research and interviews.', status: 'onboarding', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070' },
        { title: 'Project Kappa', description: 'Marketing website redesign and launch.', status: 'on-time', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070' },
        { title: 'Lambda System', description: 'Internal tool for project management.', status: 'late', img: 'https://images.unsplash.com/photo-1573495783074-768a3138b251?q=80&w=1974' },
        { title: 'Mu Finalization', description: 'Final QA testing before client delivery.', status: 'on-time', img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070' },
    ];
    
    let currentFilter = 'all';

    /**
     * Renders the project blocks into the grid.
     */
    const renderProjects = () => {
        // Clear skeleton loaders or existing projects
        projectGrid.innerHTML = ''; 

        // Filter projects based on the current filter
        const filteredProjects = projects.filter(project => {
            if (currentFilter === 'all') return true;
            return project.status === currentFilter;
        });

        // Generate and append project blocks
        filteredProjects.forEach((project, index) => {
            const projectBlock = document.createElement('div');
            projectBlock.className = 'project-block';
            projectBlock.setAttribute('data-status', project.status);

            // Hide projects beyond the 9th one if no filter is active
            if (currentFilter === 'all' && index >= 9) {
                projectBlock.classList.add('hidden');
            }

            projectBlock.innerHTML = `
                <img src="${project.img}&auto=format&fit=crop&w=400" alt="${project.title}" class="project-block-cover">
                <div class="project-block-content">
                    <h3 class="project-block-title">${project.title}</h3>
                    <p class="project-block-description">${project.description}</p>
                </div>
            `;
            projectGrid.appendChild(projectBlock);
        });

        // Show or hide the "View More" button
        if (currentFilter === 'all' && projects.length > 9) {
            viewMoreBtn.classList.remove('hidden');
        } else {
            viewMoreBtn.classList.add('hidden');
        }
    };

    /**
     * Handles the click on the "View More" button.
     */
    viewMoreBtn.addEventListener('click', () => {
        // Find all hidden project blocks and show them
        projectGrid.querySelectorAll('.project-block.hidden').forEach(block => {
            block.classList.remove('hidden');
        });
        // Hide the button after it's been clicked
        viewMoreBtn.classList.add('hidden');
    });

    /**
     * Handles clicks on the filter buttons.
     */
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // If the clicked filter is already active, reset to 'all'
            if (button.classList.contains('active')) {
                currentFilter = 'all';
                button.classList.remove('active');
            } else {
                // Otherwise, set the new filter
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = filter;
            }
            
            renderProjects();
        });
    });

    // --- INITIAL PAGE LOAD ---
    // Simulate a network delay for fetching data
    setTimeout(() => {
        renderProjects();
    }, 2000); // 2-second delay
});