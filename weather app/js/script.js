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
    document.getElementById("hours-carousel").classList.toggle("carousel-dark");
    console.log(document.body.dataset.theme);
    document.getElementById("navbar-icon").src = document.body.dataset.theme === 'light' ? "images/favicon.png" : "images/favicon-dark.png";
});

const API_KEY = 'e316d97803414789b39102025253006';

function getWeekDay(dateString, index) {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {weekday: "long"});
}

function renderHourlyCarousel(hours) {
    const carouselInner = document.querySelector(".carousel-inner");
    carouselInner.innerHTML = "";

    const hoursPerSlide = 6;
    const totalSlides = 4;

    for (let i = 0; i < totalSlides; i++) {
        const start = i * hoursPerSlide;
        const end = start + hoursPerSlide;
        const slideHours = hours.slice(start, end);

        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${i === 0 ? "active" : ""}`;

        const container = document.createElement("div");
        container.className = "container-fluid mt-3 hourly-forecast";

        const row = document.createElement("div");
        row.className = "row d-flex justify-content-center align-items-center w-100 flex-wrap";

        slideHours.forEach(hour => {
            const col = document.createElement("div");
            col.className = "col-md-3 hour-forecast text-center";

            const time = new Date(hour.time).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
            col.innerHTML = `
                <h6 class="hour">${time}</h6>
                <h4 class="weather-temp">${hour.temp_c}°C</h4>
                <h6 class="weather-subtitle">${hour.condition.text}</h6>
            `;
            row.appendChild(col);
        });

        container.appendChild(row);
        carouselItem.appendChild(container);
        carouselInner.appendChild(carouselItem);
    }
}

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        const days = data.forecast.forecastday;
        const hours = data.forecast.forecastday[0].hour;
        renderHourlyCarousel(hours);
        document.getElementById("city-name").innerHTML = data.location.name + ", " + data.location.country;

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
            const weekday = getWeekDay(date, i);

            let dayElement;
            if (i === 0) {
                dayElement = document.querySelector(".day-0");
            } else if (i === 1) {
                dayElement = document.querySelector(".day-1");
                document.getElementById("tomorrow").innerHTML = weekday;
            } else {
                dayElement = document.querySelector(".day-2");
                document.getElementById("after-tomorrow").innerHTML = weekday;
            }
            dayElement.querySelector(".temp-max").innerHTML = maxTemp + "°C";
            dayElement.querySelector(".temp-min").innerHTML = minTemp + "°C";
            dayElement.querySelector("h6.weather-subtitle").innerHTML = condition;

        }


    } catch (error) {
        alert("An error occurred while fetching weather data. Please try again later.")
        document.getElementById("city-input").value = "";
        console.log(error);
    }
}

window.addEventListener("load", () => {
    getWeather("Cairo");
})

document.querySelector(".btn.btn-primary").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    }

})