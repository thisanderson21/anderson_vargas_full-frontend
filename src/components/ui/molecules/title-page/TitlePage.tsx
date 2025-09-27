import styles from './TitlePage.module.scss'

interface TitlePageProps {
  title: React.ReactNode;
  subtitle: string
}

export const TitlePage:React.FC<TitlePageProps> = ({title,subtitle}) => {


  return (
    <section className={styles.titlePage}>
        {
          title
        }
        <p>{subtitle}</p>
    </section>
  )
}