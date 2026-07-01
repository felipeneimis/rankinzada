import { Rankinzada } from "../../generated/prisma/browser";
import { CreateRankinzadaRequest } from "../dto/request/create-rankinzada.request";
import { prisma } from "../lib/prisma";


export default {
    async create(rankinzada: CreateRankinzadaRequest): Promise<Rankinzada> {
        const created = await prisma.rankinzada.create({
            data: rankinzada
        })

        return created;
    }
}