import styles from './InputSearch.module.scss'

interface InputSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void
}
export const InputSearch:React.FC<InputSearchProps> = ({ search, setSearch, onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que recargue la página
    onSearch();
  }
  
  return (
    <form className={styles.input_search} onSubmit={handleSubmit}>
      <input type="text" placeholder='Artist...' value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button className={styles.btn}>Search</button>
    </form>
  )
}