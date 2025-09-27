export interface Image {
  url: string
}

export interface IArtist {
  id: string
  name: string
  items?: IArtist[]
  artists?: IArtist[]
  images: Image[];
  listeners: number;
  followers: {
    total: number
  }
  external_urls: {
    spotify: string
  }
}

export interface IAlbum {
  id: string
  name: string
  images: Image[]
  artists: IArtist[]
  release_date: string;
  items?: IAlbum[],
  isSaved: boolean;
  external_urls: {
    spotify: string
  }
}

export interface ResponseSearch {
  albums?: {
    offset: number;
    limit: number;
    items: IAlbum[];
    total: number
  },
}

export interface SpotifyRepository {
  getSearch(querySearch:string, limit: number,offset: number): Promise<ResponseSearch | null>;

  addAlbumToFavorites(albumId: string): Promise<boolean>

  getMySavedAlbums(): Promise<IAlbum[] | null>

  removeAlbumFromFavorites(albumId: string): Promise<boolean>

  getArtistWithAlbums(artistId: string): Promise<{ artist: IArtist; albums: IAlbum[] } | null>
}
