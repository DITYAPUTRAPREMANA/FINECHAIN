import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver"; 
import { BackendFine } from "../history/historyUtils";

export async function generateReceiptPDF(fine: BackendFine) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 600]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 40;

  const drawText = (text: string, size: number, x: number, y: number, bold = false) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: bold ? boldFont : font,
      color: rgb(0.1, 0.2, 0.4),
    });
  };

  drawText("Proof of Payment", 16, 120, y, true);
  y -= 30;

  page.drawLine({ start: { x: 30, y }, end: { x: 370, y }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
  y -= 20;

  const infoRows = [
    ["Letter Number", fine.letterNumber],
    ["Name", fine.name],
    ["TNKB", fine.TNKB],
    ["Date", fine.date],
    ["Type of Penalty", fine.penaltyType],
    ["Total Fine", fine.totalFine],
    ["Payment Method", "fine.paymentMethod"],
    ["Account Number", "fine.accountNumber"],
    ["Status", fine.status],
  ];

  infoRows.forEach(([label, value]) => {
    drawText(`${label}:`, 11, 40, y, true);
    drawText(String(value), 11, 150, y);
    y -= 20;
  });

  y -= 10;
  page.drawLine({ start: { x: 30, y }, end: { x: 370, y }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });

  y -= 30;
  drawText("Thank you for your payment!", 12, 90, y, true);

  const pdfBytes = await pdfDoc.save();

  // Save to file
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, `Fine_Receipt_${fine.letterNumber}.pdf`);
}
