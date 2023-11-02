const beast1 = document.getElementById("beast1");
const beast2 = document.getElementById("beast2");
const beast3 = document.getElementById("beast3");
const beast4 = document.getElementById("beast4");

beast1.addEventListener("click", () => {
  window.location.href = "level1.html?beast=beast1";
});

beast2.addEventListener("click", () => {
  window.location.href = "level1.html?beast=beast2";
});
beast3.addEventListener("click", () => {
  window.location.href = "level1.html?beast=beast3";
});
beast4.addEventListener("click", () => {
  window.location.href = "level1.html?beast=beast4";
});


const distinctCountries = Array.from(new Set(nuclearPowerPlantsWorldwide.map((d) => d.Country)));
const countryText = Array.from(new Set(nuclearPowerPlantsWorldwide.map((d) => d.Country))).length === 1 ? "country" : "countries";

