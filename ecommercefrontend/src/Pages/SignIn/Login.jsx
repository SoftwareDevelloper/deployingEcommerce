import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import aside_sign_img from '../../asssets/aside_sign_img.png'
import '../CSS/Login.css'
const Login = () => {
  const [formData , setformData] = useState({
  
    password:"",
    email:""
  });
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]:e.target.value});
  };
  const SignUp = async () =>{
    if( !formData.email || !formData.password ){
      alert("Please  fill all fields");
      return;
    }
    console.log('sign up function executed',formData)
    let responseData;
    await fetch('http://localhost:4000/Login',{
      method:"POST",
      headers:{
        Accept: 'application/json',
        'Content-type':'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data)=> responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors);
    }

  }
   // with google 
   useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('auth-token', token);
      window.location.href = '/'; // redirect after login
    }
    }, []);

  return (
    <div className='Login'>
           <div className="rightIMG">
        <img src={aside_sign_img} alt="" />
      </div>
      <div className="SignIn">
        <form className='form'  onSubmit={(e) => {e.preventDefault(); SignUp()}}  >
          <span className='Title_sign_in'>Login to your account</span>
          <p className='detail'>Enter your details below</p>
          <input type="text"  placeholder='Email or Phone Number' name='email'  className='input' value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder='Password'name='password'  className='input' value={formData.password} onChange={changeHandler}/>
          <button type='submit' className="Loginbtn">Sign In</button>
          <span className='confirm'>Don't Have an Account ? <Link to={"/Register"}>
          <span className='createAccount'>Create Account</span>
          </Link>
          </span>
        </form>
       
      </div>
    </div>
  )
}

export default Login
