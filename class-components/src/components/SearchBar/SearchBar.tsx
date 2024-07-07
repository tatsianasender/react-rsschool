interface SearchBarProps {
  searchTerm: string;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchInputChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchInputChange}
        placeholder="Enter search term..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
