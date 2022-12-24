import { useNavigate } from 'react-router';
import { setLocalStorageValue } from '../../utils';

const BookItem = ({ work, title, authors, firstPublishYear, coverId, authorId }) => {
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    const workId = row.split('/')[2];
    const items = {
      title,
      authors,
      firstPublishYear,
      coverId,
      workId,
      authorId
    };
    setLocalStorageValue('items', JSON.stringify(items));
    navigate(row);
  };
  return (
    <tbody>
      <tr onClick={() => handleRowClick(work)}>
        <td>{title}</td>
        <td>{authors}</td>
        <td>{firstPublishYear}</td>
      </tr>
    </tbody>
  );
};

export default BookItem;
