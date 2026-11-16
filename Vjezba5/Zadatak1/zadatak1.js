// Zadatak 1 - funkcija dodajDva i funkcija jednom (closure)

function dodajDva(broj) {
  return broj + 2;
}

console.log(dodajDva(1)); // 3
console.log(dodajDva(2)); // 4
console.log(dodajDva(10)); // 12

// jednom vraca novu funkciju koja kroz closure "pamti" varijable pozvana i rezultat.
// Te varijable postoje i nakon sto se jednom zavrsi, ali su dostupne samo vracenoj funkciji.
function jednom(callback) {
  let pozvana = false;
  let rezultat;

  return function (...argumenti) {
    // koristi se posebna oznaka (pozvana), a ne provjera rezultat === undefined,
    // jer callback moze i sam vratiti undefined pa bi se tada pozivao ponovo
    if (!pozvana) {
      rezultat = callback(...argumenti);
      pozvana = true;
    }
    return rezultat;
  };
}

const jednomFunkcija = jednom(dodajDva);
console.log(jednomFunkcija(4)); // 6
console.log(jednomFunkcija(10)); // 6
console.log(jednomFunkcija(9001)); // 6

// svaki poziv funkcije jednom pravi novo leksicko okruzenje,
// pa nova funkcija ima svoje stanje i ne zavisi od prethodne
const drugaJednomFunkcija = jednom(dodajDva);
console.log(drugaJednomFunkcija(100)); // 102
console.log(drugaJednomFunkcija(1)); // 102
console.log(jednomFunkcija(1)); // i dalje 6
