import React from 'react'
import Google from '../../images/google.png'
import Facebook from '../../images/facebook.png'
import './Login.css'

function Login() {
  return (
    <div className='login'>
      <div className="loginTitle">Choose a Login Method</div>
       <div className="wrapper">
         <div className="left">
           <div className="loginButton google">
             <img src={Google} alt="Google" className='icon' />
             Google
           </div>
           <div className="loginButton facebook">
             <img src={Facebook} alt="Facebook" className='icon' />
             Facebook
           </div>
         </div>
         <div className="center">
           <div className="line"/>
           <div className="or">OR</div>
         </div>
         <div className="right">
              <input type="Email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <button className="submit">Submit</button>
         </div>
       </div>
    </div>
  )
}

export default Login
