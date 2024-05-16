// Selecting elements from the DOM
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Function to fetch weather data from OpenWeatherMap API
async function checkWeather(city){
    // API key and URL for fetching weather data
    const api_key = "1092cad75cea52c4a89515e09d98485e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    // Fetching weather data and converting response to JSON
    const weather_data = await fetch(`${url}`).then(response => response.json());
     // Handling case where location is not found
    if(weather_data.cod === '404'){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
    // Displaying weather information

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Updating weather information in the UI

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    // Updating weather image based on weather conditions

    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity} %`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds': 
            console.log("Cloudy weather detected.");
            weather_img.src = "/assets/cloud.png";
            break;
            case 'Clear': 
                weather_img.src = "/assets/clear.png";
                break;
            case 'Rain': 
                weather_img.src = "/assets/rain.png";
                break;
            case 'Mist': 
                weather_img.src = "/assets/mist.png";
                break;
            case 'Snow': 
                weather_img.src = "/assets/Snow.png";
                break;
    }
}

// Event listener for search button click


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
