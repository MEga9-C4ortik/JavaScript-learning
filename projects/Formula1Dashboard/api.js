async function getDriversStandings(season) {
    try{
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/driverStandings.json`);

        if(!response.ok){
            throw new Error("Loading error, " + response.statusText);
        }

        const json = await response.json();
        return json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch(error) {
        console.log("Error: " + error);
        return null;
    }
}

async function getTeamsStandings(season) {
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/constructorStandings.json`);

        if(!response.ok){
            throw new Error("Loading error, " + response.statusText);
        }

        const json = await response.json();
        return json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    } catch (error) {
        console.log("Error: " + error);
        return null;
    }
}

async function getRaceCalendar(season) {
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${season}.json`);

        if(!response.ok) {
            throw new Error("Loading error, " + response.statusText);
        }

        const json = await response.json();
        return json.MRData.RaceTable.Races;
    } catch(error) {
        console.log("Error: " + error);
        return null;
    }
}

async function getRaceResults(season, round) {
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/${round}/results.json`);

        if(!response.ok) {
            throw new Error("Loading error, " + response.statusText);
        }

        const json = await response.json();
        return json.MRData.RaceTable.Races[0];
    } catch(error) {
        console.log("Error: " + error);
        return null;
    }
}

async function getQualifyingResults(season, round) {
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/${round}/qualifying.json`);

        if(!response.ok) {
            throw new Error("Loading error, " + response.statusText);
        }

        const json = await response.json();
        return json.MRData.RaceTable.Races[0];
    } catch(error) {
        console.log("Error: " + error);
        return null;
    }
}

async function getSprintResults(season, round) {
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/${round}/sprint.json`);

        if(!response.ok) {
            return null; // Sprint may not be
        }

        const json = await response.json();
        return json.MRData.RaceTable.Races[0];
    } catch(error) {
        return null;
    }
}