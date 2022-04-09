import React from 'react'
import { Link } from 'react-router-dom'
import './SignUp.css'

function SignUp() {
  return (
    <div className='signUp'>
         <div className="signUpTitle">Sign Up</div>
       <div className="signUpForm">
              <input type="text" placeholder='Name' />
              <input type="Email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <input type="password" placeholder='ConfirmPassword' />
              <button className="submit">Submit</button>
              <p>Already have an Acount <Link to='/login'>Login</Link></p>
         </div>
    </div>
  )
}

export default SignUp
