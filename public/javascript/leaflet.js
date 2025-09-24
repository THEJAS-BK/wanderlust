let lat, long;
fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${loc}`)
  .then((res) => res.json())
  .then((data) => {
    lat = data[0].lat;
    long = data[0].lon;
    mapLoc(lat, long);
  })
  .catch((err) => {
    console.log("this is a error\n", err);
  });

let map = L.map("map").setView([51.505, -0.09], 13);

function mapLoc(lat, lon) {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("Very near to this location")
    .openPopup();
}
