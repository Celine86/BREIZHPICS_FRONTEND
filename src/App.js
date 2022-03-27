import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pics from './components/Pics';
import Pic from './components/Pic';
import Signup from './components/Signup';
import Login from './components/Login';
import Myprofil from './components/Myprofil';
import Modifymyemail from './components/Modifymyemail';
import Modifymypassword from './components/Modifymypassword';
import Modifymyaccount from './components/Modifymyaccount';
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
          <Route path="/pics" element ={<Pics />}/>
          <Route path="/pic" element ={<Pic />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/myprofil" element={<Myprofil />}/>
          <Route path="/myprofil/modify/email/:id" element={<Modifymyemail />}/>
          <Route path="/myprofil/modify/pswd/:id" element={<Modifymypassword />}/>
          <Route path="/myprofil/modify/account/:id" element={<Modifymyaccount />}/>
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </div>
        <Footer />
    </div>
  );
}

export default App;
