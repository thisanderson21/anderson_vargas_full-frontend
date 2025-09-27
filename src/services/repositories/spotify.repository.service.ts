import {
  IAlbum,
  IArtist,
  ResponseSearch, SpotifyRepository
} from './spotify.repository';
import axiosIntance from '../../core/axios-config';
import { injectable } from 'inversify';

@injectable()
export class SpotifyRepositoryService implements SpotifyRepository {

  async getSearch(
    querySearch:string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ResponseSearch | null> {
    try {
      const {data} = await axiosIntance.get<ResponseSearch>(`/search?q=${ querySearch }&type=album&limit=${limit}&offset=${offset}`);

      const albums = data?.albums?.items || [];

      const ids = albums.map((a) => a.id).join(",");

      const { data: savedFlags } = await axiosIntance.get<boolean[]>(
        `/me/albums/contains?ids=${ids}`
      );

      return {
        ...data,
        albums: {
          ...data.albums,
          items: albums.map((album, i) => ({
            ...album,
            isSaved: savedFlags[i],
          })),
          limit,  // agregamos información de paginación
          offset,
          total: data.albums?.total || 0
        },
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<boolean> {
    try {
      await axiosIntance.put(`/me/albums?ids=${albumId}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  
  async getMySavedAlbums(): Promise<IAlbum[] | null> {
    try {
      const { data } = await axiosIntance.get<{ items: { album: IAlbum }[] }>('/me/albums');
      return (data.items ||[] ).map((item) => ({
        ...item.album,
        isSaved: true
      }));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async removeAlbumFromFavorites(albumId: string): Promise<boolean> {
    try {
      await axiosIntance.delete(`/me/albums?ids=${albumId}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getArtistTopTracks(artistId: string, market: string = "US") {
    try {
      const { data } = await axiosIntance.get<{ tracks: { popularity: number }[] }>(
        `/artists/${artistId}/top-tracks?market=${market}`
      );
      return data.tracks;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async estimateMonthlyListeners(artistId: string): Promise<number | null> {
    try {
      const topTracks = await this.getArtistTopTracks(artistId);
  
      if (!topTracks.length) return null;
  
      // Simple estimación: promedio de popularidad de top tracks * 10k
      const avgPopularity =
        topTracks.reduce((sum, track) => sum + track.popularity, 0) /
        topTracks.length;
  
      const estimatedListeners = Math.floor(avgPopularity * 10000);
  
      return estimatedListeners;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getArtistById(artistId: string): Promise<IArtist | null> {
    try {
      const { data } = await axiosIntance.get<IArtist>(`/artists/${artistId}`);
      return {
        ...data,
        listeners: await this.estimateMonthlyListeners(artistId) || 0
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
  async getAlbumsByArtist(artistId: string): Promise<IAlbum[] | null> {
    try {
      const { data } = await axiosIntance.get<{ items: IAlbum[] }>(
        `/artists/${artistId}/albums?include_groups=album,single&market=US&limit=20`
      );

      const albums = data?.items || [];

      const ids = albums.map((a) => a.id).join(",");

      const { data: savedFlags } = await axiosIntance.get<boolean[]>(
        `/me/albums/contains?ids=${ids}`
      );

      return data.items.map((item, index) => ({
        ...item,
        isSaved: savedFlags[index],
      }));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getArtistWithAlbums(artistId: string): Promise<{ artist: IArtist; albums: IAlbum[] } | null> {
    try {
      const [artist, albums] = await Promise.all([
        this.getArtistById(artistId),
        this.getAlbumsByArtist(artistId),
      ]);

      if (!artist || !albums) return null;
      return { artist, albums };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
