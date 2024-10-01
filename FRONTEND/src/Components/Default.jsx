import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API calls
import './Default.css';

const Default = () => {
  // Initialize the navigate function
  const navigate = useNavigate();
  
  // Handle city data and forecast
  const [city, setCity] = useState(''); // State for city input
  const [cityData, setCityData] = useState(null); // State for weather data

  const handleCity = async (e) => {
    e.preventDefault(); // Prevent form submission
    const obj = { city };
    
    try {
      const response = await axios.post("https://weather-app-assignment-pxu2.vercel.app/get", obj); // Make API call
      if (response.data) {
        const { current } = response.data;

        // Process current weather data
        const currentWeather = {
          name: current.name,
          temp: `${(current.main.temp - 273.15).toFixed(2)}°C`,
          weather: current.weather[0].description,
          date: new Date(current.dt * 1000).toLocaleDateString()
        };

        setCityData(currentWeather); // Set weather data in state
      } else {
        setCityData('NOTHING TO DISPLAY');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      alert(`PLEASE ENTER A VALID CITY OR COUNTRY NAME,\n${error.message}`);
      setCityData('NOTHING TO DISPLAY');
    }
  };

  const routeSignup = () => {
    navigate("/Signup"); // Navigate to Signup page
  };

  const routeLogin = () => {
    navigate("/Login"); // Navigate to Login page
  };

  return (
    <>
      <div className="body">
        <div className="navigation">
          <h1>WEATHER APP</h1>
          <button onClick={routeSignup}>SIGNUP</button>
          <button onClick={routeLogin}>LOGIN</button>
        </div>
        <div className="box1">
          <form onSubmit={handleCity} className='form1'>
            <input
              type="text"
              className='input1'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city/country name"
            />
            <button type='submit' className='button1'>SUBMIT</button>
          </form>

          <div className="items_singular">
            {/* Only render city data if available */}
            {cityData ? (
              <>
                <h3>{cityData.name}</h3>
                <h3>{cityData.temp}</h3>
                <h3>{cityData.weather}</h3>
                <h3>{cityData.date}</h3>
              </>
            ) : (
              <h3>NOTHING TO DISPLAY</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Default;