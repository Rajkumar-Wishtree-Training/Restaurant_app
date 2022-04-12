import React , { useState , useEffect } from "react";
import Google from "../../images/google.png";
import Facebook from "../../images/facebook.png";
import { useDispatch , useSelector } from "react-redux";
import "./Login.css";
import { loginUser } from "../../redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors } from "../../redux/actions/authAction";

const initialState = {
  'email' : '',
  'password' : ''
}
function Login() {
  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {error ,  isAuthenticated, data } = useSelector(state => state.userDetails)
  const [form, setForm] = useState(initialState);

  const onChangeHandler = (e) =>  setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(form))
    } catch (error) {
      
    }
    
  };
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    if(isAuthenticated && data.role !== 'admin'){
      return navigate('/')
    }
    if(data.role === 'admin' && isAuthenticated){
      return navigate('/admin/dashboard')
    }
  },[error , alert , dispatch , data.role , isAuthenticated , navigate])
  return (
    <div className="login">
      <div className="loginTitle">Choose a Login Method</div>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google">
            <img src={Google} alt="Google" className="icon" />
            Google
          </div>
          <div className="loginButton facebook">
            <img src={Facebook} alt="Facebook" className="icon" />
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <form onSubmit={onSubmitHandler}>
            <input type="Email" name="email" placeholder="Email" onChange={onChangeHandler} />
            <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />
            <button className="submit">Submit</button>
            <p>Don't have an account <Link to='/signup'>Sign Up</Link>  </p>
          </form>
         
        </div>
      </div>
    </div>
  );
}

export default Login;
