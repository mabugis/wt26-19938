// Zadatak 4 - modul brojaca sa metodama dodaj() i resetuj()
//
// Kao i u pocetnom kodu, koristi se funkcija koja se odmah poziva (IIFE). Varijabla
// brojac je privatna i dostupna je samo metodama vracenog objekta (closure).
// Umjesto jedne funkcije, IIFE sada vraca objekat sa dvije metode.

const brojackiObjekat = (function () {
  let brojac = 0;

  function dodaj() {
    brojac += 1;
    return brojac;
  }

  function resetuj() {
    brojac = 0;
    return brojac;
  }

  return {
    dodaj: dodaj,
    resetuj: resetuj,
    // u tekstu zadatka metoda se naziva i resetuj() i reset(), pa su dostupna oba imena
    reset: resetuj
  };
})();

console.log(brojackiObjekat.dodaj()); // 1
console.log(brojackiObjekat.dodaj()); // 2
console.log(brojackiObjekat.dodaj()); // 3

console.log("resetuj:", brojackiObjekat.resetuj()); // 0
console.log(brojackiObjekat.dodaj()); // 1 - brojanje krece ispocetka
console.log(brojackiObjekat.dodaj()); // 2

console.log("reset:", brojackiObjekat.reset()); // 0
console.log(brojackiObjekat.dodaj()); // 1

// privatna varijabla nije dostupna izvan modula
console.log("brojackiObjekat.brojac:", brojackiObjekat.brojac); // undefined
