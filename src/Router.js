import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BookDetails from './components/BookDetails';
import Message from './components/Message';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="works/:id" element={<BookDetails />}></Route>
        <Route path="/" element={<App />}></Route>
        <Route path="*" element={<Message message={'404'} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
