
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("param");
let type = urlParams.get("type");
document.getElementById("params").textContent = ` ${type} "${code}"`;

let base_url = "https://restcountries.com/v3.1/";

base_url += (type + "/" + code);

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    try {
        let html = `<div class="row justify-content-around">`;
        let resp = JSON.parse(this.responseText);
        for (let i = 0; i < resp.length; i++) {
            let imh = "<img src='" + resp[i].flags.svg + "' class='img img_poor'/>";
            html += `
            <div class="col-md-3 card mb-4">
                <a href="/details.html?code=${resp[i].cca3}">
                    <div class="card">
                        ${imh}
                        </div>
                    <div class="card-body">
                        <h5 class="card-title">${resp[i].name.common}</h5>
                        <p class="card-text">${resp[i].altSpellings[1] !== undefined ? resp[i].altSpellings[1] : "Not Available"}</p>
                    </div>
                </a>
            </div>
            `;

        }

        html += `</div>`

        document.getElementById("result").innerHTML = html;
        console.log(document.getElementById("result"));

    } catch (error) {

    }

}
xhttp.open("GET", base_url);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
