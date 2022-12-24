import { useState } from 'react';
import BookList from './components/BookList';
import Message from './components/Message';
import { encodedBookName, useDataApi } from './utils';
import { BASE_URL_OPEN_LIBRARY, MAX_ITEMS_PER_PAGE, MAX_VALUE_CHARS } from './constants';
import './App.scss';
import ReactPaginate from 'react-paginate';

function App() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const urlSearch = `${BASE_URL_OPEN_LIBRARY}/search.json?q=${encodedBookName(
    searchValue
  )}&page=${page}`;

  const [{ data, isLoading, isError }, setUrl] = useDataApi(urlSearch, {});

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    setIsSearching(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchValue.length > MAX_VALUE_CHARS) {
        const urlSearch = `${BASE_URL_OPEN_LIBRARY}/search.json?q=${encodedBookName(
          searchValue
        )}&page=${page}`;
        setUrl(urlSearch);
        setIsSearching(true);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.length > MAX_VALUE_CHARS) {
      const urlSearch = `${BASE_URL_OPEN_LIBRARY}/search.json?q=${encodedBookName(
        searchValue
      )}&page=${page}`;
      setUrl(urlSearch);
      setIsSearching(true);
    }
  };

  const handlePageClick = ({ selected }) => {
    const pageSelected = selected + 1;
    const urlSearch = `${BASE_URL_OPEN_LIBRARY}/search.json?q=${encodedBookName(
      searchValue
    )}&page=${pageSelected}`;
    setUrl(urlSearch);
    setPage(pageSelected);
    setIsSearching(true);
  };

  const RenderData = () => {
    if (searchValue && searchValue.length <= MAX_VALUE_CHARS) {
      return (
        <Message message={'Search value should be greater than 3 characters!'} color={'red'} />
      );
    }
    if (isLoading) {
      return <Message message={'Loading...'} />;
    }
    if (isError) {
      return <Message message={'An error occurs during the searching.'} color={'red'} />;
    }
    if ((isSearching && searchValue && data && data?.docs?.length === 0) || !data) {
      return <Message message={'No data found!'} color={'red'} />;
    } else if (searchValue && data && data?.docs?.length > 0) {
      return <BookList books={data.docs} />;
    }
  };

  return (
    <div className="App">
      <h1>Search for a book:</h1>
      <form className="styled-form" onSubmit={handleSubmit}>
        <input
          className="styled-input-search"
          type="search"
          id="searchValue"
          name="searchValue"
          placeholder="Search for a quote, text, or keywords"
          autoComplete="off"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="styled-button-search" type="submit">
          Search
        </button>
      </form>
      <div className="styled-results">
        {data?.docs?.length > 0 && searchValue.length > MAX_VALUE_CHARS && (
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={Math.ceil(data?.numFound / MAX_ITEMS_PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={'styled-pagination'}
            previousLinkClassName={'styled-pagination__link'}
            nextLinkClassName={'styled-pagination__link'}
            disabledClassName={'styled-pagination__link--disabled'}
            activeClassName={'styled-pagination__link--active'}
          />
        )}
        <RenderData />
      </div>
    </div>
  );
}
export default App;
