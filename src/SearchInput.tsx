export const SearchInput = ({ value, setSearchValue }: any) => {
  return (
    <>
      <p>Search by name or email</p>
      <input
        value={value}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </>
  );
};
