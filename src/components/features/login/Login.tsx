
import Image from 'next/image';
import styles from './Login.module.scss';
import { Button } from '@/components/ui/atoms/Button';
import { signIn } from "next-auth/react";

export const Login: React.FC = () => {


  return (
    <div className={styles.login}>
      <div className={styles.content_image}>
        <div className={styles.image}>
          <Image
            src="/main-arrow.svg"
            alt="Arrow"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className={styles.content}>
        <h1>Disfruta de la <span className='text-accent'><br />mejor música</span></h1>

        <p>Accede a tu cuenta para guardar tus <br /> albumes favoritos.</p>

        <Button onClick={() => signIn('spotify')}>
          Log in con Spotify
          <Image
            src="/icons_arrow-right.svg"
            width={20}
            height={20}
            alt="Spotify logo"
          />
        </Button>
      </div>
    </div>
  )
}