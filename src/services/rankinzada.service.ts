import { CreateRankinzadaRequest } from "../dto/request/create-rankinzada.request"
import rankinzadaRepository from "../repositories/rankinzada.repository"

export default {
    createRankinzada(rankinzada: CreateRankinzadaRequest) {
        try {
            const created = rankinzadaRepository.create(rankinzada)
            return created;
        } catch (error) {
            throw error;
        }
    }
}