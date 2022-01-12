async function getResponse(url) {
    const response = await fetch(url, {});
    const json = await response.json();
    return json;
}

formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

getWether = (lat, lon) => {
    let url = "https://api.weatherapi.com/v1/current.json?key=662a6a5fc6f34e54a5b123803211911&q=" + lat + "," + lon + "&aqi=no";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        try {
            let obj = JSON.parse(this.responseText);
            document.getElementById("temp").textContent = Math.round(obj.current.temp_c) + "°C";
            document.getElementById("icon").src = obj.current.condition.icon;
            document.getElementById("condition").textContent = obj.current.condition.text;
            document.getElementById("humidity").textContent = obj.current.humidity + "%";
            document.getElementById("wkh").textContent = obj.current.wind_kph + " km/h";
            document.getElementById("cloud").textContent = obj.current.cloud + "%";
        } catch (error) {

        }

    }
    xhttp.open("GET", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

compare = (a, b) => {
    if (a.name.common < b.name.common)
        return -1;
    if (a.name.common > b.name.common)
        return 1;
    return 0;
}
