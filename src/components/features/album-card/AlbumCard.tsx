import { IAlbum, SpotifyRepository } from '@/services/repositories/spotify.repository';
import styles from './AlbumCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface AlbumCardProps {
  album: IAlbum,
  refreshData: ()=> void
  repository: SpotifyRepository
}

export const AlbumCard:React.FC<AlbumCardProps> = ({ album, refreshData = ()=>{}, repository }) => {
  const handleSaveAlbum = (id:string) => {
    repository.addAlbumToFavorites(id).then((res) => {
      if (res) {
        refreshData()
      }
    });
  }

  const handleRemoveAlbum = (id:string) => {
    repository.removeAlbumFromFavorites(id).then((res) => {
      if (res) {
        refreshData()
      }
    });
  }
  return (
      <div className={styles.albumCard}>
        <Link href={`/detail/${album.artists[0].id || ''}`} className={styles.cardLink}>
          <Image
            className={styles.image}
            src={album.images[1].url}
            height={272}
            width={272}
            alt={album.id}
          />
          <h3>{ album.name }</h3>
          <p>Publicado: {album.release_date}</p>
        </Link>
        <div>
          {
            !album.isSaved ? (
              <button className={`${styles.btn} ${styles.btnAdd}`} onClick={() => handleSaveAlbum(album.id)}>+ Add album</button>
            ) : (
              <button className={`${styles.btn} ${styles.btnRemove}`} onClick={() => handleRemoveAlbum(album.id)}>- Remove album</button>
            )
          }
        </div>
      </div>  

  )
}