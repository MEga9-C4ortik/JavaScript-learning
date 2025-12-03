const sidenav = document.getElementById('sidenav');
const hamburger = document.getElementById('hamburgerButton');
const overlay = document.getElementById('overlay');
const sidenavItems = document.querySelectorAll('.sidenavListItem');
const content = document.querySelectorAll('.contentSection');

async function fetchOpenF1(endpoint) {
    try{
        const url = "https://api.openf1.org/v1/" + endpoint;
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }catch(error){
        console.error("Error: " + error);
        return null;
    }
}

async function loadCalendar(){
    const meetings = await fetchOpenF1("meetings?year="+new Date());
    const races = await fetchOpenF1("sessions?year="+new Date()+ "&session_name=Race");

    const calendarData = meetings.map((meeting) => {
        const raceSession = races.find(r => r.meetingKey === meeting.id);
    });

    renderCalendar(calendarData)
}

function renderCalendar(data){
    const container = document.getElementById('calendar');
    container.innerHTML = '';

    if(!data || data.length === 0){
        container.innerHTML = '<p>No races found</p>';
        return;
    }

    data.forEach(element => {
        const card = document.createElement('div');
        card.className = 'race-card';

        const name = element.meeting.meeting_name;
        const location = element.meeting.location;
        const country = element.meeting.country_name;
        const date = new Date(element.meeting.date_start);

        container.appendChild(card);
    });
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
loadCalendar();
showSection("calendar");