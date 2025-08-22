import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import aside_sign_img from '../../asssets/aside_sign_img.png'
import google from '../../asssets/google.png'
import '../CSS/SignUp.css'
const SignUp = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [formData , setformData] = useState({
    name:"",
    password:"",
    email:""
  });
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]:e.target.value});
  };
  const SignUp = async () =>{
    console.log('sign up function executed',formData)
    let responseData;
    await fetch(`${API_URL}/register`,{
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
      window.location.replace("/Login");
    }else{
      alert(responseData.errors);
    }

  }
  return (
    <div className='signUp'>
      <div className="rightIMG">
        <img src={aside_sign_img} alt="" />
      </div>
      <div className="SignUp">
      <form className='form' onSubmit={(e) => {e.preventDefault(); SignUp()}} >

          <span className='Title_sign_up'>Create  an account</span>
          <p className='details'>Enter your details below</p>
          <input type="text" placeholder='Name'className='input' name='name' value={formData.name} onChange={changeHandler}/>
          <input type="text"  placeholder='Email or Phone Number' name='email'  className='input' value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder='Password' name='password' className='input' value={formData.password} onChange={changeHandler}/>
          <button type='submit' className="create_account">Create Account</button>
          <button className='sign_up_google' onClick={() => window.location.href = 'http://localhost:4000/auth/google'}>
            <i className="google">
            <img src={google} alt="" width={"30px"} height={"25px"} />
            </i>
            Sign up with Google
          </button>
          <span className='confirm'>Already Have an Account ? <Link to={"/Login"}>
          <span className='login'>Login</span>
          </Link>
          </span>
        </form>
       
      </div>
    </div>
  )
}

export default SignUp
