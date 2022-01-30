import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Myprofil from './components/Myprofil';
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
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/myprofil" element={<Myprofil />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </div>
        <Footer />
    </div>
  );
}

export default App;
