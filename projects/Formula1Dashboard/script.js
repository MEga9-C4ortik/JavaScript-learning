document.addEventListener('DOMContentLoaded', async () => {
    const drivers = await getDriversStandings();

    displayDriversStandings(drivers);
});