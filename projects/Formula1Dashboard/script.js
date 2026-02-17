let season = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', async () => {
    seasonSelector();

    const seasonSelect = document.getElementById('season-select');
    seasonSelect.addEventListener('change', (e) => {
        onSeasonChange(e.target.value);
    });

    await loadStandings('drivers');
});

//switch standings:Drivers/Teams
document.addEventListener("click", (event) => {
    const btn = event.target.closest(".standings-tab");
    if(!btn) return;

    document.querySelectorAll('.standings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    btn.classList.add('active');

    const type = btn.dataset.type;
    if(type) {
        loadStandings(type);
    }
});

// switch Standings/Calendar
document.addEventListener("click", (event) => {
    const tab = event.target.closest(".nav-tab");
    if(!tab) return;

    document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.remove('active');
    });
    tab.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const tabName = tab.dataset.tab;
    const content = document.getElementById(tabName);
    if(content) {
        content.classList.add('active');

        if(tabName === "calendar") {
            loadCalendar();
        }
    }
});

document.addEventListener("click", (event) => {
    const sessionTab = event.target.closest(".session-tab");
    if(!sessionTab) return;

    document.querySelectorAll('.session-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    sessionTab.classList.add('active');

    const session = sessionTab.dataset.session;
    const round = sessionTab.closest('.modal-content').dataset.round;

    if(round && session) {
        loadSessionResults(round, session);
    }
});

async function loadStandings(type) {
    if (type === "drivers") {
        const data = await getDriversStandings(season);
        displayDriversStandings(data);
    }

    if(type === "teams"){
        const data = await getTeamsStandings(season);
        displayTeamsStandings(data);
    }
}

function seasonSelector() {
    const select = document.getElementById('season-select');
    const currentYear = new Date().getFullYear();
    const startYear = 1950;

    for(let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;

        if(year === season) {
            option.selected = true;
        }

        select.appendChild(option);
    }
}

function onSeasonChange(newSeason) {
    season = parseInt(newSeason);

    const activeNavTab = document.querySelector('.nav-tab.active');
    if(!activeNavTab) return;

    const tabName = activeNavTab.dataset.tab;

    if(tabName === 'standings') {
        const activeStandingsTab = document.querySelector('.standings-tab.active');
        const type = activeStandingsTab ? activeStandingsTab.dataset.type : 'drivers';
        loadStandings(type);
    } else if(tabName === 'calendar') {
        loadCalendar();
    }
}

async function loadCalendar() {
    const container = document.getElementById('calendar-content');

    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading race calendar...</p>
        </div>
    `;

    const races = await getRaceCalendar(season);
    displayRaceCalendar(races);
}

async function loadSessionResults(round, session) {
    if(session === 'race') {
        const data = await getRaceResults(season, round);
        displayRaceResults(data);
    } else if(session === 'qualifying') {
        const data = await getQualifyingResults(season, round);
        displayQualifyingResults(data);
    } else if(session === 'sprint') {
        const data = await getSprintResults(season, round);
        displaySprintResults(data);
    }
}