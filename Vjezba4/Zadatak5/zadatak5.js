// Zadatak 5 - proracun zapremine sfere: V = 4/3 * PI * r^3

function zapreminaSfere(r) {
  return (4 / 3) * Math.PI * Math.pow(r, 3);
}

const forma = document.getElementById("forma");
const radiusPolje = document.getElementById("radius");
const rezultatPolje = document.getElementById("volume");
const greska = document.getElementById("greska");

forma.addEventListener("submit", function (dogadjaj) {
  dogadjaj.preventDefault();

  const unos = radiusPolje.value.trim();
  const r = Number(unos);

  // prazan string se provjerava posebno jer je Number("") jednako 0
  if (unos === "" || !Number.isFinite(r) || r < 0) {
    greska.textContent = "Radius must be a non-negative number.";
    rezultatPolje.value = "0.0000";
    return;
  }

  greska.textContent = "";
  rezultatPolje.value = zapreminaSfere(r).toFixed(4);
});
