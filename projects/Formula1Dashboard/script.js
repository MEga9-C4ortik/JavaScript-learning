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

async function loadCalendar() {
    const currentYear = new Date().getFullYear();

    const meetings = await fetchOpenF1(`meetings?year=${currentYear}`);
    const sessions = await fetchOpenF1(`sessions?year=${currentYear}`);

    if (!meetings || !sessions) {
        console.error('Failed to load data');
        return;
    }

    // Для каждого meeting собрать все сессии
    allRaces = meetings.map(meeting => {
        const meetingSessions = sessions.filter(s => s.meeting_key === meeting.meeting_key);

        return {
            meeting: meeting,
            sessions: {
                fp1: meetingSessions.find(s => s.session_name === 'Practice 1'),
                fp2: meetingSessions.find(s => s.session_name === 'Practice 2'),
                fp3: meetingSessions.find(s => s.session_name === 'Practice 3'),
                sprint: meetingSessions.find(s => s.session_name === 'Sprint'),
                qualifying: meetingSessions.find(s => s.session_name === 'Qualifying'),
                race: meetingSessions.find(s => s.session_name === 'Race')
            }
        };
    });

    // Сортировать по дате
    allRaces.sort((a, b) => new Date(a.meeting.date_start) - new Date(b.meeting.date_start));

    console.log('Loaded races:', allRaces);

    // Показать первую гонку
    renderRaceCard(0);
}

function renderRaceCard(index) {
    if (!allRaces || allRaces.length === 0) return;
    if (!allRaces[index]) return;

    const currentRaceIndex = index;
    const race = allRaces[index];
    const container = document.getElementById('calendarData');

    // Флаги стран
    const countryFlags = {
        'Bahrain': '🇧🇭', 'Saudi Arabia': '🇸🇦', 'Australia': '🇦🇺',
        'Japan': '🇯🇵', 'China': '🇨🇳', 'United States': '🇺🇸',
        'Italy': '🇮🇹', 'Monaco': '🇲🇨', 'Canada': '🇨🇦',
        'Spain': '🇪🇸', 'Austria': '🇦🇹', 'United Kingdom': '🇬🇧',
        'Hungary': '🇭🇺', 'Belgium': '🇧🇪', 'Netherlands': '🇳🇱',
        'Azerbaijan': '🇦🇿', 'Singapore': '🇸🇬', 'Mexico': '🇲🇽',
        'Brazil': '🇧🇷', 'Qatar': '🇶🇦', 'UAE': '🇦🇪'
    };

    const flag = countryFlags[race.meeting.country_name] || '🏁';

    // Создать карточку
    container.innerHTML = `
        <div class="race-card">
            <div class="race-card-header">
                <h2 class="track-name">${race.meeting.location.toUpperCase()}</h2>
                <div class="track-details">
                    <p>${flag} ${race.meeting.country_name} • ${race.meeting.meeting_name}</p>
                    <p>${race.meeting.location}</p>
                </div>
            </div>
            
            <div class="session-tabs">
                <button class="session-tab active" data-session="race">Race</button>
                <button class="session-tab" data-session="qualifying">Qualifying</button>
                ${race.sessions.sprint ? '<button class="session-tab" data-session="sprint">Sprint</button>' : ''}
                <button class="session-tab" data-session="fp3">FP3</button>
                <button class="session-tab" data-session="fp2">FP2</button>
                <button class="session-tab" data-session="fp1">FP1</button>
            </div>
            
            <div class="session-content">
                <div class="session-schedule">
                    <p class="session-time">Loading...</p>
                </div>
            </div>
            
            <div class="race-navigation">
                <button class="nav-btn prev" ${index === 0 ? 'disabled' : ''}>← Previous</button>
                <span class="race-counter">Round ${index + 1} of ${allRaces.length}</span>
                <button class="nav-btn next" ${index === allRaces.length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        </div>
    `;

    // Добавить обработчики
    setupSessionTabs();
    setupNavigation();

    // Показать первую сессию (Race)
    showSession('race');
}

function setupSessionTabs() {
    document.querySelectorAll('.session-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const sessionType = tab.getAttribute('data-session');
            showSession(sessionType);
        });
    });
}

function setupNavigation() {
    document.querySelector('.nav-btn.prev')?.addEventListener('click', () => {
        if (currentRaceIndex > 0) {
            renderRaceCard(currentRaceIndex - 1);
        }
    });

    document.querySelector('.nav-btn.next')?.addEventListener('click', () => {
        if (currentRaceIndex < allRaces.length - 1) {
            renderRaceCard(currentRaceIndex + 1);
        }
    });
}

function showSession(sessionType) {
    const race = allRaces[currentRaceIndex];
    const session = race.sessions[sessionType];

    // Обновить активный таб
    document.querySelectorAll('.session-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-session="${sessionType}"]`)?.classList.add('active');

    if (!session) {
        document.querySelector('.session-content').innerHTML = `
            <div class="session-schedule">
                <p class="session-time">Session not available</p>
            </div>
        `;
        return;
    }

    // Показать расписание (пока без проверки прошла/нет)
    const date = new Date(session.date_start);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    document.querySelector('.session-content').innerHTML = `
        <div class="session-schedule">
            <p class="session-time">⏰ ${session.session_name} - ${dayName}, ${dateStr}</p>
            <p class="session-local-time">${timeStr} local time</p>
        </div>
    `;
}

async function renderCalendar(data){
    const container = document.getElementById('calendarData');
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

function loadDriversStandings(){

}

function renderDriversStandings(){

}

function loadTeamsStandings(){

}

function renderTeamsStandings(){

}

function toggleSidenav() {
    sidenav.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function showSection(sectionId) {
    if (sectionId === 'calendar') {
        loadCalendar();
    } else if (sectionId === 'driversStandings') {
        loadDriversStandings() ;
    } else if (sectionId === 'teamsStandings') {
        loadTeamsStandings();
    }
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
loadCalendar().then();
showSection("calendar");