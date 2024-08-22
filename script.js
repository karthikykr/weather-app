const apiKey = "ed9ddefae3e6293ec864befe742ea236";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const img = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    if (data.cod == 200) {

        const code = data.weather[0].id.toString();
        if (code.startsWith("2")) {
            img.src = 'images/thunderstorm.png';
        } else if (code.startsWith("3")) {
            img.src = 'images/drizzle.png';
        } else if (code.startsWith("5")) {
            img.src = 'images/rain.png';
        } else if (code.startsWith("6")) {
            img.src = 'images/snow.png';
        } else if (code.startsWith("7")) {
            img.src = 'images/mist.png';
        } else if (code === "800") {
            img.src = 'images/clear.png';
        } else if (code.startsWith("80")) {
            img.src = 'images/clouds.png';

        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    } else {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

checkWeather("new york")

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        checkWeather(searchBox.value);
    }
})