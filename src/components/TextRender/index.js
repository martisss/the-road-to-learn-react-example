export const TextRender = ({ children, fontWeight = 200 }) => (
  <>
    <strong fontWeight={fontWeight}>{children}</strong>
  </>
);
