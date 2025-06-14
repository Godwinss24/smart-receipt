import { Receipt } from "../../models";

export async function CreateReceipt(
    imageUrl: string,
    parsedText: string,
    userId: string,
    vendor?: string,
    date?: string,
    total?: string,
) {
    return await Receipt.create({
        imageUrl,
        parsedText,
        vendor: vendor?.trim() || '',
        date: date?.trim() || '',
        total: parseFloat(total || '0'),
        userId
    });
}
