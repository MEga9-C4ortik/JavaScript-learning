document.addEventListener('DOMContentLoaded', async () => {
    await loadStandings('drivers');
});

async function loadStandings(type) {
    const container = document.getElementById('standings-container');

    if (type === "drivers") {
        const data = await getDriversStandings();
        displayDriversStandings(data);
    }

    if(type === "teams"){
        const data = await getTeamsStandings();
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