function displayDriversStandings(drivers){
    const container = document.getElementById('standings-container');

    if(!drivers) {
        container.innerHTML = "<p class=error> Couldn't load data </p>";
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Driver (Team)</th>
                    <th>Points (Wins)</th>
                </tr>
            </thead>
            <tbody>
    `;

    drivers.forEach(driver => {
        const position = driver.position;
        const name = driver.Driver.givenName + ' ' + driver.Driver.familyName;
        const points = driver.points;
        const team = driver.Constructors[0].name;
        const wins = driver.wins;

        html += `
            <tr>
                <td class="position">${position}</td>
                <td class="driver-name">${name} (${team}) </td>
                <td class="points">${points} (${wins})</td>
            </tr>
        `;
    });

    // close table
    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function displayTeamsStandings(teams){
    const container = document.getElementById('standings-container');

    if(!teams) {
        container.innerHTML = "<p class=error> Couldn't load data </p>";
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Constructor</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
    `;

    teams.forEach(team => {
        const position = team.position;
        const name = team.Constructor.name;
        const points = team.points;

        html += `
            <tr>
                <td class="position">${position}</td>
                <td class="team-name">${name}</td>
                <td class="points">${points}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function displayRaceCalendar(races) {
    const container = document.getElementById('calendar-content');
    if(!races || races.length === 0) {
        container.innerHTML = '<div class="error"><p>Couldn\'t load race calendar</p></div>';
        return;
    }

    const now = new Date();
    let html = '<div class="races-grid">';

    races.forEach(race => {
        const raceDate = new Date(race.date + 'T' + (race.time || '12:00:00'));
        const isPast = raceDate < now;
        const hasSprint = !!race.Sprint;

        html += `
            <div class="race-card ${isPast ? 'past' : 'upcoming'}">
                <div class="race-header">
                    <span class="round">Round ${race.round}</span>
                    <span class="status-badge ${isPast ? 'completed' : 'scheduled'}">
                        ${isPast ? 'Completed' : 'Scheduled'}
                    </span>
                </div>
                <h3 class="race-name">${race.raceName}</h3>
                <p class="circuit-name">${race.Circuit.circuitName}</p>
                <p class="location"> ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
                <p class="date"> ${formatDate(raceDate)}</p>
                ${hasSprint ? '<span class="sprint-badge"> Sprint Weekend</span>' : ''}
                ${isPast
            ? `<button class="view-results-btn"
                        onclick="openRaceModal(${race.round}, '${race.raceName.replace(/'/g, "\\'")}')">
                            View Results
                       </button>`
            : ''
        }
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

async function openRaceModal(round, raceName) {
    const modal = document.getElementById('race-modal');
    const modalContent = document.querySelector('.modal-content');

    modalContent.dataset.round = round;
    document.getElementById('modal-race-name').textContent = raceName;
    modal.style.display = 'flex';

    document.querySelectorAll('.session-tab').forEach(t => {
        t.classList.remove('active');
        t.style.display = 'block';
    });

    const sprintData = await getSprintResults(season, round);
    const sprintTab = document.querySelector('[data-session="sprint"]');
    sprintTab.style.display = sprintData ? 'block' : 'none';

    document.querySelector('[data-session="race"]').classList.add('active');
    await loadSessionResults(round, 'race');
}

function closeModal() {
    document.getElementById('race-modal').style.display = 'none';
}

function displayRaceResults(results) {
    const container = document.getElementById('session-results');
    if(!results) {
        container.innerHTML = '<p class="info">No race results available</p>';
        return;
    }

    let html = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Time / Status</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach(r => {
        const pos = r.position;
        const posClass = pos <= 3 ? `position-${pos}` : '';

        html += `
            <tr>
                <td class="position ${posClass}">${pos}</td>
                <td class="driver-name">${r.Driver.givenName} ${r.Driver.familyName}</td>
                <td class="team-name">${r.Constructor.name}</td>
                <td>${r.Time?.time ?? r.status}</td>
                <td class="points">${r.points}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function displayQualifyingResults(results) {
    const container = document.getElementById('session-results');
    if(!results) {
        container.innerHTML = '<p class="info">No qualifying results available</p>';
        return;
    }

    let html = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach(r => {
        const pos = r.position;
        const posClass = pos <= 3 ? `position-${pos}` : '';

        html += `
            <tr>
                <td class="position ${posClass}">${pos}</td>
                <td class="driver-name">${r.Driver.givenName} ${r.Driver.familyName}</td>
                <td class="team-name">${r.Constructor.name}</td>
                <td>${r.Q1 || '—'}</td>
                <td>${r.Q2 || '—'}</td>
                <td>${r.Q3 || '—'}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function displaySprintResults(results) {
    const container = document.getElementById('session-results');
    if(!results) {
        container.innerHTML = '<p class="info">No sprint results available</p>';
        return;
    }

    let html = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Time / Status</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach(r => {
        const pos = r.position;
        const posClass = pos <= 3 ? `position-${pos}` : '';

        html += `
            <tr>
                <td class="position ${posClass}">${pos}</td>
                <td class="driver-name">${r.Driver.givenName} ${r.Driver.familyName}</td>
                <td class="team-name">${r.Constructor.name}</td>
                <td>${r.Time?.time ?? r.status}</td>
                <td class="points">${r.points}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}