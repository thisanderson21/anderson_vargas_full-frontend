import styles from './ListCard.module.scss'
interface ListCardProps {
  children: React.ReactNode
}
export const ListCard:React.FC<ListCardProps> = ({children})=>  {

  return (
    <div className={styles.listCard}>
      {children}
    </div>
  )
}