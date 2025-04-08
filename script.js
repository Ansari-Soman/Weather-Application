// const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "375f731b2dacaabae23c4d30b9ddd584";
const search = document.querySelector(".search");
const errorMsg = document.querySelector(".error-msg");
const imgTemp = document.querySelector(".temp-img");
const humWind = document.querySelector(".hum-wind");

search.addEventListener("click", (e) => {
  const cityName = document.querySelector(".city").value.trim();
  console.log(cityName)
  if (cityName === "") {
    errorMsg.innerText = "Please enter the city name";
    return;
  }
  fetch(`${BASE_URL}${cityName}&appid=${apiKey}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.cod !== 200) {
        hide();
        errorMsg.innerText = data.message;
        errorMsg.classList.remove("hidden");
        return;
      }

      updateData(data);
    })
    .catch((error) => {
      console.log("eeeeeeeeeeeeeeeee", error);
      errorMsg.innerText = "Something went wrong. Please try again.";
    });
});

function updateData(data) {
  // errorMsg.innerText = '';
  //   const weatherText = document.querySelector(".weather-text");
  //   const weatherTemp = document.querySelector(".weather-temp");
  //   const humidity = document.querySelector(".humidity-no");
  //   const wind = document.querySelector(".wind-sp");

  const weatherImage = document.querySelector(".weather-img");
  errorMsg.classList.add("hidden");

  let weatCond = data.weather[0].main;
  console.log(weatCond);
  if (weatCond === "Clear") {
    weatherImage.src = "images/clear.png";
  } else if (weatCond === "Clouds") {
    weatherImage.src = "images/clouds.png";
  } else if (weatCond === "Drizzle") {
    weatherImage.src = "images/drizzle.png";
  } else if (weatCond === "Mist") {
    weatherImage.src = "images/mist.png";
  } else if (weatCond === "Rain") {
    weatherImage.src = "images/rain.png";
  } else if (weatCond === "Snow") {
    weatherImage.src = "images/snow.png";
  }

  document.querySelector(".weather-text").innerText = weatCond;
  document.querySelector(".weather-temp").innerText = data.main.temp + "°C";
  document.querySelector(".humidity-no").innerText = data.main.humidity + "%";
  document.querySelector(".wind-sp").innerText =
    (data.wind.speed * 3.6).toFixed(1) + " Km/h";
  document.querySelector(".city-name").innerText = data.name;

  imgTemp.classList.remove("hidden");
  humWind.classList.remove("hidden");
}

function hide() {
  // imgTemp.style.display = "none";
  humWind.classList.add("hidden");
  imgTemp.classList.add("hidden");
  errorMsg.classList.add("hidden");
}
window.addEventListener("DOMContentLoaded", hide);
