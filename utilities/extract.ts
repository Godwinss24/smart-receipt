export function parseReceiptText(extractedText: string) {
  const lines = extractedText.split('\n').map(line => line.trim()).filter(Boolean);

  // Vendor name: usually in the first 1–2 lines
  const vendorName = lines[0] || undefined;

  // Total amount regex
  const totalRegex = /(total|amount)\D*(\d+[\.,]?\d{0,2})/i;
  let totalAmount: string | undefined = undefined;

  // Date regex (matches formats like 14/06/2025, 2025-06-14, 14-06-25, etc.)
  const dateRegex = /(\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b|\b\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}\b)/;
  let date: string | undefined = undefined;

  // Check lines in reverse order for total and date (bottom of receipt is more likely)
  for (const line of lines.slice().reverse()) {
    if (!totalAmount) {
      const totalMatch = totalRegex.exec(line);
      if (totalMatch) {
        totalAmount = totalMatch[2].replace(',', '.');
      }
    }

    if (!date) {
      const dateMatch = dateRegex.exec(line);
      if (dateMatch) {
        date = dateMatch[0];
      }
    }

    // Exit early if both found
    if (totalAmount && date) break;
  }

  return {
    vendorName,
    totalAmount,
    date
  };
}
