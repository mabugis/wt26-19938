// Zadatak 1 - kontrolna lista za pripremu planinarenja

const lista = document.getElementById("lista");
const stavke = lista.getElementsByTagName("li");
const sazetak = document.getElementById("sazetak");
const dugmeReset = document.getElementById("reset");

// mijenja izgled (klasa) i tekst jedne stavke
function postaviStanje(stavka, zavrseno) {
  stavka.classList.toggle("zavrseno", zavrseno);
  stavka.querySelector(".stanje").textContent = zavrseno ? "Završeno" : "Nije završeno";
  stavka.querySelector("button").textContent = zavrseno ? "Vrati u nezavršeno" : "Označi kao završeno";
}

// sazetak se uvijek racuna iz stvarnog stanja stavki u DOM-u
function osvjeziSazetak() {
  const brojZavrsenih = lista.querySelectorAll("li.zavrseno").length;
  sazetak.textContent = `Završeno: ${brojZavrsenih} od ${stavke.length}`;
}

// jedan osluskivac na listi pokriva klik i na stavku i na njeno dugme
lista.addEventListener("click", function (dogadjaj) {
  const stavka = dogadjaj.target.closest("li");
  if (stavka === null) {
    return;
  }

  postaviStanje(stavka, !stavka.classList.contains("zavrseno"));
  osvjeziSazetak();
});

dugmeReset.addEventListener("click", function () {
  for (const stavka of stavke) {
    postaviStanje(stavka, false);
  }
  osvjeziSazetak();
});

osvjeziSazetak();
