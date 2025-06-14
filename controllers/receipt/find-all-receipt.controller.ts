import { Response } from "express";
import { ApiResponse } from "../../interfaces/aResponse";
import { ResponseMessages } from "../../interfaces/responses";
import {  findAllUsersReceipt } from "../../services/receipt/receipt.service";
import { findOneUser } from "../../services/user/user.service";
import { FindAllRequest } from "../../interfaces/findAllReceiptRequest";


export async function FindAllReceiptControl(req: FindAllRequest, res: Response) {
    const responseData: ApiResponse<null | string | {}> = {
        data: null,
        message: '',
        successful: false
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

        const page = parseInt(String(req.query.page || '1'), 10);
        const limit = parseInt(String(req.query.limit || '10'), 10);

        const fetchReceiptResult = await findAllUsersReceipt(user.id, page, limit, req.query.search);

        responseData.data = fetchReceiptResult;
        responseData.message = 'Receipts found';
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