import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Result.css';

const Result = () => {
    // handle login
    const navigate = useNavigate();
    useEffect(() => {
        checkAuth();
    }, []);
    const checkAuth = async () => {
        const token = JSON.parse(localStorage.getItem('login'))?.token;
        if (!token) {
            navigate('/');
        } else {
            try {
                const response = await axios.get('https://weather-app-assignment-pxu2.vercel.app/verify', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!response.data.valid) {
                    navigate('/');
                }
            } catch (err) {
                console.error(`ERROR: ${err.message}`);
                navigate('/');
            }
        }   
    };
    // HANDLE LOGOUT : 
    const handleLogout = async () => {
        try {
          const response = axios.post("https://weather-app-assignment-pxu2.vercel.app/logout", {}, {
            headers: {
              Authorization :` Bearer ${JSON.parse(localStorage.getItem('login'))?.token}`
            }
          });
          console.log('LOGOUT REQUEST SENT TO SERVER') ;  
          navigate(response.data.redirect) ; 
        } catch (error) {
          console.error(`ERROR: ${err.message}`) ; 
          navigate("/") ; 
        } finally{
          localStorage.removeItem('login') ;
          navigate("/") ; 
        }
    }

 // HANDLE CITY
  // make a variable here along with its usestate that will con
   // Handle city data and forecast
   const [city, setCity] = useState('');
   const [cityData, setCityData] = useState({});
   const [forecastData, setForecastData] = useState([]);
 
   const handleCity = async (e) => {
     e.preventDefault();
     const obj = { city };
     try {
       const response = await axios.post("https://weather-app-assignment-pxu2.vercel.app/get", obj);
       if (response.data) {
         const { current, forecast } = response.data;
 
         // Process current weather data
         const currentWeather = {
           name: current.name,
           temp: `${(current.main.temp - 273.15).toFixed(2)}°C`,
           weather: `${current.weather[0].description}`,
           date:` ${new Date(current.dt * 1000).toLocaleDateString()}`
         };
         setCityData(currentWeather);
 
         // Process forecast data
         const forecastList = forecast.map(item => {
           const date = new Date(item.dt * 1000).toLocaleDateString();
           return {
             temp:` ${(item.main.temp - 273.15).toFixed(2)}°C`,
             weather: `${item.weather[0].description}`,
             date
           };
         });
         setForecastData(forecastList);
       } 
       else {
         setCityData('NOTHING TO DISPLAY');
         setForecastData([]);
       }
     } catch (error) {
       console.error('Error fetching weather data:', error.message);
       alert(`PLEASE ENTER A VALID CITY OR COUNTRY NAME ,\n${error.message}`);
       setCityData('NOTHING TO DISPLAY');
       setForecastData([]);
     }
   };
  




    return (
        <>

        <div className='body'>
            <div className="navigation"><h1>WEATHER APP</h1><button onClick={handleLogout} className='Logout'>Logout</button></div>
            <div className="display">
                    <div className="box2">
                    <form onSubmit={handleCity} className='form2'>
                        <input type="text"className='input1' value={city} onChange={(e) => setCity(e.target.value)}  placeholder="Enter city/country name" />
                        <button className='button1' type='submit'>SUBMIT</button>
                    </form>
                    {forecastData.length > 0 && (
                        <div className='days'>
                        {forecastData.map((item, index) => (
                            <div className="items_multiple" key={index}>
                            {/* image here  */}
                            <h3>{item.temp}</h3>
                            <h3>{item.weather}</h3>
                            <h3>{item.date}</h3>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
            </div>
        </div>
        </>
    );
}

export default Result;