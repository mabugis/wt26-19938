// Zadatak 2 - modul profila: privatnost varijable vs. izlaganje reference na objekat

// ---------------------------------------------------------------------------
// Dio 1 - pocetni kod modula (bez izmjena)
// ---------------------------------------------------------------------------
// Funkcije imaju razlicita imena (napraviProfilPocetni i napraviProfil) jer bi dvije
// deklaracije funkcije sa istim imenom u istoj skripti dovele do toga da druga
// prepise prvu (deklaracije funkcija se "podizu" na pocetak skripte).

function napraviProfilPocetni() {
  let profil = { naziv: "Početni" };
  return {
    pregled: function () { return profil; },
    postaviNaziv: function (n) { profil.naziv = n; }
  };
}

console.log("--- Dio 1: početni modul ---");

const pocetni = napraviProfilPocetni();
const dobijeniPregled = pocetni.pregled();
console.log("Pregled prije izmjene:", pocetni.pregled().naziv); // Početni

dobijeniPregled.naziv = "Izmijenjeno izvana";

// Predvidjanje: naredni poziv pregled() vraca "Izmijenjeno izvana".
// Razlog: pregled() vraca referencu na isti objekat na koji pokazuje privatna
// varijabla profil. Varijabla dobijeniPregled i varijabla profil zato pokazuju na
// ISTI objekat, pa izmjena svojstva preko dobijeniPregled mijenja i stanje modula,
// i to bez poziva metode postaviNaziv.
console.log("Pregled nakon izmjene:", pocetni.pregled().naziv); // Izmijenjeno izvana
console.log("Isti objekat?", dobijeniPregled === pocetni.pregled()); // true

// Pozivalac moze cak i dodavati ili brisati svojstva profila mimo modula:
dobijeniPregled.uloga = "administrator";
console.log("Dodano svojstvo izvana:", pocetni.pregled().uloga); // administrator

// ---------------------------------------------------------------------------
// Dio 2 i 3 - prepravljeni modul
// ---------------------------------------------------------------------------
// Dio 2: pregled() vise ne vraca referencu na privatni objekat, nego svaki put pravi
//        NOVI objekat u koji se kopiraju primitivne vrijednosti (string, broj).
//        Primitivne vrijednosti se kopiraju po vrijednosti, pa izmjena vracenog
//        objekta ne mijenja profil unutar modula.
// Dio 3: dodano je primitivno svojstvo brojIzmjena (broj) koje se uvecava pri svakoj
//        izmjeni naziva i takodjer je ukljuceno u pregled.

function napraviProfil() {
  let profil = { naziv: "Početni", brojIzmjena: 0 };

  return {
    pregled: function () {
      return {
        naziv: profil.naziv,
        brojIzmjena: profil.brojIzmjena
      };
    },
    postaviNaziv: function (n) {
      profil.naziv = n;
      profil.brojIzmjena += 1;
    }
  };
}

console.log("--- Dio 2: pregled vraća kopiju ---");

const profil = napraviProfil();
const kopija = profil.pregled();
kopija.naziv = "Izmijenjeno izvana";
kopija.uloga = "administrator";

console.log("Izmijenjena kopija:", kopija.naziv); // Izmijenjeno izvana
console.log("Pregled nakon izmjene kopije:", profil.pregled().naziv); // Početni
console.log("Dodano svojstvo nije u profilu:", profil.pregled().uloga); // undefined
console.log("Isti objekat?", profil.pregled() === profil.pregled()); // false

console.log("--- Dio 3: dodatno svojstvo brojIzmjena ---");

console.log(profil.pregled()); // { naziv: "Početni", brojIzmjena: 0 }

// jedini nacin izmjene stanja je predvidjena metoda
profil.postaviNaziv("Novi naziv");
profil.postaviNaziv("Konačni naziv");
console.log(profil.pregled()); // { naziv: "Konačni naziv", brojIzmjena: 2 }

// pokusaj izmjene brojaca izvana ne mijenja stanje modula
const zaIzmjenu = profil.pregled();
zaIzmjenu.brojIzmjena = 100;
console.log("brojIzmjena nakon pokušaja izmjene izvana:", profil.pregled().brojIzmjena); // 2

// privatnoj varijabli se ne moze pristupiti direktno
console.log("profil.profil:", profil.profil); // undefined

// ---------------------------------------------------------------------------
// Objasnjenje - privatnost varijable vs. izlaganje reference na njen objekat
// ---------------------------------------------------------------------------
// - Privatnost varijable: varijabla profil je deklarisana unutar funkcije modula, pa
//   joj kod izvan modula ne moze pristupiti po imenu niti joj dodijeliti novu
//   vrijednost (npr. profil = null). Do nje dolaze samo funkcije vracenog objekta,
//   zahvaljujuci closure mehanizmu.
// - Izlaganje reference: varijabla sadrzi referencu na objekat. Ako metoda vrati tu
//   referencu (kao u pocetnom kodu), pozivalac dobija pristup ISTOM objektu i moze
//   mijenjati, dodavati i brisati njegova svojstva. Sama varijabla je i dalje
//   privatna, ali objekat na koji pokazuje vise nije zasticen.
// - Zakljucak: closure stiti varijablu, a ne objekat na koji ona pokazuje. Da bi stanje
//   ostalo zasticeno, modul ne smije vracati reference na unutrasnje objekte, nego
//   kopije vrijednosti (kao u prepravljenoj metodi pregled). Za primitivna svojstva
//   (string, broj, boolean) je dovoljno kopirati vrijednosti u novi objekat. Kada bi
//   profil imao ugnijezdene objekte ili nizove, i njih bi trebalo posebno kopirati.
