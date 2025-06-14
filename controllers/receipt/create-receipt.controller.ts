import { Response } from "express";
import { CreateReceiptRequest } from "../../interfaces/createReceiptRequest";
import { ApiResponse } from "../../interfaces/aResponse";
import { ResponseMessages } from "../../interfaces/responses";
import uploadImageToCloudinary from "../../services/uploadImage";
import { Tesseract } from "tesseract.ts";
import { parseReceiptText } from "../../utilities/extract";
import { CreateReceipt } from "../../services/receipt/receipt.service";
import { findOneUser } from "../../services/user/user.service";


export async function CreateReceiptControl(req: CreateReceiptRequest, res: Response) {
    const responseData: ApiResponse<null | string | {}> = {
        data: null,
        message: '',
        successful: false
    }
    const { file } = req;

    if (!file) {
        responseData.data = null;
        responseData.message = 'Attach the image of the receipt';
        responseData.successful = false;
        res.status(400).json(responseData);
        return;
    }

    try {

        const user = await findOneUser(req.user?.email || '');

        if (!user) {
            responseData.data = null;
            responseData.message = ResponseMessages.USER_NOT_FOUND;
            responseData.successful = false;
            res.status(400).json(responseData);
            return;
        };

        const imageURL = await uploadImageToCloudinary(file.buffer);

        const ocrResult = await Tesseract.recognize(file.buffer, 'eng');

        const extractedText = ocrResult.text;

        const { date, totalAmount, vendorName } = parseReceiptText(extractedText);

        const newReceipt = await CreateReceipt(imageURL, extractedText, user.id,vendorName, date, totalAmount);

        responseData.data = newReceipt;
        responseData.message = 'New Receipt added';
        responseData.successful = true;
        res.status(200).json(responseData);
        return;


    } catch (error) {
        console.error(error);
        responseData.data = null;
        responseData.message = ResponseMessages.SERVER_ERROR;
        responseData.successful = false;
        res.status(500).json(responseData);
        return;
    }
}