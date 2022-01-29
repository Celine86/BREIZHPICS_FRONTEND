import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';
import Error404 from './components/Error04';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div>
        <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </div>
        <Footer />
    </div>
  );
}

export default App;
