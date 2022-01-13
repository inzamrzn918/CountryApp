const base_url = "https://restcountries.com/v2/";
const searchInp = document.getElementById("countryId");
const result = document.getElementById("result");
let html = "";
document.getElementById("loader").style.display = "none";

// ========== SEARCH FIELD ONKEY UP ==========
searchInp.addEventListener("keyup", (e) => {
  let text = searchInp.value;
  updateUI(base_url + "name/" + text);
  document.getElementById("loader").style.display = "block";
});


// =========== GET RESPONSE & UPDATE UI =========
updateUI = (url) => {
  let response = getResponse(url);
  response.then(data => {
    document.getElementById("loader").style.display = "none";
    html = "";
    for (var i = 0; i < data.length; i++) {
      let img = " <img src='" + data[i].flag + "' height='50px' width='70px' class='rounded float-left ml-2'>";
      html += `
              <a href="/details.html?code3=${data[i].alpha3Code}&code2${data[i].alpha2Code}"
              <li class="list-group-item">
                  <div class="me-auto">
                      <div class="row d-flex justify-content-between">
                          <div class="col-4">
                            ${img}
                          </div>
                          <div class="col-6">
                              <div class="text-start">Name : ${data[i].name}</div>
                              <div class="text-start">Local Name : ${data[i].altSpellings[1] !== undefined ? data[i].altSpellings[1] : "Not Available"}</div>
                          </div>   
                          <div class="col-2">
                            <span class="badge bg-primary rounded-pill">${data[i].alpha3Code}</span>
                          </div>                     
                      </div>                         
                  </div>
                  
              </li>
              
      `;
    }

    html += "</ul>";

    result.innerHTML = html;
  })
}