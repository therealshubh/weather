import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchicon from '../assets/search.png';
import sun from '../assets/sun.png';
import wind from '../assets/wind.png';
import humidity from '../assets/humidity.png';
import cloud from '../assets/cloud.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy-day.png';
import lightning from '../assets/dark-and-stormy.png';
import snow from '../assets/snowflake.png';
import mist from '../assets/fog.png';



const allIcon = {
  "01d": sun,
  "01n": sun,
  "02d": cloudy,
  "02n": cloudy,
  "03d": cloud,
  "03n": cloud,
  "04d": cloud,
  "04n": cloud,
  "09d": rainy,
  "09n": rainy,
  "10d": rainy,
  "10n": rainy,
  "11d": lightning,
  "11n": lightning,
  "13d": snow,
  "13n": snow,
  "50d": mist,
  "50n": mist,

}

const Weather = () => {
  const inputref = useRef()
  const [weatherData, setWeatherData] = useState("false")
  
  const search = async (city) => {
    if(city === ""){
      alert("Please Enter the city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`;
      const res = await fetch(url);
      const data = await res.json();

      if(!res.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcon[data.weather[0].icon] || sun

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      setWeatherData(false)
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder='Search' />
        <img src={searchicon} alt='search-icon' onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} className='weather-icon' alt="Weather" />
        <p className='temp'>{weatherData.temperature}°c</p>
        {/* <p className='temp'>20°c</p> */}
        <p className='location'>{weatherData.location}</p>
        {/* <p className='location'>Delhi</p> */}
        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              {/* <p>20%</p> */}
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind} alt="" />
            <div>
              <p>{weatherData.windspeed} km/h</p>
              {/* <p>20 km/h</p> */}
              <span>Wind speed</span>
            </div>
          </div>
        </div> 
      </>:<></>}
    </div>
  );
};

export default Weather;
