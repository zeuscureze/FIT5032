<template>
    <div class="container">
      <!-- 搜索栏和天气信息一起放置在一个容器中 -->
      <div class="search-and-weather">
        <div class="header">
          <h1>WEATHER APP</h1>
          <div class="search-bar">
            <input
              type="text"
              v-model="city"
              placeholder="Enter city name"
              class="search-input"
            />
            <button @click="searchByCity" class="search-button">Search</button>
          </div>
        </div>
  
        <!-- 显示天气信息 -->
        <main v-if="weatherData" class="weather-info">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div class="weather-details">
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "f119cecf81f6ce4aded58c301f29140c"; 
  
  export default {
    data() {
      return {
        city: "",
        weatherData: null,
        error: null,
      };
    },
    computed: {
      temperature() {
        return this.weatherData ? Math.floor(this.weatherData.main.temp) : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      // 加载时获取当前位置的天气
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
            await this.fetchWeatherData(url);
          });
        }
      },
  
      async searchByCity() {
        if (this.city) {
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
          await this.fetchWeatherData(url);
        } else {
          alert("Please enter a valid city name.");
        }
      },
  
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
          this.error = null;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          this.error = "Failed to fetch weather data. Please try again.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
  
  .search-and-weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60%;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    width: 250px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .search-button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #3a9c75;
  }
  
  .weather-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .weather-details {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .weather-details img {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  span {
    font-size: 1.3rem;
    color: #666;
  }
  </style>
  

