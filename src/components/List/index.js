function List({ list, onRemoveItem }) {
  console.log(list)
  return list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}></Item>
  ));
}

const Item = ({ onRemoveItem, item }) => {
  // const handleRemoveItem = ()=> onRemoveItem(item)
  return (
    <div>
      <label>
        Title:
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        --
      </label>
      <label>
        Author:
        <span>{item.author}</span>--
      </label>
      <label>
        num_comments:
        <span>{item.num_comments}</span>--
      </label>
      <label>
        Points:
        <span>{item.points}</span>
      </label>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Delete
        </button>
        {/* <button type="button"onClick={handleRemoveItem.bind(null, item)}>Delete</button> */}
      </span>
    </div>
  );
};

export { List };
