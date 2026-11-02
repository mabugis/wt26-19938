function iscrtajTablicuMnozenja() {
  document.write("<table>");

  // zaglavlje kolona (X i brojevi od 1 do 10)
  document.write("<thead><tr>");
  document.write("<th>X</th>");
  for (let j = 1; j <= 10; j++) {
    document.write("<th>" + j + "</th>");
  }
  document.write("</tr></thead>");

  // redovi tablice (1 do 10)
  document.write("<tbody>");
  for (let i = 1; i <= 10; i++) {
    const klasaReda = i % 2 === 0 ? ' class="parni-red"' : "";
    document.write("<tr" + klasaReda + ">");
    document.write("<th>" + i + "</th>");

    for (let j = 1; j <= 10; j++) {
      document.write("<td>" + (i * j) + "</td>");
    }

    document.write("</tr>");
  }
  document.write("</tbody>");

  document.write("</table>");
}

iscrtajTablicuMnozenja();
