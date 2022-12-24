import BookItem from '../BookItem';
import './bookList.scss';

const BookList = ({ books }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>First publish year</th>
        </tr>
      </thead>
      {books.map((book) => {
        const { key, title, author_name, first_publish_year, cover_i, author_key } = book;
        return (
          <BookItem
            key={key}
            work={key}
            title={title}
            authors={author_name}
            firstPublishYear={first_publish_year}
            authorId={author_key}
            coverId={cover_i}
          />
        );
      })}
    </table>
  );
};

export default BookList;
