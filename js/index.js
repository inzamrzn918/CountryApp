window.onload = function () {
    const base_url_all = "https://restcountries.com/v3.1/all";

    // =========== GET RESPONSE & UPDATE UI =============
    let response = getResponse(base_url_all);
    response.then(data => {
        data.sort(compare);
        let html = `<div class="row justify-content-around">`;
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

        document.getElementById("main").innerHTML = html;
    })
}
