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
                    <th>Driver</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
    `;

    drivers.forEach(driver => {
        const position = driver.position;
        const name = driver.Driver.givenName + ' ' + driver.Driver.familyName;
        const points = driver.points;

        html += `
            <tr>
                <td class="position">${position}</td>
                <td class="driver-name">${name}</td>
                <td class="points">${points}</td>
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