import { Prisma, Rankinzada } from "../../generated/prisma/browser";
import { CreateRankinzadaRequest } from "../dto/request/create-rankinzada.request";
import { ListRankinzadaRequest } from "../dto/request/rankinzada/list-rankinzada.request";
import { UpdateRankinzadaRequest } from "../dto/request/update-rankinzada.request";
import { prisma } from "../lib/prisma";

export default {
  async create(rankinzada: CreateRankinzadaRequest): Promise<Rankinzada> {
    return prisma.rankinzada.create({
      data: rankinzada,
    });
  },

  async findById(id: number) {
    return prisma.rankinzada.findUnique({
      where: { id: id },
    });
  },

  async findMany(filter: ListRankinzadaRequest) {
    const where: Prisma.RankinzadaWhereInput = {};

    if (filter.theme) {
      where.theme = {
        contains: filter.theme,
        mode: "insensitive",
      };
    }

    if (filter.rankinzadaStatus) {
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

    const totalPages = Math.ceil(total / filter.limit);
    return {
      data: rankinzadas,
      meta: {
        page: filter.page,
        limit: filter.limit,
        total,
        totalPages,
        hasNextPage: filter.page < totalPages,
        hasPreviousPage: filter.page > 1,
      },
    };
  },

  async update(id: number, rankinzada: UpdateRankinzadaRequest) {
    return prisma.rankinzada.update({
      where: { id },
      data: rankinzada,
    });
  },

  async updateStatus(
    id: number,
    { rankinzadaStatus }: UpdateRankinzadaRequest,
  ) {
    return prisma.rankinzada.update({
      where: { id },
      data: { rankinzadaStatus: rankinzadaStatus },
    });
  },

  async delete(id: number) {
    return prisma.rankinzada.delete({
      where: { id },
    });
  },
};
