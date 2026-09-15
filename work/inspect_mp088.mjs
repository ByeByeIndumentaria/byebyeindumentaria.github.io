import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const files = process.argv.slice(2);

for (const file of files) {
  const blob = await FileBlob.load(file);
  const workbook = await SpreadsheetFile.importXlsx(blob);
  const summary = await workbook.inspect({
    kind: "workbook,sheet,table,region",
    maxChars: 18000,
    tableMaxRows: 30,
    tableMaxCols: 30,
    tableMaxCellChars: 120,
  });
  process.stdout.write(`\n### ${file}\n${summary.ndjson}\n`);
}
