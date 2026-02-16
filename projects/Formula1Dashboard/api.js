async function getDriversStandings(){
    try{
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2026/driverStandings.json');

        if(!response.ok){
            throw new Error("Loading error, " + response.statusText);
        }

        const json = await response.json();
        return json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch(error){
        console.log("Error: " + error);
        return null;
    }
}