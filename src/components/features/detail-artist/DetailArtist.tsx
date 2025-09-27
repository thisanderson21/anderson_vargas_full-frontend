"use client"
import styles from './DetailArtist.module.scss'
import useAxiosToken from "@/hooks/use-axios-token";
import useSpotifyRepository from "@/hooks/use-spotify-repository";
import { IAlbum, IArtist } from "@/services/repositories/spotify.repository";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AlbumCard } from '../album-card/AlbumCard';
import { ListCard } from '@/components/ui/molecules/list-card/ListCard';

interface DetailArtistProps {
  id: string;
}
export  const DetailArtist:React.FC<DetailArtistProps> = ({id}) => {
  useAxiosToken()
  const repository = useSpotifyRepository();
  const [artist, setArtist] = useState<IArtist | null>(null)
  const [albums, setAlbums] = useState<IAlbum[]>([])

  const getData = ()=> {
    repository.getArtistWithAlbums(id).then((res) => {
      if (res) {
        setArtist(res.artist!)
        setAlbums(res.albums!)
      }
    });
  }

  useEffect(() => {
    getData()
  }, [id])

  console.log(artist, 'artist')
  return artist && (
    <div className={styles.detailArtist}>
      <section className={styles.contentArtist}>
        <Image
          className={styles.imageArtist}
          src={artist?.images[0].url || ''}
          width={169}
          height={169}
          alt={artist.name}
        />
        <div className=''>
          <div className={styles.verify}>
            <Image
              className={styles.imageArtist}
              src={'/verify_icon.svg'}
              width={22}
              height={22}
              alt={artist.name}
            />
            <p>Artista certificado</p>
          </div>
          <h3>{artist.name}</h3>
          <p>Followers: {artist.followers.total.toLocaleString('es-CO')}</p>
          <p>Oyentes mensuales: {artist.listeners.toLocaleString('es-CO')}</p>
        </div>
      </section>
      <section>
        {
          albums.length ? <p>Guarda tus álbumes favoritos de {artist.name}</p> : <></>
        }
        <ListCard>
          {
            albums.map((album) => (
              <AlbumCard album={album} key={album.id} refreshData={() => getData()} repository={repository} />
            ))
          }
        </ListCard>
      </section>
    </div>
  )
}