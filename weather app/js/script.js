document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let currentHash = window.location.hash || '#home';
        navLinks.forEach((link) => {
            link.classList.remove('active');

            if (link.getAttribute("href") === currentHash) {
                link.classList.add('active');
            }
        })
    }

    setActiveLink();

    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navLinks.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');
        })
    })

    window.addEventListener("hashchange", setActiveLink)
});

document.getElementById("mode").addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    console.log(document.body.dataset.theme);
    document.getElementById("navbar-icon").src = document.body.dataset.theme === 'light' ? "images/favicon.png" : "images/favicon-dark.png";
});

const inputCity = document.getElementById("city-input").value;

const API_KEY = 'e316d97803414789b39102025253006';


async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;
    document.getElementById("city-name").innerHTML = city;
    try {
        const response = await fetch(url);
        const data = await response.json();

        const days = data.forecast.forecastday;

        // Date, Chance of Rain, Max Wind Speed, and Average Humidity for today
        document.getElementById("date").innerHTML = days[0].date;
        document.getElementById("chance-of-rain").innerHTML = days[0].day.daily_chance_of_rain + "%";
        document.getElementById("wind-speed").innerHTML = days[0].day.maxwind_kph + "km/h";
        document.getElementById("humidity").innerHTML = days[0].day.avghumidity + "%";

        // Today's date, weather condition and current time
        document.getElementById("current-time").innerHTML = data.location.localtime.slice(-5);
        document.getElementById("today-temp").innerHTML = data.current.temp_c + "°C";
        document.getElementById("weather-type").innerHTML = data.current.condition.text;

        // Welcome message based on time of day
        document.getElementById("welcome-msg").innerHTML = (data.current.is_day === 0) ? "Good Evening" : "Good Morning";


        for (let i = 0; i < 3; i++) {
            const date = days[i].date;
            const maxTemp = days[i].day.maxtemp_c;
            const minTemp = days[i].day.mintemp_c;
            const condition = days[i].day.condition.text;

            let dayElement;
            if (i === 0) {
                dayElement = document.querySelector(".day-0");
            } else if (i === 1) {
                dayElement = document.querySelector(".day-1");
            } else {
                dayElement = document.querySelector(".day-2");
            }
            dayElement.querySelector(".temp-max").innerHTML = maxTemp + "°C";
            dayElement.querySelector(".temp-min").innerHTML = minTemp + "°C";
            dayElement.querySelector("h6.weather-subtitle").innerHTML = condition;

        }

        // document.querySelector(".three-day-forecast .day-forecast .today div h4.weather-temp .temp-max").innerHTML =
        //     data.forecast.forecastday[0].day.maxtemp_c;
        // document.querySelector(".three-day-forecast .day-forecast .today div h4.weather-temp .temp-min").innerHTML =
        //     data.forecast.forecastday[0].day.mintemp_c;
    } catch (error) {
        console.log(error);
    }
}

getWeather("Cairo");