"use client";

import styles from './SearchArtist.module.scss'
import { InputSearch } from "@/components/ui/molecules/input-search/InputSearch"
import { TitlePage } from "@/components/ui/molecules/title-page/TitlePage"
import useAxiosToken from '@/hooks/use-axios-token';
import useSpotifyRepository from '@/hooks/use-spotify-repository';
import { IAlbum } from '@/services/repositories/spotify.repository';
import { useEffect, useState } from 'react'
import { AlbumCard } from '../album-card/AlbumCard';
import { ListCard } from '@/components/ui/molecules/list-card/ListCard';
import { Paginate } from '@/components/ui/molecules/paginate/Paginate';

export const SearchArtist = () => {
  useAxiosToken();
  const [search, setSearch] = useState("");
  const repository = useSpotifyRepository();
  const [albums, setAlbums] = useState<IAlbum[]>([])

  const [page, setPage] = useState(1);
  const limit = 6; 
  const [total, setTotal] = useState(0); 

  const getData = () => {
    if (!search) return;

    const offset = (page) * limit;

    repository.getSearch(search, limit, offset).then((res) => {
      if (res?.albums) {
        setAlbums(res.albums.items)
        setTotal(res.albums.total || 0);
      }
    });
  }

  useEffect(() => {
    getData()
  }, [page])

  return (
    <div>
      <section className="">
          <TitlePage
            title={
              <h2>
                Busca tus <br /><span>artistas</span>
              </h2>
            }
            subtitle={`Encuentra tus artistas favoritos gracias a nuestro \n buscador y guarda tus álbumes favoritos`}
          />
      </section>

      <section className={styles.inputSearch}>
        <InputSearch
          search={search}
          setSearch={setSearch}
          onSearch={() => getData()}
        />
      </section>
      
      <section className={styles.albumList}>
        {
          albums.length ? <p>Guarda tus álbumes favoritos de <br /> {search}</p> : <></>
        }
        <ListCard>
          {
            albums.map((album) => (
              <AlbumCard album={album} key={album.id} refreshData={() => getData()} repository={repository} />
            ))
          }
        </ListCard>
        
        {
          albums.length ? (
            <Paginate
              itemsPerPage={limit}
              totalItems={total}
              onPageChange={(current)=> {
                setPage(current)
              }}
            />
          ) : <></>
        }
      </section>
    </div>
  )
}