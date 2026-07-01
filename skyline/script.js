const cityInput = document.getElementById('cityInput');
const suggestionsBox = document.getElementById('autocomplete-list');
const searchBtn = document.getElementById('searchBtn');
const hudPlace = document.getElementById('hudPlace');
const tempBig = document.getElementById('tempBig');
const tempUnit = document.getElementById('tempUnit');
const condText = document.getElementById('condText');
const heroCond = document.getElementById('heroCond');
const hourlyGrid = document.getElementById('hourlyGrid');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const small = document.getElementById('clockTag');
const uv = document.getElementById('uv');
const unitBtn = document.getElementById('unitBtn');

let isCelsius = true;
let selectedLocation = null;

// 1. Autocomplete Search

function getWeatherDescription(code) {
    const codes = {
        0: "clear",
        1: "mostly clear",
        2: "partly cloudy",
        3: "overcast",
        45: "foggy",
        61: "rainy",
        71: "snowy",
        95: "stormy"
    };
    return codes[code] || "the weather variable";
}

cityInput.addEventListener('input', async () => {
    const query = cityInput.value;
    if (query.length < 3) {
        suggestionsBox.innerHTML = '';
        return;
    }

    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`);
        const data = await res.json();
        
        suggestionsBox.innerHTML = '';
        if (data.results) {
            data.results.forEach(loc => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                // Show state/admin area if available to distinguish duplicates
                const displayName = loc.admin1 ? `${loc.name}, ${loc.admin1}, ${loc.country}` : `${loc.name}, ${loc.country}`;
                div.innerText = displayName;
                div.onclick = () => {
                    selectedLocation = loc;
                    cityInput.value = loc.name;
                    suggestionsBox.innerHTML = '';
                    fetchWeather(loc.latitude, loc.longitude, loc.name);
                };
                suggestionsBox.appendChild(div);
            });
        }
    } catch (e) { console.error(e); }
});

// 2. Fetch Weather Data
async function fetchWeather(lat, lon, name) {
    const unit = isCelsius ? 'celsius' : 'fahrenheit';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&hourly=temperature_2m&timezone=auto&temperature_unit=${unit}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        updateUI(data, name);
    } catch (e) { alert("Could not fetch weather."); }
}

// 3. Update UI
function updateUI(data, name) {
    const c = data.current;
    var description = getWeatherDescription(c.weather_code);
    var fahrenheit = c.temperature_2m * 9/5 + 32;
    hudPlace.innerText = `surface — ${name}`;
    tempBig.innerText = Math.round(c.temperature_2m);
    tempUnit.innerText = isCelsius ? '°C' : '°F';
    feelsLike.innerText = `${Math.round(c.apparent_temperature)}°`;
    humidity.innerText = `${c.relative_humidity_2m}%`;
    wind.innerText = `${c.wind_speed_10m} km/h`;
    uv.innerText = c.uv_index;
    heroCond.innerText = description + ".";
    small.innerText = `${Math.round(c.temperature_2m)}:${Math.round(fahrenheit)}`;

    const currentHour = new Date().getHours();

    // Slice the next 12 hours from the data
    const hours = data.hourly.time.slice(currentHour, currentHour + 12);
    const temps = data.hourly.temperature_2m.slice(currentHour, currentHour + 12);

    hourlyGrid.innerHTML = hours.map((timeString, i) => {
        // Extract the hour (e.g., "2026-07-01T10:00" -> "10:00")
        const displayHour = timeString.split('T')[1].substring(0, 5);
        
        return `
            <div class="hour-item">
                <p class="hour-time">${displayHour}</p>
                <p class="hour-temp">${Math.round(temps[i])}°</p>
            </div>
        `;
    }).join('');
}



// 4. Listeners
unitBtn.addEventListener('click', () => {
    isCelsius = !isCelsius;
    if (selectedLocation) {
        fetchWeather(selectedLocation.latitude, selectedLocation.longitude, selectedLocation.name);
    }
});

cityInput.addEventListener('input', async () => {
    const query = cityInput.value;

    if (query.length < 3) {
        suggestionsBox.style.display = 'none'; // Hide if too short
        suggestionsBox.innerHTML = '';
        return;
    }

    // Now show it because we have a valid query
    suggestionsBox.style.display = 'block'; 
    
    // ... your existing fetch logic ...
});

// Optional: Hide if user clicks outside the input
document.addEventListener('click', (e) => {
    if (e.target !== cityInput) {
        suggestionsBox.style.display = 'none';
    }
});

// Default load
fetchWeather(51.5074, -0.1278, "London");