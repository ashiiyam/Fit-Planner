function addOutfit() {
    const fileInput = document.getElementById('outfit-upload');
    const closetDiv = document.getElementById('closet');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            closetDiv.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}
function getWeather() {
    const location = document.getElementById('location').value;
    const weatherResult = document.getElementById('weather-result');

    if (!location) {
        weatherResult.innerText = 'Please enter a location.';
        return;
    }

    // OpenWeatherMap API URL
    const apiKey = 'fa07f688030a4224811a5527e1f18055';  // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch weather data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            const temp = data.main.temp;  // Temperature in Celsius
            let suggestion = '';

            // Determine clothing suggestion based on temperature
            if (temp > 20) {
                suggestion = "T-shirt weather";
            } else if (temp > 10) {
                suggestion = "Hoodie weather";
            } else {
                suggestion = "Jacket weather";
            }

            // Display weather result
            weatherResult.innerText = `Temperature: ${temp.toFixed(1)}°C - ${suggestion}`;
        })
        .catch(error => {
            console.error(error);
            weatherResult.innerText = 'Error fetching weather data. Please try again.';
        });
}
