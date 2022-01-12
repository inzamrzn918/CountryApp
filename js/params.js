
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("param");
let type = urlParams.get("type");
document.getElementById("params").textContent = ` ${type} "${code}"`;
let base_url = "https://restcountries.com/v3.1/";
base_url += (type + "/" + code);
let response = getResponse(base_url);
// =========== GET RESPONSE & UPDATE UI =============
response.then(data => {
    let html = `<div class="row justify-content-around mt-4">`;
    data.sort(compare);
    for (let i = 0; i < data.length; i++) {
        let imh = "<img src='" + data[i].flags.svg + "' class='img img_poor'/>";
        html += `
            <div class="col-md-3 card mb-4">
                <a href="/details.html?code=${data[i].cca3}">
                    <div class="card">
                        ${imh}
                        </div>
                    <div class="card-body">
                        <h5 class="card-title">${data[i].name.common}</h5>
                        <p class="card-text">${data[i].altSpellings[1] !== undefined ? data[i].altSpellings[1] : "Not Available"}</p>
                    </div>
                </a>
            </div>
            `;

    }

    html += `</div>`

    document.getElementById("result").innerHTML = html;
})

// hh