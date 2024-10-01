import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios' ; 

const Signup = () => {
  const [name, set_S_Name] = useState('');
  const [email, set_S_Email] = useState('');
  const [password, set_S_Password] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignupSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    const obj = { name, email, password };
    try {
      const response = await axios.post("https://weather-app-assignment-pxu2.vercel.app/signup", obj); // Fix URL typo
      if (response.data.bool) {
        alert("USER CREATED SUCCESSFULLY! PLEASE LOGIN");
        navigate(response.data.redirect); // Use navigate instead of Navigate
      } else {
        alert("USER ALREADY EXISTS! PLEASE LOGIN");
        navigate(response.data.redirect); // Use navigate
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      alert(`TRY SIGNUP AGAIN: ${err.message}`);
    }
  };
  

  const routeHome = () => {
    navigate("/"); // Navigate to Signup page
  };
  return (
    <div className='SIGNUP_DIV'>
        <h1 onClick={routeHome}>WEATHER APP</h1>
        <form onSubmit={handleSignupSubmit} className='SGINUP_FORM'>
            <h2>SIGN UP </h2>
            <div><label><h3>NAME </h3></label>  <input type="text" value={name} onChange={(e)=> set_S_Name(e.target.value)}/><br /><br /> </div>
            <div><label><h3>EMAIL </h3></label>  <input type="email" value={email} onChange={(e)=> set_S_Email(e.target.value)}/><br /><br /></div>
            <div><label><h3>PASSWORD </h3></label>  <input type="password" value={password} onChange={(e)=> set_S_Password(e.target.value)}/><br /><br /></div>
            <button type='submit' className='Signup'>SUBMIT</button>
        </form>
    </div>
  )
}

export default Signup