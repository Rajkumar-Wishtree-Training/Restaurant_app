import './App.css';
import Navbar from './component/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  let user = true
  return (
    <BrowserRouter>
      <>
        <Navbar  user={user}/>
        <Routes>
          <Route exact path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>
          <Route exact path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
