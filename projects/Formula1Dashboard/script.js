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
        const raceSession = races.find(r => r.meeting_key === meeting.meeting_key)
        return {
            meeting: meeting,
            session: raceSession
        }
    });

    calendarData.sort((a, b) => new Date(a.meeting.date_start) - new Date(b.meeting.date_start));
    renderCalendar(calendarData);
}

function renderCalendar(data){
    const container = document.getElementById('calendar');
    container.innerHTML = '';

    if(!data || data.length === 0){
        container.innerHTML = '<p>No races found</p>';
        return;
    }

    data.forEach(race => {
        const card = document.createElement('div')
        card.className = 'race-card'

        const name = race.meeting.meeting_name;
        const location = race.meeting.location;
        const country = race.meeting.country_name;
        const date = new Date(race.meeting.date_start);

        const dateStr = date.toLocaleDateString('en-GB', {
            month: 'short',
            day: 'numeric'
        });

        const countryFlags = {
            'Bahrain': '🇧🇭',
            'Saudi Arabia': '🇸🇦',
            'Australia': '🇦🇺',
            'Japan': '🇯🇵',
            'China': '🇨🇳',
            'United States': '🇺🇸',
            'Italy': '🇮🇹',
            'Monaco': '🇲🇨',
            'Canada': '🇨🇦',
            'Spain': '🇪🇸',
            'Austria': '🇦🇹',
            'United Kingdom': '🇬🇧',
            'Hungary': '🇭🇺',
            'Belgium': '🇧🇪',
            'Netherlands': '🇳🇱',
            'Azerbaijan': '🇦🇿',
            'Singapore': '🇸🇬',
            'Mexico': '🇲🇽',
            'Brazil': '🇧🇷',
            'Qatar': '🇶🇦',
            'UAE': '🇦🇪',
        }
        const flag = countryFlags[country] || '🏁';

        card.innerHTML = `
        <div class="race-header">
            <h3>${name}</h3>
        </div>
        <div class="race-info">
            <p class="race-location"> ${flag} ${country}, ${location}</p>
            <p class="race-date"> ${dateStr}</p>
        </div>
        <div class="race-winner">
            <p class="winner-label"> Winner:</p>
            <p class="winner-name">TBD</p>
        </div>
        `

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