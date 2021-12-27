import { InputWithLabel } from "../InputWithLabel"
import  {TextRender } from '../TextRender'
import styles from '../../App.module.css'
import {ReactComponent as Check} from '../../static/pics/check.svg'
export const SearchForm = ({
  searchValue,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className={styles.SearchForm}>
    <InputWithLabel
      id="search"
      label="Search"
      isFocused
      onInputChange={onSearchInput}
      value={searchValue}
    >
      <TextRender fontWeight={300}>Search: </TextRender>
    </InputWithLabel>
    <button type="submit" disabled={!searchValue} className={`${styles.button} ${styles.button_Large}`} style={{marginLeft: "30px"}}>
      <Check width="18px" height="18px"></Check>
    </button>
  </form>
)