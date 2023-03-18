export const Filter = ({ onInput }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input style={{ marginBottom: 10 }} onChange={onInput} />
    </>
  );
};
