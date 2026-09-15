import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputDir = process.argv[2];
const files = process.argv.slice(3);
await fs.mkdir(outputDir, { recursive: true });

const extracted = [];
for (const file of files) {
  const blob = await FileBlob.load(file);
  const workbook = await SpreadsheetFile.importXlsx(blob);
  const sheetInfo = (await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 5000 })).ndjson
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const sheets = [];
  for (const info of sheetInfo.filter((item) => item.kind === "sheet")) {
    const sheet = workbook.worksheets.getItem(info.name);
    const used = sheet.getUsedRange();
    sheets.push({ name: info.name, values: used.values });
  }
  extracted.push({ file, sheets });
}

await fs.writeFile(path.join(outputDir, "mp088.json"), JSON.stringify(extracted, null, 2));
