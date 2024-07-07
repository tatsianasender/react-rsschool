import { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchResults from './components/SearchResults/SearchResults';
import { Person } from './types/types';

interface AppState {
  searchTerm: string;
  searchResults: Person[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }

  componentDidMount() {
    this.loadSearchTermFromLocalStorage();
    this.fetchSearchResults();
  }

  loadSearchTermFromLocalStorage = () => {
    const storedTerm = localStorage.getItem('searchTerm');
    if (storedTerm) {
      this.setState({ searchTerm: storedTerm.trim() });
    }
  };

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.saveSearchTermToLocalStorage();
    this.fetchSearchResults();
  };

  saveSearchTermToLocalStorage = () => {
    localStorage.setItem('searchTerm', this.state.searchTerm.trim());
  };

  fetchSearchResults = async () => {
    try {
      let url = 'https://swapi.dev/api/people/';
      if (this.state.searchTerm) {
        url += `?search=${encodeURIComponent(this.state.searchTerm)}`;
      }
      const response = await axios.get(url);
      this.setState({ searchResults: response.data.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <div className="top-section">
            <SearchBar
              searchTerm={this.state.searchTerm}
              onSearchInputChange={this.handleSearchInputChange}
              onSearch={this.handleSearch}
            />
          </div>
          <div className="bottom-section">
            <SearchResults searchResults={this.state.searchResults} />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
