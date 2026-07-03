import { CreateRankinzadaRequest } from "../dto/request/create-rankinzada.request"
import { FindRankinzadaByIdRequest } from "../dto/request/find-rankinzadabyid.request";
import { ListRankinzadaRequest } from "../dto/request/list-rankinzada.request";
import { Filter } from "../interfaces/Filter";
import rankinzadaRepository from "../repositories/rankinzada.repository"

export default {
    createRankinzada(rankinzada: CreateRankinzadaRequest) {
        try {
            const created = rankinzadaRepository.create(rankinzada)
            return created;
        } catch (error) {
            throw error;
        }
    },

    listRankinzada(filter: ListRankinzadaRequest){
        try {
            const results = rankinzadaRepository.findMany(filter)
            return results
        } catch (error) {
            throw error;
        }
    },

    findById(id: FindRankinzadaByIdRequest){
        try {
            const rankinzada = rankinzadaRepository.findById(id)
            return rankinzada;
        } catch (error) {
            throw error;
        }
    }
}