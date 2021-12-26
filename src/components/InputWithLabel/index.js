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
      <label htmlFor={id}>
        {children}
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={onInputChange}
          autoFocus={isFocused}
        />
      </label>
      <p>{`search for：${value}`}</p>
    </>
  );
};
