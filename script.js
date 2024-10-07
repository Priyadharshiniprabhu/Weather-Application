const apiKey = '70bcf74ca6138e62bfcfe00ce7d6e89e';
document.getElementById('get-weather').addEventListener('click', getWeatherByLocation);
document.getElementById('current-location').addEventListener('click', getWeatherByCurrentLocation);

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
        });
}
