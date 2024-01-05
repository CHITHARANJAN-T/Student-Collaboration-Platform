// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserLogin from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import StudHome from './components/StudHome';
import StudFriends from './components/StudFriends';
import StudProjects from './components/StudProjects';
import ProtectedLogin from './components/ProtectedLogin';
import ErrorPage from './components/ErrorPage';
import TeacherDashboard from './components/TeacherDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import Dashboard from './components/Dashboard';
// import Dashboard from './components/dashboard/Dashboard';

function App() {
  // const [username,setUsername] = useState("");

  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<ProtectedLogin element={<UserLogin/>}/>}/> */}
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/adminlogin' element={<Login/>}/>
        <Route path="/userlogin" element={<UserLogin/>}/>
        <Route path='/admin/*' element={<ProtectedLogin  element={<AdminDashboard/>} />}/>
        <Route path='/student/*' element={ <ProtectedLogin  element={<StudentDashboard/>} />}/>
        <Route path='/teacher/*' element={ <ProtectedLogin  element={<TeacherDashboard/>} />}/>


        
        <Route path='*' element={<ProtectedLogin element={<UserLogin/>} />} />
        
      </Routes>
    </BrowserRouter>
  );
}



export default App;
