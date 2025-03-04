const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');

const weather_img = document.querySelector('.weather-img');
const location_not_found = document.querySelector('.location-not-found');

const weatherBody = document.querySelector('.weather');


const api_key = "9dc2c32e7cfbed7006016be31c9a790c";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city){

    const response = await fetch(url + city + `&appid=${api_key}`)
    var data = await response.json();

    if(data.cod === `404`){
        location_not_found.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    } else {

        document.querySelector('.description').innerHTML = `${data.weather[0].description}`;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById('humidity').innerHTML = data.main.humidity + "%";
        document.getElementById('wind-speed').innerHTML = data.wind.speed + "km/h";


        switch(data.weather[0].main){
            case 'Clouds':
                weather_img.src = "assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "assets/snow.png";
                break;
        }

        location_not_found.style.display = "none";
        weatherBody.style.display = "flex";

    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
})
