import { Prisma, RankedSong } from "../../generated/prisma/browser";
import { CreateSongRequest } from "../dto/request/rankedSong/create-rankedsongs.request";
import { ListRankedSongRequest } from "../dto/request/rankedSong/list-rankedsongs.request";
import { prisma } from "../lib/prisma";

export default {
  async create(song: CreateSongRequest): Promise<RankedSong> {
    return prisma.rankedSong.create({
      data: song,
    });
  },

  async findById(id: number) {
    return prisma.rankedSong.findUnique({
      where: { id: id },
    });
  },

  async findMany(filter: ListRankedSongRequest) {
    const where: Prisma.RankedSongWhereInput = {};

    const skip = (filter.page - 1) * filter.limit;

    const [rankinzadas, total] = await Promise.all([
      prisma.rankedSong.findMany({
        where,
        skip,
        take: filter.limit,
        orderBy: {
          [filter.sort]: filter.order,
        },
      }),
      prisma.rankedSong.count({ where }),
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

  //   async updateStatus(
  //     id: number,
  //     { rankinzadaStatus }: UpdateRankinzadaRequest,
  //   ) {
  //     return prisma.rankinzada.update({
  //       where: { id },
  //       data: { rankinzadaStatus: rankinzadaStatus },
  //     });
  //   },

  //   async delete(id: number) {
  //     return prisma.rankinzada.delete({
  //       where: { id },
  //     });
  //   },
};
