import './App.css'
import { Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Pics from './components/Pics'
import Pic from './components/Pic'
import PostPic from './components/PostPic'
import Signup from './components/Signup'
import Login from './components/Login'
import Myprofil from './components/Myprofil'
import Modifymyemail from './components/Modifymyemail'
import Modifymypassword from './components/Modifymypassword'
import Modifymyaccount from './components/Modifymyaccount'
import Error404 from './components/Error04'
import Header from './components/Header'
import Footer from './components/Footer'
import NotLoggedIn from './components/NotLoggedIn'
import NotAllowed from './components/NotAllowed'
import Dashboard from './components/Dashboard'
//import PicsToValidate from './components/PicsToValidate'
//import ReportedPics from './components/ReportedPics'
import ModifyPic from './components/ModifyPic'
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
            <Route exact path="/pic/:id" element ={<Pic />} />
            <Route exact path="/pic/postpic" element = {<PostPic />} />
            <Route exact path="/pic/postpic/:id" element = {<PostPic />} />
            <Route exact path="/myprofil" element={<Myprofil />}/>
            <Route exact path="/myprofil/modify/email/:id" element={<Modifymyemail />}/>
            <Route exact path="/myprofil/modify/pswd/:id" element={<Modifymypassword />}/>
            <Route exact path="/myprofil/modify/account/:id" element={<Modifymyaccount />}/>
            <Route exact path='/dashboard' element={<Dashboard />}/>
            <Route exact path="/modifypic/:id" element={<ModifyPic />}/>
            { /* <Route exact path='/dashboard/picstovalidate' element={<PicsToValidate />}/>
            <Route exact path='/dashboard/reportedpics' element={<ReportedPics />}/> */ }
            <Route exact path="/notallowed" element={<NotAllowed />}/>
          </Route>
        </Routes>
      </div>
        <Footer />
    </div>
  )
}

export default App
