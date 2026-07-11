import { CreateSongRequest } from "../dto/request/rankedSong/create-rankedsongs.request";
import { ListRankedSongRequest } from "../dto/request/rankedSong/list-rankedsongs.request";
import songRepository from "../repositories/song.repository";

export default {
  async addSong(song: CreateSongRequest) {
    try {
      return await songRepository.create(song);
    } catch (error) {
      throw error;
    }
  },
  async findMany(filter: ListRankedSongRequest) {
    try {
      return await songRepository.findMany(filter);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
