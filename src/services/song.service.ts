import { CreateSongRequest } from "../dto/request/rankedSong/create-rankedsongs.request";
import songRepository from "../repositories/song.repository";

export default {
  async addSong(song: CreateSongRequest) {
    try {
      return await songRepository.create(song);
    } catch (error) {
      throw error;
    }
  },
};
