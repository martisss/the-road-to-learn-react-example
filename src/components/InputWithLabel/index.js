import styles from '../../App.module.css'
import { useRef, useEffect } from "react";
export const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  children,
  isFocused,
}) => {
  const inputRef = useRef();
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
          autoFocus={isFocused}
          className="input"
        />
      </label>
    </>
  );
};
