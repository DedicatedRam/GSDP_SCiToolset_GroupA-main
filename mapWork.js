

//---Making a map and tiles---
const mymap = L.map("mapid").setView([53.304621, -1.804311], 5.5);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Map Click:  " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on("click", onMapClick);

L.control.mousePosition().addTo(mymap);

//---Making a marker with a custom icon---
const myIcon = L.icon({
    iconUrl: 'flightIconTransp.png',
    iconSize: [30, 25],
    iconAnchor: [25, 16],
});

L.marker([53.304621,-1.804311 ], {icon: myIcon}).addTo(mymap);

function genShape(firstLatTop, firstLongTop, firstLatBottom, firstLongBottom, lastLatTop, lastLongTop, lastLatBottom, lastLongBottom){
    var polygon = L.polygon([
      [firstLatTop, firstLongTop],
      [lastLatTop, lastLongTop],
      [lastLatBottom, lastLongBottom],
      [firstLatBottom, firstLongBottom]
  ]).addTo(mymap);
}

function RevealFunction(){
  var x = document.getElementById("datePick2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayStart(){
  const dateSelected = document.getElementById("datePick").value;
  console.log(dateSelected);
  if (document.getElementById("datePick2").style.display == "block"){
    const endDateValue = document.getElementById("datePick2").value;
    console.log(endDateValue);
    return (dateSelected, endDateValue);
  }
  return (dateSelected);
}