/**
 * Penrose Dashboard UI Script
 * * Handles basic UI interactivity for the dashboard.
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Toggle Functionality for Projects/Program View ---
    const projectsBtn = document.getElementById('projects-btn');
    const programBtn = document.getElementById('program-btn');

    // Set 'Projects' as active by default
    projectsBtn.classList.add('active');

    const toggleView = (activeBtn, inactiveBtn, viewName) => {
        if (activeBtn.classList.contains('active')) return;

        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');

        // In a real application, you would fetch and render data here.
        console.log(`Switched to ${viewName} View`);
    };

    projectsBtn.addEventListener('click', () => toggleView(projectsBtn, programBtn, 'Projects'));
    programBtn.addEventListener('click', () => toggleView(programBtn, projectsBtn, 'Program'));


    // --- Simulate Data Loading to show Skeleton Loader ---
    const contentGrid = document.getElementById('content-grid');
    const skeletonCards = contentGrid.querySelectorAll('.skeleton');
    const actualCards = contentGrid.querySelectorAll('.card:not(.skeleton)');

    // Simulate a network request delay (e.g., 2.5 seconds)
    setTimeout(() => {
        // Hide skeleton loaders
        skeletonCards.forEach(skeleton => {
            skeleton.style.display = 'none';
        });

        // Show actual content cards
        actualCards.forEach(card => {
            card.style.display = 'block';
        });
    }, 2500);

});