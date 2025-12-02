const sidenav = document.getElementById('sidenav');
const hamburger = document.getElementById('hamburgerButton');
const overlay = document.getElementById('overlay');
const sidenavItems = document.querySelectorAll('.sidenavListItem');
const content = document.querySelectorAll('.contentSection');

async function fetchData(endpoint) {
    try{
        const url = "https://api.openf1.org/v1/" + endpoint;
        return await (await fetch(url)).json();
    }catch(error){
        console.error("Error: " + error);
        return null;
    }
}

function toggleSidenav() {
    sidenav.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function showSection(sectionId) {
    // Hide all sections
    content.forEach(section => {
        section.style.display = 'none';
    });

    // Remove active class from all buttons
    sidenavItems.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
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

hamburger.addEventListener('click', toggleSidenav);
overlay.addEventListener('click', toggleSidenav);

sidenavItems.forEach(button => {
    button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        showSection(sectionId);
    });
});

showSection("calendar");