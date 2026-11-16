// Zadatak 3 - modul za upravljanje ogranicenom kolicinom resursa
//
// Primjer resursa: paket raspolozivih minuta za razgovore.
//
// Povratna vrijednost metode potrosi(kolicina):
// - true  -> potrosnja je izvrsena i stanje je umanjeno za zadanu kolicinu
// - false -> potrosnja je odbijena (kolicina nije broj, negativna je ili je veca od
//            raspolozive) i stanje je ostalo nepromijenjeno

// provjera da li je vrijednost konacan broj koji nije negativan
function ispravnaKolicina(vrijednost) {
  return typeof vrijednost === "number" && Number.isFinite(vrijednost) && vrijednost >= 0;
}

function napraviResurs(pocetnaKolicina) {
  // kolicina resursa ne smije biti negativna ni na pocetku
  if (!ispravnaKolicina(pocetnaKolicina)) {
    throw new Error("Početna količina resursa mora biti nenegativan broj.");
  }

  // privatna varijabla - dostupna samo funkcijama potrosi i preostalo (closure)
  let raspolozivo = pocetnaKolicina;

  function potrosi(kolicina) {
    // provjera tipa sprjecava da npr. potrosi("abc") stanje pretvori u NaN
    if (!ispravnaKolicina(kolicina) || kolicina > raspolozivo) {
      return false;
    }
    raspolozivo -= kolicina;
    return true;
  }

  function preostalo() {
    return raspolozivo;
  }

  // vraceni objekat je javni dio modula
  return {
    potrosi: potrosi,
    preostalo: preostalo
  };
}

// dvije nezavisne instance modula sa razlicitim pocetnim kolicinama
const paketAmra = napraviResurs(100);
const paketKenan = napraviResurs(30);

console.log("--- Početno stanje ---");
console.log("Amra:", paketAmra.preostalo()); // 100
console.log("Kenan:", paketKenan.preostalo()); // 30

console.log("--- Uspješna potrošnja ---");
console.log("Amra troši 40:", paketAmra.potrosi(40)); // true
console.log("Amra:", paketAmra.preostalo()); // 60
console.log("Kenan:", paketKenan.preostalo()); // 30 - promjena kod Amre ne utjece na Kenana

console.log("Kenan troši 25:", paketKenan.potrosi(25)); // true
console.log("Kenan:", paketKenan.preostalo()); // 5
console.log("Amra:", paketAmra.preostalo()); // 60 - promjena kod Kenana ne utjece na Amru

console.log("--- Odbijena potrošnja (stanje ostaje isto) ---");
console.log("Kenan troši 10 (više od raspoloživog):", paketKenan.potrosi(10)); // false
console.log("Kenan:", paketKenan.preostalo()); // 5

console.log("Amra troši -20 (negativna količina):", paketAmra.potrosi(-20)); // false
console.log("Amra:", paketAmra.preostalo()); // 60

console.log("Amra troši \"abc\" (nije broj):", paketAmra.potrosi("abc")); // false
console.log("Amra:", paketAmra.preostalo()); // 60

console.log("--- Potrošnja cijele preostale količine ---");
console.log("Kenan troši 5:", paketKenan.potrosi(5)); // true
console.log("Kenan:", paketKenan.preostalo()); // 0
console.log("Kenan troši 1:", paketKenan.potrosi(1)); // false
console.log("Kenan:", paketKenan.preostalo()); // 0

// preostalo() samo cita stanje, pa visestruki pozivi ne mijenjaju kolicinu
console.log("--- preostalo() ne mijenja stanje ---");
console.log("Amra:", paketAmra.preostalo(), paketAmra.preostalo(), paketAmra.preostalo()); // 60 60 60

console.log("--- Pokušaj izmjene stanja mimo javnih metoda ---");
console.log("paketAmra.raspolozivo:", paketAmra.raspolozivo); // undefined - privatna varijabla nije dostupna
paketAmra.raspolozivo = 1000; // dodaje se novo svojstvo objektu, privatna varijabla se ne mijenja
console.log("Amra nakon paketAmra.raspolozivo = 1000:", paketAmra.preostalo()); // 60

console.log("--- Neispravna početna količina ---");
try {
  napraviResurs(-10);
} catch (greska) {
  console.log("Greška:", greska.message);
}
