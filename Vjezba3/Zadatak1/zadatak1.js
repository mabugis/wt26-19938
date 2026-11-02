// Zadatak 1 - Procjena vremena cekanja klijenata na salteru (u minutama)
//
// Kontekst i namjena procjene:
// - Podatak koji se procjenjuje: vrijeme cekanja klijenta u redu na salteru (u minutama, nenegativan broj).
// - Kome procjena služi: voditelju smjene u salter-sali radi pracenja opterecenja i otvaranja dodatnih saltera.
// - Dva pozitivna praga (p1 < p2):
//     p1 = 15 (minuta)
//     p2 = 30 (minuta)
// - Tri kategorije i pripadnost granicnih vrijednosti:
//     1. "Prihvatljivo" -> za vrijednosti iz intervala [0, p1], tj. 0 <= vrijednost <= 15 (ukljucuje granicnu vrijednost p1 = 15)
//     2. "Za provjeru"  -> za vrijednosti iz intervala (p1, p2], tj. 15 < vrijednost <= 30 (ukljucuje granicnu vrijednost p2 = 30)
//     3. "Kriticno"     -> za vrijednosti iz intervala (p2, +inf), tj. vrijednost > 30

const p1 = 15;
const p2 = 30;

function procijeniCekanjeZaVoditeljaSmjene(vrijednost, prag1, prag2) {
  if (vrijednost > prag2) {
    return "Kritično";
  } else if (vrijednost > prag1) {
    return "Za provjeru";
  } else {
    return "Prihvatljivo";
  }
}

const unos = prompt("Unesite vrijeme čekanja na šalteru (u minutama):");

if (unos === null) {
  alert("Unos je otkazan.");
  console.log("Unos je otkazan.");
} else if (unos.trim() === "") {
  alert("Greška: Polje za unos ne smije biti prazno.");
  console.log("Greška: Polje za unos ne smije biti prazno.");
} else {
  const vrijednost = Number(unos.trim());

  if (Number.isNaN(vrijednost) || !Number.isFinite(vrijednost)) {
    alert("Greška: Unesena vrijednost nije ispravan broj.");
    console.log("Greška: Unesena vrijednost nije ispravan broj.");
  } else if (vrijednost < 0) {
    alert("Greška: Vrijeme čekanja ne može biti negativan broj.");
    console.log("Greška: Vrijeme čekanja ne može biti negativan broj.");
  } else {
    const kategorija = procijeniCekanjeZaVoditeljaSmjene(vrijednost, p1, p2);
    const poruka =
      `Vrijeme čekanja: ${vrijednost} min\n` +
      `Pragovi: p1 = ${p1} min (uključeno u "Prihvatljivo"), p2 = ${p2} min (uključeno u "Za provjeru")\n` +
      `Procjena za voditelja smjene: ${kategorija}`;

    alert(poruka);
    console.log(poruka);
  }
}
