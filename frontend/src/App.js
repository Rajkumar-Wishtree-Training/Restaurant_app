import './App.css';
import Navbar from './component/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import store from './redux/store';
import SignUp from './pages/signup/SignUp';
import {positions , transitions , Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout : 5000,
  position : positions.BOTTOM_CENTER,
  transition : transitions.SCALE 
}
function App() {
  let user = true
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <>
          <Navbar user={user} />
          <Routes>
            <Route exact path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route exact path='/:keyword' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route exact path='/login' element={user ? <Navigate to='/' /> : <Login />} />
            <Route exact path='/signup' element={user ? <Navigate to='/' /> : <SignUp />} />
          </Routes>
        </>
      </BrowserRouter>
      </AlertProvider>
    </Provider>
  );
}

export default App;
