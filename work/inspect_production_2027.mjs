import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/isabellaschvartz/Downloads/PRODUCCIÓN BYE BYE 2027.xlsx";
const outputDir = "/Users/isabellaschvartz/Documents/Pagina Web/work/production-2027-inspection";

await fs.mkdir(outputDir, { recursive: true });
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const overview = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 30000,
  tableMaxRows: 15,
  tableMaxCols: 20,
  tableMaxCellChars: 200,
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
    maxChars: 100000,
    tableMaxRows: 500,
    tableMaxCols: 40,
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
