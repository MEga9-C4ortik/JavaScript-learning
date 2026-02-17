let season =2024;

document.addEventListener('DOMContentLoaded', async () => {
    seasonSelector();

    const seasonSelect = document.getElementById('season-select');
    seasonSelect.addEventListener('change', (e) => {
        onSeasonChange(e.target.value);
    });

    await loadStandings('drivers');
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
    }
});

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
    season = parseInt(newSeason); // Обновляем глобальную переменную

    // Определяем какой таб сейчас активен
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