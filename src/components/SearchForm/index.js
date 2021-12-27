import { InputWithLabel } from "../InputWithLabel"
import  {TextRender } from '../TextRender'
export const SearchForm = ({
  searchValue,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className="search-form">
    <InputWithLabel
      id="search"
      label="Search"
      isFocused
      onInputChange={onSearchInput}
      value={searchValue}
    >
      <TextRender fontWeight={300}>Search: </TextRender>
    </InputWithLabel>
    <button type="submit" disabled={!searchValue} className="button button-large" style={{marginLeft: "30px"}}>
      SUBMIT
    </button>
  </form>
)