import { CustomRequest } from "../utilities/auth";

export interface CreateReceiptRequest extends CustomRequest {
    file?: Express.Multer.File
}