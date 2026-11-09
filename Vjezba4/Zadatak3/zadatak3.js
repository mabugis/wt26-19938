// Zadatak 3 - tabela evidencije troskova
//
// Odabrana mogucnost: zbir se svaki put ponovo racuna iz redova tabele.
// Obrazlozenje:
// - tabela je jedini izvor podataka, pa zbir ne moze postati razlicit od prikazanih redova
//   (kod cuvanja u varijabli bi se svaka buduca izmjena ili brisanje reda moralo pratiti posebno);
// - sabiraju se iznosi onako kako su prikazani (na dvije decimale), pa zbir odgovara koloni;
// - prolazak kroz nekoliko redova je zanemariv trosak za ovako malu tabelu.

const forma = document.getElementById("forma");
const nazivPolje = document.getElementById("naziv");
const iznosPolje = document.getElementById("iznos");
const greska = document.getElementById("greska");
const tijeloTabele = document.getElementById("stavke");

function osvjeziZbirIBroj() {
  let zbir = 0;
  for (const red of tijeloTabele.rows) {
    zbir += Number(red.cells[1].textContent);
  }

  document.getElementById("zbir").textContent = zbir.toFixed(2);
  document.getElementById("brojStavki").textContent = tijeloTabele.rows.length;
}

// vraca poruku o gresci ili prazan string ako je unos ispravan
function provjeriUnos(naziv, iznosTekst) {
  if (naziv === "") {
    return "Naziv ne smije biti prazan.";
  }

  // prazan string se provjerava posebno jer je Number("") jednako 0
  const iznos = Number(iznosTekst);
  if (iznosTekst === "" || !Number.isFinite(iznos)) {
    return "Iznos mora biti broj (decimalni separator je tačka).";
  }

  if (iznos < 0) {
    return "Iznos ne smije biti negativan.";
  }

  return "";
}

forma.addEventListener("submit", function (dogadjaj) {
  dogadjaj.preventDefault();

  const naziv = nazivPolje.value.trim();
  const iznosTekst = iznosPolje.value.trim();

  const porukaGreske = provjeriUnos(naziv, iznosTekst);
  greska.textContent = porukaGreske;
  if (porukaGreske !== "") {
    return;
  }

  // red zbira je u tfoot, pa je novi red na kraju tbody neposredno prije njega
  const red = tijeloTabele.insertRow();
  red.insertCell().textContent = naziv;

  const celijaIznos = red.insertCell();
  celijaIznos.textContent = Number(iznosTekst).toFixed(2);
  celijaIznos.className = "iznos";

  osvjeziZbirIBroj();

  forma.reset();
  nazivPolje.focus();
});

osvjeziZbirIBroj();
