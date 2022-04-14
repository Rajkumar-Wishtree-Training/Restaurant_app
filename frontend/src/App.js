import './App.css';
import Navbar from './component/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Dashboard from './component/Admin/Dashboard.js'
import MenuList from './component/Admin/MenuList.js'
import CreateItem from './component/Admin/CreateItem.js'
import UpdateItem from './component/Admin/UpdateItem.js'
import {  Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './pages/signup/SignUp';
import PageNotFound from './pages/PageNotFound/PageNotFound.js'

import { useSelector} from 'react-redux';
import { useEffect } from 'react'
import store from './redux/store'
import { loadUser } from './redux/actions/authAction';
// import { useAlert } from 'react-alert';


function App() {
  // const navigate = useNavigate()
  // const alert = useAlert()
  // const dispatch = useDispatch()
  const { data,  isAuthenticated } = useSelector(state => state.userDetails)

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
      <>
        <Navbar isAuthenticated={isAuthenticated} data={data} />
        <Routes>
          <Route exact path='/' element={isAuthenticated ? <Home /> : <Navigate to='/login'/>} />
          <Route exact path='/:keyword' element={isAuthenticated ? <Home /> : <Navigate to='/login'/>} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
           {/* Admin Routes */}
          <Route exact path='/admin/dashboard' element={isAuthenticated ? <Dashboard/> : <Navigate to='/login'/>}/>
          <Route exact path='/admin/menuitems' element={(isAuthenticated && data.role === 'admin')? <MenuList/> : <Navigate to='/login'/>} />
          <Route exact path='/admin/menu/new' element={(isAuthenticated && data.role === 'admin') ? <CreateItem/> : <Navigate to='/login'/>} />
          <Route exact path='/admin/menu/:id' element={(isAuthenticated && data.role === 'admin') ? <UpdateItem/> : <Navigate to='/login'/>} />
          <Route exact path='/admin/users' element={(isAuthenticated && data.role === 'admin')? <Dashboard /> : <Navigate to='/login'/>} />

          <Route path='*' element={<PageNotFound/>}/>

        </Routes>
      </>
  );
}

export default App;
