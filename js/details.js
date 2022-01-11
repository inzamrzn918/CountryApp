const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");
const country_name = document.getElementById("country_name");
const country_flag = document.getElementById("flag");

if (code == null) {
  code = urlParams.get("code2");
}

updateCountry(code);

function updateCountry(code) {
  let url = "https://restcountries.com/v3.1/alpha/" + code;
  let xhttp = new XMLHttpRequest();
  console.log(url);

  xhttp.onreadystatechange = function () {
    try {
      let obj = JSON.parse(this.responseText);
      let count = obj[0];
      console.log(count == undefined);
      country_name.textContent = count.name.common;
      country_flag.src = count.flags.svg;
      document.getElementById("official").textContent =
        count.altSpellings[1] !== undefined
          ? count.altSpellings[1]
          : "Not Available";

      console.log(count);
      updateMap(count.latlang);
    } catch (error) {
      alert(error)
      console.log(error);
    }
  };
  xhttp.open("GET", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}
