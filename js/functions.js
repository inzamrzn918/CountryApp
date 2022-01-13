// ======== READ JSON FROM URL ===========
async function getResponse(url) {
    const response = await fetch(url, {});
    return await response.json();
}

// =============== CONVERT CURRENT DATETIME TO CURRENT TIME 24H FORMATE ================
formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

// ============== GET WEATHER DATA ==================
getWether = (lat, lon) => {
    let url = "https://api.weatherapi.com/v1/current.json?key=662a6a5fc6f34e54a5b123803211911&q=" + lat + "," + lon + "&aqi=no";
    let response = getResponse(url);
    response.then(data => {
        document.getElementById("temp").textContent = Math.round(data.current.temp_c) + "°C";
        document.getElementById("icon").src = data.current.condition.icon;
        document.getElementById("condition").textContent = data.current.condition.text;
        document.getElementById("humidity").textContent = data.current.humidity + "%";
        document.getElementById("wkh").textContent = data.current.wind_kph + " km/h";
        document.getElementById("cloud").textContent = data.current.cloud + "%";

    })
}

// =========== COMPARE FUNCTION TO SORT ARRAY OF OBJECTS BY NAME (ASC) =================
compare = (a, b) => {
    if (a.name.common < b.name.common)
        return -1;
    if (a.name.common > b.name.common)
        return 1;
    return 0;
}
