import { error } from "node:console";
import { CreateRankinzadaRequest } from "../dto/request/create-rankinzada.request";
import { FindRankinzadaByIdRequest } from "../dto/request/find-rankinzadabyid.request";
import { ListRankinzadaRequest } from "../dto/request/list-rankinzada.request";
import { UpdateRankinzadaRequest } from "../dto/request/update-rankinzada.request";
import rankinzadaRepository from "../repositories/rankinzada.repository";

export default {
  createRankinzada(rankinzada: CreateRankinzadaRequest) {
    try {
      const created = rankinzadaRepository.create(rankinzada);
      return created;
    } catch (error) {
      throw error;
    }
  },

  listRankinzada(filter: ListRankinzadaRequest) {
    try {
      const results = rankinzadaRepository.findMany(filter);
      return results;
    } catch (error) {
      throw error;
    }
  },

  findById({ id }: FindRankinzadaByIdRequest) {
    try {
      const rankinzada = rankinzadaRepository.findById(id);
      return rankinzada;
    } catch (error) {
      throw error;
    }
  },

  updateRankinzada(id: number, payload: UpdateRankinzadaRequest) {
    try {
      const rankinzada = rankinzadaRepository.update(id, payload);
      return rankinzada;
    } catch (error) {
      throw error;
    }
  },
  updateRankinzadaStatus(id: number, status: UpdateRankinzadaRequest) {
    try {
      const rankinzada = rankinzadaRepository.updateStatus(id, status);
      return rankinzada;
    } catch {
      throw error;
    }
  },
  deleteRankinzada(id: number) {
    try {
      const rankinzada = rankinzadaRepository.delete(id);
      return rankinzada;
    } catch (error) {
      throw error;
    }
  },
};
