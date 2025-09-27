"use client";
import styles from './MyAlbums.module.scss'
import { TitlePage } from "@/components/ui/molecules/title-page/TitlePage"
import useAxiosToken from '@/hooks/use-axios-token';
import useSpotifyRepository from '@/hooks/use-spotify-repository';
import { IAlbum } from '@/services/repositories/spotify.repository';
import { useEffect, useState } from 'react'
import { AlbumCard } from '../album-card/AlbumCard';
import { ListCard } from '@/components/ui/molecules/list-card/ListCard';

export const MyAlbums = () => {
  useAxiosToken();
  const repository = useSpotifyRepository();
  const [albums, setAlbums] = useState<IAlbum[]>([])

  const getData = ()=> {
    repository.getMySavedAlbums().then((res) => {
      if (res) {
        setAlbums(res)
      }
    });
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <section className="">
          <TitlePage
            title={
              <h2> Mis albumes <br /><span>guardados</span></h2>
            }
            subtitle={`Disfruta de tu música a un solo click y descube que discos has guardado \n dentro de  “mis  álbumes”`}
          />
      </section>
      
      <section className={styles.albumList}>
        <ListCard>
          {
            albums.map((album) => (
              <AlbumCard album={album} key={album.id} refreshData={() => getData()} repository={repository}  />
            ))
          }
        </ListCard>
      </section>
    </div>
  )
}