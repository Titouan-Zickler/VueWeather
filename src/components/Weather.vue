<template>
  <h1>Weather Vue JS</h1>
  <div class="weather-container">
    <div class="input-container">
      <input v-model="city" @keyup.enter="addCity" placeholder="Entrez le nom d'une ville" />
      <button @click="addCity">Rechercher</button>
      <div v-if="error" class="error">{{ error }}</div>
    </div>

    <div class="cards-container">
      <div v-for="(cityData, index) in cities" :key="index" class="weather-card">
        <button class="close-btn" @click="removeCity(index)">×</button>
        <h3 class="city">Météo à {{ cityData.name }}</h3>
        <img :src="getIconUrl(cityData.weather)" alt="Weather Icon" class="icon" />
        <p class="temperature">Température : {{ Math.round(cityData.weather.main.temp) }}°C</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWeatherStore } from '../stores/weatherStore';
import { storeToRefs } from 'pinia';

const city = ref('');
const weatherStore = useWeatherStore();
const { cities, error } = storeToRefs(weatherStore);

const addCity = () => {
  weatherStore.fetchWeather(city.value);
  city.value = '';
};

const removeCity = (index) => {
  weatherStore.removeCity(index);
};

const getIconUrl = (weather) => {
  const iconCode = weather.weather[0].icon;
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
</script>

<style scoped>
.weather-container {
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  margin-bottom: 2rem;
}

.input-container input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.input-container button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #369b72;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.weather-card {
  flex: 1 calc(25% - 1rem); /* Utilisation de flex-basis pour définir une largeur fixe */
  position: relative;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
  margin-bottom: 1rem;
}

.weather-card:hover {
  transform: translateY(-10px);
}

.weather-card .city {
  background-color: #42b983;
  color: white;
  font-size: 1.2rem;
  margin: -1rem -1rem 0.5rem -1rem;
  padding: 0.5rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.weather-card .icon {
  width: 100px;
  height: 100px;
  margin: 1rem 0;
  background-color: antiquewhite;
  border-radius: 50%;
}

.weather-card .temperature {
  background-color: #369b72;
  color: white;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 10px;
}

.weather-card .close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
}

.weather-card .close-btn:hover {
  color: #ffffff;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
