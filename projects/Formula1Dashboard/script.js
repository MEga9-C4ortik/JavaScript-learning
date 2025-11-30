const sidenav = document.getElementById('sidenav');
const hamburger = document.getElementById('hamburgerButton');
const overlay = document.getElementById('overlay');
const sidenavItem = document.querySelector('.sidenavItem');
const content = document.querySelector('.mainContent');

function toggleSidenav() {
    sidenav.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function showSection(sectionId) {
    // Hide all sections
    content.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all buttons
    sidenavItem.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Close sidenav on mobile
    if (window.innerWidth < 1024) {
        toggleSidenav();
    }
}

// Event listeners
hamburger.addEventListener('click', toggleSidenav);
overlay.addEventListener('click', toggleSidenav);

sidenavItem.forEach(button => {
    button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        showSection(sectionId);
    });
});

hamburger.addEventListener('click', toggleSidenav);
overlay.addEventListener('click', toggleSidenav);