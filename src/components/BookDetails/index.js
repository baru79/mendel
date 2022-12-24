import { useNavigate } from 'react-router-dom';
import { BASE_URL_COVERS_OPEN_LIBRARY, BASE_URL_OPEN_LIBRARY } from '../../constants';
import { getLocalStorageValue, useDataApi } from '../../utils';
import Message from '../Message';
import './bookDetails.scss';

const BookDetails = () => {
  const navigate = useNavigate();
  const urlWorks = `${BASE_URL_OPEN_LIBRARY}/works/${getLocalStorageValue('items').workId}.json`;
  const urlAuthors = `${BASE_URL_OPEN_LIBRARY}/authors/${
    getLocalStorageValue('items').authorId[0]
  }.json`;
  const [{ data: worksData, isLoading: worksIsLoading, isError: worksIsError }] = useDataApi(
    urlWorks,
    {}
  );
  const [{ data: authorsData, isLoading: authorsIsLoading, isError: authorsIsError }] = useDataApi(
    urlAuthors,
    {}
  );

  const getContent = (content, prop) => {
    if (content && content[prop]) {
      const result = content[prop];
      if (result && result.value) {
        return result.value.split('\r')[0];
      }
      return result.split('\r')[0];
    }
    return '-';
  };

  const loading = worksIsLoading || authorsIsLoading;

  const error = worksIsError || authorsIsError;

  if (loading) {
    return <Message message={'Loading...'} />;
  }

  if (error) {
    return <Message message={'An error occurs during the searching.'} />;
  }

  const data = {
    ...getLocalStorageValue('items'),
    description: getContent(worksData, 'description'),
    bio: getContent(authorsData, 'bio')
  };

  return (
    <>
      <h1 className="styled-book-details-header">Book Details:</h1>
      <div className="styled-book-details-container">
        <div className="styled-book-details-left-container">
          <img
            src={`${BASE_URL_COVERS_OPEN_LIBRARY}/b/id/${data.coverId}-L.jpg`}
            alt={data.coverId}
            loading={'lazy'}
          />
        </div>
        <div className="styled-book-details-right-container">
          <p>
            <span>Title: </span>
            {data.title}
          </p>
          <p>
            <span>First publish year: </span>
            {data.firstPublishYear}
          </p>
          <p>
            <span>Description: </span>
            {data.description}
          </p>
          <p>
            <span>Authors: </span>
            {data.authors}
          </p>
          <p>
            <span>Bio: </span>
            {data.bio}
          </p>
        </div>
      </div>
      <button className="styled-book-details-back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </>
  );
};

export default BookDetails;
