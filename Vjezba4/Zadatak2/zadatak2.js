// Zadatak 2 - forma za kratku obavijest i njen pregled

const kategorije = {
  informacija: { oznaka: "Informacija", klasa: "pregled-informacija" },
  hitno: { oznaka: "Hitno", klasa: "pregled-hitno" },
};

const forma = document.getElementById("forma");
const greska = document.getElementById("greska");
const pregled = document.getElementById("pregled");

forma.addEventListener("submit", function (dogadjaj) {
  // sprjecava slanje forme i osvjezavanje stranice
  dogadjaj.preventDefault();

  const naslov = document.getElementById("naslov").value.trim();
  const tekst = document.getElementById("tekst").value.trim();

  const greske = [];
  if (naslov === "") {
    greske.push("Naslov ne smije biti prazan.");
  }
  if (tekst === "") {
    greske.push("Tekst obavijesti ne smije biti prazan.");
  }

  // pregled se mijenja tek kada su svi podaci ispravni
  if (greske.length > 0) {
    greska.textContent = greske.join(" ");
    return;
  }

  const odabrana = document.querySelector('#forma input[name="kategorija"]:checked').value;
  const kategorija = kategorije[odabrana];

  // textContent (a ne innerHTML) osigurava da se unos prikaze iskljucivo kao tekst
  document.getElementById("pregledNaslov").textContent = naslov;
  document.getElementById("pregledTekst").textContent = tekst;
  document.getElementById("pregledKategorija").textContent = kategorija.oznaka;
  pregled.className = kategorija.klasa;

  greska.textContent = "";
});

// polja vraca sam preglednik (dugme type="reset"), ovdje se brise jos poruka o gresci
forma.addEventListener("reset", function () {
  greska.textContent = "";
});
