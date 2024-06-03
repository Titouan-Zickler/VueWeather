import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    cities: [],
    error: null,
  }),
  actions: {
    async fetchWeather(city) {
      try {
        const apiKey = ''; 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = response.data;

        if (!this.cities.some(c => c.name.toLowerCase() === city.toLowerCase())) {
          this.cities.push({
            name: city,
            weather: weatherData
          });
        }

        this.error = null;
      } catch (error) {
        this.error = "Ville introuvable. Veuillez réessayer.";
      }
    },
    removeCity(index) {
      this.cities.splice(index, 1);
    }
  }
});
