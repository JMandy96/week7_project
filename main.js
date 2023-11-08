const clientId = '6529d47bf168f78ad779cbf82d7ccccf'

const cityGeocode = async(cityName, stateCode, countryCode, clientId) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${clientId}&units=imperial`)
    const data = await response.json();
    return data;
}

const zipGeocode = async(zipCode, countryCode, clientId) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${clientId}&units=imperial&units=imperial`)
    const data = await response.json();
    return data;
}

const getToken = async(lat, lon, limit, clientId) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${clientId}&units=imperial&units=imperial`);
    const data = await response.json();
    return data;
}

const formEl = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');


formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const areaWeather = locationInput.value;
    
    try {


       
        const data = await weatherData(areaWeather);
        const weather = data.weather[0];
        const main = data.main;
        const wind = data.wind;
        

        const unixTimeOfDay = data.dt
        // conver unix time into milliseconds
        const milliTimeOfDay = unixTimeOfDay * 1000
        // converts the milliseconds into a date format.
        const timeOfDay = new Date(milliTimeOfDay)
        // tolocaletimestring converts a date into a string of the time.
        const timeString = timeOfDay.toLocaleTimeString()

        const unixSunrise = data.sys.sunrise
        const milliSunrise = unixSunrise * 1000
        const sunrise = new Date(milliSunrise)
        const sunriseString = sunrise.toLocaleTimeString()

        const unixSunset = data.sys.sunset
        const milliSunset = unixSunset * 1000
        const sunset = new Date(milliSunset)
        const sunsetString = sunset.toLocaleTimeString()

        const isDay = () => {
            //getTime represents time as milliseconds since a specific date so it can compare times.
            const currentTime = new Date().getTime();
            return currentTime >= sunrise.getTime() && currentTime < sunset.getTime();
          };
          
          const dayorNight = isDay() ? 'Day' : 'Night';
        
        document.body.id = `${weather.main}-${dayorNight}`;

        weatherResult.innerHTML = `
            <h2> Weather in ${data.name}, ${data.sys.country}<h2>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.main} - ${weather.description}">
            <ul>
                <li><strong>Weather:</strong>${weather.main} - ${weather.description}</li>
                <li><Strong>Clouds:</strong> ${data.clouds.all}%</li>
                <li><strong>Day or night:</strong> ${dayorNight}</li
                <li><strong>Time of Day:</strong> ${timeString}</li>
                <li><strong>Sunrise:</strong> ${sunriseString}</li>
                <li><strong>Sunset:</strong> ${sunsetString}</li>
                <li><strong>Temperature:</strong> ${main.temp}°F</li>
                <li><strong>Feels Like:</strong> ${main.feels_like}°F</li>
                <li><strong>Min Temperature:</strong> ${main.temp_min}°F</li>
                <li><strong>Max Temperature:</strong> ${main.temp_max}°F</li>
                <li><strong>Pressure:</strong> ${main.pressure} hPa</li>
                <li><strong>Humidity:</strong> ${main.humidity}%</li>
                <li><strong>Wind Speed:</strong> ${wind.speed} m/s</li>
            </ul>`;
    } catch (error) {
        console.error(error);
        weatherResult.textContent = 'Error fetching weather data';
    }
});

const weatherData = async (area= 'Washington Township') => {
    let apiUrl = '';
    
        apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${clientId}&units=imperial`;


    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
};


const defaultWeather = async () => {
    
    try {

        const randomLat = Math.random() * (180) - 90; 
        const randomLon = Math.random() * (360) - 180;
        
        const data = await weatherDataByCoordinates(randomLat, randomLon);
        const weather = data.weather[0];
        const main = data.main;
        const wind = data.wind;
        console.log()

        const unixTimeOfDay = data.dt
        const milliTimeOfDay = unixTimeOfDay * 1000
        const timeOfDay = new Date(milliTimeOfDay)
        const timeString = timeOfDay.toLocaleTimeString()

        const unixSunrise = data.sys.sunrise
        const milliSunrise = unixSunrise * 1000
        const sunrise = new Date(milliSunrise)
        const sunriseString = sunrise.toLocaleTimeString()

        const unixSunset = data.sys.sunset
        const milliSunset = unixSunset * 1000
        const sunset = new Date(milliSunset)
        const sunsetString = sunset.toLocaleTimeString()

        const isDay = () => {
            const currentTime = new Date().getTime();
            return currentTime >= sunrise.getTime() && currentTime < sunset.getTime();
          };
          
          const dayorNight = isDay() ? 'Day' : 'Night';

        document.body.id = `${weather.main}-${dayorNight}`;
          weatherResult.innerHTML = `
          <h2> Weather in ${data.name}, ${data.sys.country} </br>Latitude:${randomLat}</br> Longitude: ${randomLon}<h2>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.main} - ${weather.description}">
          <ul>
              <li><strong>Weather:</strong>${weather.main} - ${weather.description}</li>
              <li><Strong>Clouds:</strong> ${data.clouds.all}%</li>
              <li><strong>Day or night:</strong> ${dayorNight}</li
              <li><strong>Time of Day:</strong> ${timeString}</li>
              <li><strong>Sunrise:</strong> ${sunriseString}</li>
              <li><strong>Sunset:</strong> ${sunsetString}</li>
              <li><strong>Temperature:</strong> ${main.temp}°F</li>
              <li><strong>Feels Like:</strong> ${main.feels_like}°F</li>
              <li><strong>Min Temperature:</strong> ${main.temp_min}°F</li>
              <li><strong>Max Temperature:</strong> ${main.temp_max}°F</li>
              <li><strong>Pressure:</strong> ${main.pressure} hPa</li>
              <li><strong>Humidity:</strong> ${main.humidity}%</li>
              <li><strong>Wind Speed:</strong> ${wind.speed} m/s</li>
          </ul>`;
  } catch (error) {
      console.error(error);
      weatherResult.textContent = 'Error fetching weather data';
  }
};

const weatherDataByCoordinates = async (lat, lon) => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${clientId}&units=imperial`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
};

window.addEventListener('load', defaultWeather)
    