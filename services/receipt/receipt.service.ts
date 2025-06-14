import { Receipt } from "../../models";
import { Op } from "sequelize";


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




export async function findAllUsersReceipt(
    userId: string,
    page: number = 1,
    limit: number = 10,
    search?: string
) {
    const offset = (page - 1) * limit;

    const whereCondition: any = { userId };

    if (search) {
        const likeSearch = { [Op.iLike]: `%${search}%` };

        const orConditions: any[] = [
            { vendor: likeSearch },
            { date: likeSearch },
        ];

        const numericSearch = parseFloat(search);
        if (!isNaN(numericSearch)) {
            orConditions.push({ total: numericSearch }); 
        }

        whereCondition[Op.or] = orConditions;
    }

    const { rows: items, count: total } = await Receipt.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });

    return {
        data: items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}


