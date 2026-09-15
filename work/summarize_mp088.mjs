import fs from "node:fs/promises";

const [input] = process.argv.slice(2);
const books = JSON.parse(await fs.readFile(input, "utf8"));

for (const book of books) {
  const rows = book.sheets[0].values;
  const result = rows.slice(11).map((row, index) => ({
    excelRow: index + 12,
    order: row[1],
    article: row[3],
    fieldE: row[4],
    fieldF: row[5],
    brand: row[6],
    curve: row[8],
    qty: row[9],
    price: row[10],
  })).filter((row) =>
    String(row.brand || "").toUpperCase().includes("BYE BYE") &&
    row.article && row.qty != null && row.price != null
  );
  console.log(`\n### ${book.file}`);
  for (const row of result) console.log(JSON.stringify(row));
}
