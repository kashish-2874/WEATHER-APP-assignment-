import React, { useState } from 'react'; // Import necessary hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API calls

const Login = () => {
    const navigate = useNavigate(); // Corrected variable name for navigation
    const [email, set_L_Email] = useState(''); 
    const [password, set_L_Password] = useState(''); 

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        const obj = { email, password }; 
        try {
            const response = await axios.post("https://weather-app-assignment-pxu2.vercel.app/login", obj); // response = {bool,message,token,redirect}
            if (response.data.bool) {
                alert("USER LOGIN SUCCESSFUL"); 
                // Create a localStorage for token
                localStorage.setItem('login', JSON.stringify({ 
                    login: true, 
                    token: response.data.token 
                }));                
                navigate(response.data.redirect); // Navigate to the redirect URL
            } else {
                alert(`${response.data.message}`); // Show the error message from the response
                navigate(response.data.redirect); // Navigate to the redirect URL on failed login
            }
        } catch (error) {
            alert(`${error.message}`); // Show error message
            navigate("/Login"); // Stay on the login page on error
        }
    };

    const routeHome = () => {
        navigate("/"); // Navigate to the home page
    };

    return (
        <div className='LOGIN'>
            <h1 onClick={routeHome}>WEATHER APP</h1>
            <form onSubmit={handleLoginSubmit} className='LOGIN_FORM'>
                <h2>LOGIN FORM</h2>
                <div>
                    <label><h3>EMAIL</h3></label>  
                    <input type="email" value={email} onChange={(e) => set_L_Email(e.target.value)} /><br /><br />
                </div>
                <div>
                    <label><h3>PASSWORD</h3></label>  
                    <input type="password" value={password} onChange={(e) => set_L_Password(e.target.value)} /><br /><br />
                </div>
                <button type='submit' className='Login'>SUBMIT</button>
            </form>
        </div>
    );
};

export default Login;