import { Person } from '../../types/types';

interface SearchResultsProps {
  searchResults: Person[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <strong>{result.name}</strong>
            <p>height: {result.height}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
