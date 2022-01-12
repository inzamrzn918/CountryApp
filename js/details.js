const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");
const country_name = document.getElementById("country_name");
const country_flag = document.getElementById("flag");
document.getElementById("time").textContent = formatAMPM(new Date);

if (code == null) {
  code = urlParams.get("code2");
}

if (code == null) {
  code = urlParams.get("code3");
}

// updateCountry(code);
let url = "https://restcountries.com/v3.1/alpha/" + code;
let response = getResponse(url);
response.then(data => {
  let count = data[0];
  if (count == undefined) {
    console.log("No Result Found");
  } else {
    country_name.textContent = count.name.common;
    document.getElementById('country_name_w').textContent = count.name.common
    country_flag.src = count.flags.svg;
    document.getElementById("official").textContent =
      count.altSpellings[1] !== undefined
        ? count.altSpellings[1]
        : "Not Available";
    let keys = Object.keys(count.currencies);

    for (let i = 0; i < keys.length; i++) {
      document.getElementById("sym").innerHTML = count.currencies[keys[i]].symbol;
      //document.getElementById("crid").setAttribute("href", "/params.html?param=" + count.currencies[keys[i]].name + "&type=currency");
      document.getElementById("currency").textContent = " " + count.currencies[keys[i]].name;
    }
    document.getElementById("idd").innerHTML = count.idd["root"] + count.idd["suffixes"][0];
    document.getElementById("capital").innerHTML = `<a href="/params.html?param=${count.capital[0]}&type=capital">${count.capital[0]}</a>`;
    let urlmap = "https://maps.google.com/maps?q=" + count.latlng[0] + "," + count.latlng[1] + "&t=&z=4&ie=UTF8&iwloc=&output=embed";
    document.getElementById("map").src = urlmap;
    let langkeys = Object.keys(count.languages);
    let lang = "";
    for (let i = 0; i < langkeys.length; i++) {
      lang += `<a href="/params.html?param=${count.languages[langkeys[i]]}&type=lang">${count.languages[langkeys[i]]}</a> `;
    }
    document.getElementById("lang").innerHTML = lang;
    document.getElementById("population").innerHTML = count.population;
    document.getElementById("coatOfArms").src = count.coatOfArms.svg;
    document.getElementById("region").innerHTML = `<a href="/params.html?param=${count.region}&type=region">${count.region}</a>`;
    document.getElementById("subregion").innerHTML = `<a href="/params.html?param=${count.subregion}&type=region">${count.subregion}</a>`;
    let ht = "";
    for (let i = 0; i < count.borders.length; i++) {
      let u = "https://restcountries.com/v3.1/alpha/" + code;
      ht += `<a href="?code=${count.borders[i]}">${count.borders[i]}</a><br>`;
    }
    document.getElementById("borders").innerHTML = ht;
    document.getElementById("area").textContent = count.area;
    document.getElementById("dside").textContent = count.car.side;
    // Wether

    getWether(count.latlng[0], count.latlng[1]);

  }
})





