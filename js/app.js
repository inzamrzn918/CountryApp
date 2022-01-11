const base_url = "https://restcountries.com/v2/name/";

const searchInp = document.getElementById("countryId");
const prbar = document.getElementById("prbar");
const result = document.getElementById("result");
let html = "";
searchInp.addEventListener("keyup", (e) => {
  var text = searchInp.value;
  getJson(base_url + text);
});

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
            var imgUrl = json[i].flag.replace(/\s+/g, "/");
            console.log(imgUrl);

            html += `
                    <a href="/details.html?code3=${json[i].alpha3Code}&code2${json[i].alpha2Code}"
                    <li class="list-group-item d-flex align-items-start">
                        <div class="me-auto">
                            <div class="row">
                                <div class="col-3>
                                 <img src="${imgUrl}" height="100px" width="150px">
                                </div>
                                <div class="row col-9>
                                    <div class="fw-bold text-start pl-4">&nbsp;Name : ${json[i].name}</div>
                                    <div class="text-start">Local Name : ${json[i].altSpellings[1] !== undefined ? json[i].altSpellings[1] : "Not Available"}</div>
                                </div>
                                
                            </div>
                            
                            
                        </div>
                        <span class="badge bg-primary rounded-pill">${json[i].alpha3Code}</span>
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
