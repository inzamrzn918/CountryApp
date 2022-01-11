const base_url = "https://restcountries.com/v2/";

const searchInp = document.getElementById("countryId");
const prbar = document.getElementById("prbar");
const result = document.getElementById("result");
let html = "";
searchInp.addEventListener("keyup", (e) => {
  var text = searchInp.value;
  getJson(base_url + "name/" + text);
});

window.onload = loadMain();

function getJson(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    html = "";
    html += `<ul class="list-group">`;
    if (this.status == 200) {
      const resp = this.responseText;
      try {
        var json = JSON.parse(resp);
        if (json.length == 0) {
          html += `
            <li class="list-group-item d-flex align-items-start">
                         <div class="me-auto">
                             <div class="row">
                                 <div class="row col-9>
                                     <div class="fw-bold text-start">No Item found</div>
                                 </div>
                                 
                             </div>
                             
                             
                         </div>
             </li>
           `;
        } else {
          for (var i = 0; i < json.length; i++) {
            let img = " <img src='" + json[i].flag + "' height='50px' width='70px' class='rounded float-left ml-2'>";
            html += `
                    <a href="/details.html?code3=${json[i].alpha3Code}&code2${json[i].alpha2Code}"
                    <li class="list-group-item">
                        <div class="me-auto">
                            <div class="row d-flex justify-content-between">
                                <div class="col-4">
                                  ${img}
                                </div>
                                <div class="col-6">
                                    <div class="text-start">Name : ${json[i].name}</div>
                                    <div class="text-start">Local Name : ${json[i].altSpellings[1] !== undefined ? json[i].altSpellings[1] : "Not Available"}</div>
                                </div>   
                                <div class="col-2">
                                  <span class="badge bg-primary rounded-pill">${json[i].alpha3Code}</span>
                                </div>                     
                            </div>                         
                        </div>
                        
                    </li>
                    
            `;
          }
        }
      } catch (error) {
        html += `
           <li class="list-group-item d-flex align-items-start">
                        <div class="me-auto">
                            <div class="row">
                                <div class="row col-9>
                                    <div class="fw-bold text-start">Something Went Wrong</div>
                                    <div class="text-start">${error}</div>
                                </div>
                                
                            </div>
                            
                            
                        </div>
            </li>
          `;
        console.log(error);
      }
    } else {
      html += `
        <li class="list-group-item d-flex align-items-start">
                     <div class="me-auto">
                         <div class="row">
                             <div class="row col-9>
                                 <div class="fw-bold text-start">Something Went Wrong</div>
                                 <div class="text-start">HTTP Status code : ${this.status}</div>
                             </div>
                             
                         </div>
                         
                         
                     </div>
         </li>
       `;
    }
    if (this.readyState == 0) {
      var val = this.readyState * 20;
      prbar.text = val.toString();
      prbar.setAttribute("aria-valuenow", val.toString());
      prbar.style.width = val.toString() + "%";
    }

    html += "</ul>";

    result.innerHTML = html;
  };

  xhttp.open("GET", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

function loadMain(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(this.responseText);
  }

  xhttp.open("GET", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}
