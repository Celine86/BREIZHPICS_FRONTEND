import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Pics from './components/Pics';
import Pic from './components/Pic';
import HandlePic from './components/HandlePic';
import Signup from './components/Signup';
import Login from './components/Login';
import Myprofil from './components/Myprofil';
import Modifymyemail from './components/Modifymyemail';
import Modifymypassword from './components/Modifymypassword';
import Modifymyaccount from './components/Modifymyaccount';
import Error404 from './components/Error04';
import Header from './components/Header';
import Footer from './components/Footer';
import NotLoggedIn from './components/NotLoggedIn';
import NotAllowed from './components/NotAllowed';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
    <div>
        <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/pics" element ={<Pics />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<Error404 />}/>
          <Route path="/notloggedin" element={<NotLoggedIn />}/>
          <Route exact element={<PrivateRoute />}>
            <Route path="/pic/:id" element ={<Pic />} />
            <Route exact path="/pic/handle" element = {<HandlePic />} />
            <Route path="/pic/handle/:id" element = {<HandlePic />} />
            <Route path="/myprofil" element={<Myprofil />}/>
            <Route path="/myprofil/modify/email/:id" element={<Modifymyemail />}/>
            <Route path="/myprofil/modify/pswd/:id" element={<Modifymypassword />}/>
            <Route path="/myprofil/modify/account/:id" element={<Modifymyaccount />}/>
            <Route path='/Dashboard' element={<Dashboard />}/>
            <Route path="/notallowed" element={<NotAllowed />}/>
          </Route>
        </Routes>
      </div>
        <Footer />
    </div>
  );
}

export default App;
