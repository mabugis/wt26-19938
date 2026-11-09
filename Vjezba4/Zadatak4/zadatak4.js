// Zadatak 4 - interaktivno stablo predmeta

function prebaciCvor(naslov) {
  const podstablo = naslov.nextElementSibling;
  const znak = naslov.querySelector(".znak");

  // podstablo je na pocetku sakriveno kroz CSS, pa je style.display tada prazan
  if (podstablo.style.display === "block") {
    podstablo.style.display = "none";
    znak.textContent = "+";
  } else {
    podstablo.style.display = "block";
    znak.textContent = "-";
  }
}

// klik na znak je klik unutar naslova, pa je dovoljan jedan osluskivac po cvoru
const naslovi = document.getElementsByClassName("naslov");

for (const naslov of naslovi) {
  naslov.addEventListener("click", function () {
    prebaciCvor(naslov);
  });
}
