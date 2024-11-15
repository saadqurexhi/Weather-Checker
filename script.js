// OpenWeather API key
const apiKeyWeather = '73869f9ba62d1b03d1993ebcce2583c0';
// Unsplash API key (Access Key)
const apiKeyUnsplash = '0goPuwqoYFYWYmbooZInDEl2Nvf8SKUCLqjubjjaFfQ';

// Function to fetch weather data and display weather information
function getWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Weather API Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const weatherCondition = data.weather[0].main.toLowerCase(); // e.g., "clouds", "rain", "clear"

      // Display the weather information
      document.getElementById('weatherDisplay').innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
      `;

      // Get background image based on the weather condition
      getBackgroundImage(weatherCondition);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      document.getElementById('weatherDisplay').innerHTML = "Could not load weather data.";
    });
}

// Function to fetch background image from Unsplash based on weather condition
function getBackgroundImage(weatherCondition) {
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${weatherCondition}&client_id=${apiKeyUnsplash}`;

  fetch(unsplashUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Unsplash API Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Set the background image to the URL from the Unsplash API
      document.getElementById("weatherDisplay").style.backgroundImage = `url(${data.urls.regular})`;
      document.getElementById("weatherDisplay").style.backgroundSize = "cover";
      document.getElementById("weatherDisplay").style.color = "#fff"; // Text color for readability
    })
    .catch(error => {
      console.error("Error fetching background image:", error);
      document.getElementById("weatherDisplay").style.backgroundColor = '#333';
      document.getElementById("weatherDisplay").textContent += "\nCould not load background image.";
    });
}

// Event listener for city selection or search
document.getElementById('cityForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('cityInput').value;
  getWeather(city);
});

// Initial call for a default city
getWeather("Islamabad");
