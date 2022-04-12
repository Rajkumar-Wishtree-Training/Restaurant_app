import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors, signUpUser } from '../../redux/actions/authAction'
import { useAlert } from 'react-alert'
import './SignUp.css'

const intialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}
function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const [form, setForm] = useState(intialValues)

  const onChangeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const { error, isAuthenticated } = useSelector(state => state.userDetails)
  const onSubmitHandler = (e) => {
    try {
      e.preventDefault();
      dispatch(signUpUser(form))
    } catch (error) {

    }
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error)
      dispatch(clearErrors())
    }
    if(isAuthenticated){
      return navigate('/')
    }
  }, [error, alert, dispatch , isAuthenticated , navigate])
  return (
    <div className='signUp'>

      <div className="signUpForm">
        <form onSubmit={onSubmitHandler}>
          <div className="signUpTitle">Sign Up</div>
          <input type="text" name='name' placeholder='Name' onChange={onChangeHandler} />
          <input type="Email" name='email' placeholder='Email' onChange={onChangeHandler} />
          <input type="password" name='password' placeholder='Password' onChange={onChangeHandler} />
          <input type="password" name='confirmPassword' placeholder='ConfirmPassword' onChange={onChangeHandler} />
          <button className="submit">Submit</button>
          <p>Already have an Acount <Link to='/login'>Login</Link></p>
        </form>

      </div>
    </div>
  )
}

export default SignUp
