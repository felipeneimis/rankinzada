import { Prisma, Rankinzada } from "../../generated/prisma/browser";
import { CreateRankinzadaRequest } from "../dto/request/create-rankinzada.request";
import { ListRankinzadaRequest } from "../dto/request/list-rankinzada.request";
import { prisma } from "../lib/prisma";


export default {
    async create(rankinzada: CreateRankinzadaRequest): Promise<Rankinzada> {
        const created = await prisma.rankinzada.create({
            data: rankinzada
        })

        return created;
    },

    async findMany(filter: ListRankinzadaRequest) {
        const where: Prisma.RankinzadaWhereInput = {};

        if (filter.theme) {
            where.theme = {
                contains: filter.theme,
                mode: "insensitive",
            };
        }

        if (filter.status) {
            where.rankinzadaStatus = filter.rankinzadaStatus;
        }

        const skip = (filter.page - 1) * filter.limit;

        const [rankinzadas, total] = await Promise.all([
            prisma.rankinzada.findMany({
                where,
                skip,
                take: filter.limit,
                orderBy: {
                    [filter.sort]: filter.order,
                },
            }),
            prisma.rankinzada.count({ where }),
        ]);

        return {
            data: rankinzadas,
            meta: {
                page: filter.page,
                limit: filter.limit,
                total,
                totalPages: Math.ceil(total / filter.limit),
            },
        };
    }
}