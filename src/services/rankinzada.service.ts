import { CreateRankinzadaRequest } from "../dto/request/rankinzada/create-rankinzada.request";
import { FindRankinzadaByIdRequest } from "../dto/request/rankinzada/find-rankinzadabyid.request";
import { ListRankinzadaRequest } from "../dto/request/rankinzada/list-rankinzada.request";
import { UpdateRankinzadaRequest } from "../dto/request/rankinzada/update-rankinzada.request";
import rankinzadaRepository from "../repositories/rankinzada.repository";

export default {
  async createRankinzada(rankinzada: CreateRankinzadaRequest) {
    try {
      return await rankinzadaRepository.create(rankinzada);
    } catch (error) {
      throw error;
    }
  },

  async listRankinzada(filter: ListRankinzadaRequest) {
    try {
      return await rankinzadaRepository.findMany(filter);
    } catch (error) {
      throw error;
    }
  },

  async findById({ id }: FindRankinzadaByIdRequest) {
    try {
      return await rankinzadaRepository.findById(id);
    } catch (error) {
      throw error;
    }
  },

  async updateRankinzada(id: number, payload: UpdateRankinzadaRequest) {
    try {
      return await rankinzadaRepository.update(id, payload);
    } catch (error) {
      throw error;
    }
  },
  async deleteRankinzada(id: number) {
    try {
      const deleted = await rankinzadaRepository.delete(id);
      if (deleted) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  },
};
