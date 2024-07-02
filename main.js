document.querySelector("#open-nav-menu").addEventListener("click", () => {
  document.querySelector("header nav .wrapper").classList.add("nav-open");
});

document.querySelector("#close-nav-menu").addEventListener("click", () => {
  document.querySelector("header nav .wrapper").classList.remove("nav-open");
});

//greeting section

const greetingText = "Hello, World!";
const weatherCondition = "Sunny";
const userLocation = "Lisbon";
let temperature = 25;

function celciusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}
let weatherText = `${weatherCondition} in ${userLocation} with a temperature of ${celciusToFahrenheit(
  temperature
).toFixed(1)}°F`;
document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = weatherText;
