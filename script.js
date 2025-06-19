document.addEventListener('DOMContentLoaded', function() {
    const sensorGrid = document.getElementById('sensor-grid');

    async function fetchData() {
        const configResponse = await fetch('../config.json');
        const config = await configResponse.json();
        const { host, token, sensors } = config;

        for (let sensor of sensors) {
            const response = await fetch(`https://${host}/api/states/${sensor.entity_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            updateUI(sensor.name, sensor.entity_id, data.state, sensor.unit);
        }
    }

    function updateUI(name, id, state, unit) {
    // Überprüfe, ob der Zustand eine Zahl ist und runde sie gegebenenfalls
    let roundedState = isNaN(parseFloat(state)) ? state : Math.round(parseFloat(state));
    let stateDisplay = roundedState;
    
    if (roundedState === 'on') {
        stateDisplay = 'Nein';
    } else if (roundedState === 'off') {
        stateDisplay = 'Ja';
	} else if (roundedState === 'request') {
        stateDisplay = 'Ja';
	} else if (roundedState === 'no request') {
        stateDisplay = 'Nein';
    } else {
        stateDisplay = `${roundedState}${unit ? ' ' + unit : ''}`;
    }

    let colorClass = state === 'on' ? 'sensor-on' : state === 'off' ? 'sensor-off' : state === 'no request' ? 'sensor-on' : 'default-color';

    let tile = document.getElementById(id);
    if (!tile) {
        tile = document.createElement('div');
        tile.id = id;
        tile.className = `sensor-tile ${colorClass}`;
        tile.innerHTML = `<div class="sensor-title">${name}</div><div class="sensor-value">${stateDisplay}</div>`;
        sensorGrid.appendChild(tile);
    } else {
        tile.className = `sensor-tile ${colorClass}`;
        tile.innerHTML = `<div class="sensor-title">${name}</div><div class="sensor-value">${stateDisplay}</div>`;
    }
}

    fetchData();
    setInterval(fetchData, 10000); // Aktualisiert die Daten alle 10 Sekunden
});