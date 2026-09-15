import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/isabellaschvartz/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/881090EA-7008-4D79-AC14-46036B0F91C1/WT2601-1749PKH-17 caps packing list.xlsx";
const outputDir = "/Users/isabellaschvartz/Documents/Pagina Web/work/caps-packing-inspection";

await fs.mkdir(outputDir, { recursive: true });
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const overview = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 30000,
  tableMaxRows: 30,
  tableMaxCols: 30,
  tableMaxCellChars: 300,
});
await fs.writeFile(`${outputDir}/overview.ndjson`, overview.ndjson, "utf8");

const sheets = [];
for (let index = 0; index < workbook.worksheets.items.length; index += 1) {
  const sheet = workbook.worksheets.getItemAt(index);
  const usedRange = sheet.getUsedRange();
  const rangeAddress = usedRange?.address?.split("!").pop() || "A1:Z100";
  const inspection = await workbook.inspect({
    kind: "region",
    sheetId: sheet.name,
    range: rangeAddress,
    maxChars: 150000,
    tableMaxRows: 1000,
    tableMaxCols: 50,
    tableMaxCellChars: 500,
  });
  await fs.writeFile(`${outputDir}/sheet-${index + 1}.ndjson`, inspection.ndjson, "utf8");

  const preview = await workbook.render({
    sheetName: sheet.name,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(`${outputDir}/sheet-${index + 1}.png`, new Uint8Array(await preview.arrayBuffer()));
  sheets.push({ index: index + 1, name: sheet.name, rangeAddress });
}

await fs.writeFile(`${outputDir}/sheets.json`, JSON.stringify(sheets, null, 2), "utf8");
process.stdout.write(JSON.stringify(sheets, null, 2));
