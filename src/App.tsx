import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './components/Container/Container';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MediaReader from './pages/MediaReader/MediaReader';

function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/reader' element={<MediaReader/>} />
          <Route path='/*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
