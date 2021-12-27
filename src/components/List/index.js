import styles from "../../App.module.css"
function List({ list, onRemoveItem }) {
  console.log(list);
  return list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}></Item>
  ));
}

const Item = ({ onRemoveItem, item }) => {
  // const handleRemoveItem = ()=> onRemoveItem(item)
  return (
    <div className={styles.item}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <button
          type="button"
          onClick={() => onRemoveItem(item)}
          className={`${styles.button} ${styles.button_small}`}
        >
          Dismiss
        </button>
      </span>
    </div>
  );
};

export { List };
