// DOM Elements
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const refreshBtn = document.getElementById('refresh-btn');
        const locationElement = document.getElementById('location');
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('current-time');
        const weatherIcon = document.getElementById('weather-icon');
        const temperatureElement = document.getElementById('temperature');
        const feelsLikeElement = document.getElementById('feels-like');
        const descriptionElement = document.getElementById('description');
        const windElement = document.getElementById('wind');
        const humidityElement = document.getElementById('humidity');
        const pressureElement = document.getElementById('pressure');
        const sunriseElement = document.getElementById('sunrise');
        const sunsetElement = document.getElementById('sunset');
        const forecastContainer = document.getElementById('forecast-container');
        const errorMessage = document.getElementById('error-message');
        const loadingElement = document.querySelector('.loading');
        const cityButtons = document.querySelectorAll('.city-btn');
        const celsiusBtn = document.getElementById('celsius-btn');
        const fahrenheitBtn = document.getElementById('fahrenheit-btn');
        const temperatureUnit = document.querySelector('.temperature-unit');
        
        // State variables
        let currentCity = "Mumbai";
        let isCelsius = true;
        
        // Maharashtra cities data (for demo)
        const mahaCities = {
            "Mumbai": { 
                temp: 28, 
                feels_like: 30,
                desc: "Partly Cloudy", 
                humidity: 78, 
                wind: 12, 
                pressure: 1012, 
                icon: "fa-cloud-sun",
                sunrise: "6:15 AM",
                sunset: "7:05 PM"
            },
            "Pune": { 
                temp: 26, 
                feels_like: 27,
                desc: "Sunny", 
                humidity: 65, 
                wind: 10, 
                pressure: 1010, 
                icon: "fa-sun",
                sunrise: "6:05 AM",
                sunset: "7:00 PM"
            },
            "Nagpur": { 
                temp: 32, 
                feels_like: 35,
                desc: "Clear Sky", 
                humidity: 55, 
                wind: 8, 
                pressure: 1008, 
                icon: "fa-sun",
                sunrise: "5:45 AM",
                sunset: "6:55 PM"
            },
            "Nashik": { 
                temp: 25, 
                feels_like: 26,
                desc: "Light Rain", 
                humidity: 82, 
                wind: 9, 
                pressure: 1011, 
                icon: "fa-cloud-rain",
                sunrise: "6:10 AM",
                sunset: "7:10 PM"
            },
            "Aurangabad": { 
                temp: 30, 
                feels_like: 32,
                desc: "Cloudy", 
                humidity: 70, 
                wind: 11, 
                pressure: 1009, 
                icon: "fa-cloud",
                sunrise: "6:00 AM",
                sunset: "6:58 PM"
            },
            "Kolhapur": { 
                temp: 27, 
                feels_like: 29,
                desc: "Sunny", 
                humidity: 68, 
                wind: 7, 
                pressure: 1010, 
                icon: "fa-sun",
                sunrise: "6:20 AM",
                sunset: "7:15 PM"
            },
            "Solapur": { 
                temp: 34, 
                feels_like: 37,
                desc: "Hot", 
                humidity: 45, 
                wind: 14, 
                pressure: 1007, 
                icon: "fa-temperature-high",
                sunrise: "6:00 AM",
                sunset: "6:50 PM"
            },
            "Amravati": { 
                temp: 31, 
                feels_like: 33,
                desc: "Clear", 
                humidity: 52, 
                wind: 9, 
                pressure: 1009, 
                icon: "fa-sun",
                sunrise: "5:50 AM",
                sunset: "6:53 PM"
            },
            "Thane": { 
                temp: 29, 
                feels_like: 31,
                desc: "Partly Cloudy", 
                humidity: 75, 
                wind: 11, 
                pressure: 1011, 
                icon: "fa-cloud-sun",
                sunrise: "6:15 AM",
                sunset: "7:05 PM"
            },
            "Satara": { 
                temp: 24, 
                feels_like: 25,
                desc: "Mild Rain", 
                humidity: 80, 
                wind: 8, 
                pressure: 1012, 
                icon: "fa-cloud-showers-heavy",
                sunrise: "6:10 AM",
                sunset: "7:08 PM"
            }
        };
        
        // Forecast data for demo
        const forecastData = {
            "Mumbai": [
                { day: "Tue", temp: 29, icon: "fa-cloud-sun" },
                { day: "Wed", temp: 27, icon: "fa-cloud-rain" },
                { day: "Thu", temp: 26, icon: "fa-cloud-showers-heavy" },
                { day: "Fri", temp: 28, icon: "fa-cloud-sun" },
                { day: "Sat", temp: 30, icon: "fa-sun" }
            ],
            "Pune": [
                { day: "Tue", temp: 27, icon: "fa-sun" },
                { day: "Wed", temp: 26, icon: "fa-cloud-sun" },
                { day: "Thu", temp: 25, icon: "fa-cloud" },
                { day: "Fri", temp: 26, icon: "fa-sun" },
                { day: "Sat", temp: 28, icon: "fa-sun" }
            ],
            "Nagpur": [
                { day: "Tue", temp: 33, icon: "fa-sun" },
                { day: "Wed", temp: 34, icon: "fa-sun" },
                { day: "Thu", temp: 35, icon: "fa-sun" },
                { day: "Fri", temp: 34, icon: "fa-sun" },
                { day: "Sat", temp: 33, icon: "fa-sun" }
            ],
            "Nashik": [
                { day: "Tue", temp: 24, icon: "fa-cloud-rain" },
                { day: "Wed", temp: 23, icon: "fa-cloud-showers-heavy" },
                { day: "Thu", temp: 24, icon: "fa-cloud-rain" },
                { day: "Fri", temp: 25, icon: "fa-cloud-sun" },
                { day: "Sat", temp: 26, icon: "fa-cloud-sun" }
            ],
            "Aurangabad": [
                { day: "Tue", temp: 31, icon: "fa-cloud" },
                { day: "Wed", temp: 30, icon: "fa-cloud-sun" },
                { day: "Thu", temp: 29, icon: "fa-cloud" },
                { day: "Fri", temp: 31, icon: "fa-cloud-sun" },
                { day: "Sat", temp: 32, icon: "fa-sun" }
            ]
        };
        
        // Initialize with Mumbai weather
        document.addEventListener('DOMContentLoaded', () => {
            updateDateTime();
            updateWeatherUI(currentCity);
            setInterval(updateDateTime, 60000); // Update time every minute
            
            // Set interval to update weather every 5 minutes
            setInterval(() => {
                updateWeatherUI(currentCity);
            }, 300000);
        });
        
        // Update date and time
        function updateDateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('en-US', options);
            
            // Format time
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            timeElement.textContent = `${formattedHours}:${minutes} ${ampm}`;
        }
        
        // Event listeners
        searchBtn.addEventListener('click', searchWeather);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchWeather();
        });
        
        refreshBtn.addEventListener('click', () => {
            updateWeatherUI(currentCity);
        });
        
        // Add event listeners to city buttons
        cityButtons.forEach(button => {
            button.addEventListener('click', () => {
                const city = button.getAttribute('data-city');
                searchInput.value = city;
                updateWeatherUI(city);
            });
        });
        
        // Temperature unit toggle
        celsiusBtn.addEventListener('click', () => {
            if (!isCelsius) {
                isCelsius = true;
                celsiusBtn.classList.add('active');
                fahrenheitBtn.classList.remove('active');
                updateWeatherUI(currentCity);
            }
        });
        
        fahrenheitBtn.addEventListener('click', () => {
            if (isCelsius) {
                isCelsius = false;
                fahrenheitBtn.classList.add('active');
                celsiusBtn.classList.remove('active');
                updateWeatherUI(currentCity);
            }
        });
        
        // Search weather function
        function searchWeather() {
            const city = searchInput.value.trim();
            if (city) {
                updateWeatherUI(city);
            }
        }
        
        // Convert Celsius to Fahrenheit
        function celsiusToFahrenheit(celsius) {
            return Math.round((celsius * 9/5) + 32);
        }
        
        // Update weather UI
        function updateWeatherUI(city) {
            // Show loading
            loadingElement.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Fade out current weather
            document.querySelector('.current-weather').style.opacity = '0.5';
            document.querySelector('.forecast').style.opacity = '0.5';
            
            // Simulate API delay
            setTimeout(() => {
                if (mahaCities[city]) {
                    const weather = mahaCities[city];
                    currentCity = city;
                    
                    locationElement.textContent = `${city}, Maharashtra`;
                    
                    // Set temperature with unit
                    let displayTemp = weather.temp;
                    let feelsLike = weather.feels_like;
                    
                    if (!isCelsius) {
                        displayTemp = celsiusToFahrenheit(weather.temp);
                        feelsLike = celsiusToFahrenheit(weather.feels_like);
                        temperatureUnit.textContent = '°F';
                    } else {
                        temperatureUnit.textContent = '°C';
                    }
                    
                    temperatureElement.innerHTML = `${displayTemp}<span class="temperature-unit">${temperatureUnit.textContent}</span>`;
                    feelsLikeElement.textContent = `Feels like ${feelsLike}${isCelsius ? '°C' : '°F'}`;
                    descriptionElement.textContent = weather.desc;
                    windElement.textContent = `${weather.wind} km/h`;
                    humidityElement.textContent = `${weather.humidity}%`;
                    pressureElement.textContent = `${weather.pressure} hPa`;
                    sunriseElement.textContent = weather.sunrise;
                    sunsetElement.textContent = weather.sunset;
                    
                    // Set weather icon with animation
                    weatherIcon.innerHTML = `<i class="fas ${weather.icon}"></i>`;
                    
                    // Update forecast
                    renderForecast(city);
                    
                    errorMessage.style.display = 'none';
                } else {
                    errorMessage.style.display = 'block';
                }
                
                loadingElement.style.display = 'none';
                
                // Fade in updated weather
                document.querySelector('.current-weather').style.opacity = '1';
                document.querySelector('.forecast').style.opacity = '1';
            }, 800);
        }
        
        // Render forecast
        function renderForecast(city) {
            forecastContainer.innerHTML = '';
            
            const forecast = forecastData[city] || forecastData["Mumbai"];
            
            forecast.forEach(day => {
                let temp = day.temp;
                if (!isCelsius) {
                    temp = celsiusToFahrenheit(day.temp);
                }
                
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                    <div class="day">${day.day}</div>
                    <div class="forecast-icon"><i class="fas ${day.icon}"></i></div>
                    <div class="forecast-temp">${temp}${isCelsius ? '°' : '°F'}</div>
                `;
                forecastContainer.appendChild(forecastItem);
            });
        }
