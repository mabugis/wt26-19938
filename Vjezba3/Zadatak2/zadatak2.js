// zadatak 2 - plan n ponavljanja aktivnosti (vjezbanje) sa pauzom poslije svakih k ponavljanja

// mogucnost 2 - plan se zavrsava odmah nakon n-tog ponavljanja (ne ispisuje se
// zavrsna pauza poslije posljednjeg ponavljanja jer je aktivnost u potpunosti zavrsena).

function generisiPlanVjezbanja(n, k) {
  let plan = `Plan vježbanja (${n} ponavljanja, pauza poslije svakih ${k} ponavljanja):\n`;
  plan += "(Napomena: Ako posljednje ponavljanje pada na mjesto pauze, plan se završava odmah bez završne pauze.)\n\n";

  for (let i = 1; i <= n; i++) {
    const stavkaPonavljanja = `Ponavljanje ${i}: Izvršeno ponavljanje vježbe br. ${i}`;
    console.log(stavkaPonavljanja);
    plan += stavkaPonavljanja + "\n";

    if (i % k === 0 && i < n) {
      const porukaPauze = `--- Pauza nakon ${i}. ponavljanja ---`;
      console.log(porukaPauze);
      plan += porukaPauze + "\n";
    }
  }

  const krajPoruka = "Plan aktivnosti je uspješno završen.";
  console.log(krajPoruka);
  plan += "\n" + krajPoruka;

  return plan;
}

const unosN = prompt("Unesite ukupan broj ponavljanja (pozitivan cijeli broj n):");

if (unosN === null || unosN.trim() === "") {
  alert("Greška: Unos za broj ponavljanja (n) je otkazan ili prazan.");
  console.log("Greška: Unos za broj ponavljanja (n) je otkazan ili prazan.");
} else {
  const n = Number(unosN.trim());

  if (!Number.isInteger(n) || n <= 0) {
    alert("Greška: Broj ponavljanja (n) mora biti pozitivan cijeli broj.");
    console.log("Greška: Broj ponavljanja (n) mora biti pozitivan cijeli broj.");
  } else {
    const unosK = prompt("Unesite broj ponavljanja prije pauze (pozitivan cijeli broj k):");

    if (unosK === null || unosK.trim() === "") {
      alert("Greška: Unos za korak pauze (k) je otkazan ili prazan.");
      console.log("Greška: Unos za korak pauze (k) je otkazan ili prazan.");
    } else {
      const k = Number(unosK.trim());

      if (!Number.isInteger(k) || k <= 0) {
        alert("Greška: Broj ponavljanja prije pauze (k) mora biti pozitivan cijeli broj.");
        console.log("Greška: Broj ponavljanja prije pauze (k) mora biti pozitivan cijeli broj.");
      } else {
        const ispisPlana = generisiPlanVjezbanja(n, k);
        alert(ispisPlana);
      }
    }
  }
}
