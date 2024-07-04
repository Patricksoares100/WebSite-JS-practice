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
let celsiusText = `${weatherCondition} in ${userLocation} with a temperature of ${temperature}°C`;
let fahrText = `${weatherCondition} in ${userLocation} with a temperature of ${celciusToFahrenheit(
  temperature
).toFixed(1)}°F`;
document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = celsiusText;

document.querySelector(".weather-group").addEventListener("click", (e) => {
  if (e.target.id === "celsius") {
    document.querySelector("p#weather").innerHTML = celsiusText;
  } else if (e.target.id === "fahr") {
    document.querySelector("p#weather").innerHTML = fahrText;
  }
 console.log(e.target.id);
});

//local time
setInterval(function () {
  let timeLocal = new Date();
  document.querySelector("span[data-time=hours]").textContent = timeLocal.getHours().toString().padStart(2, "0");
  document.querySelector("span[data-time=minutes]").textContent = timeLocal.getMinutes().toString().padStart(2, "0");
  document.querySelector("span[data-time=seconds]").textContent = timeLocal.getSeconds().toString().padStart(2, "0");
}, 1000);


//gallery section
const galleryImages = [ 
  { src: "./assets/gallery/image1.jpg", alt: "Thumbnail Image 1" },
  { src: "./assets/gallery/image2.jpg", alt: "Thumbnail Image 2" },
  { src: "./assets/gallery/image3.jpg", alt: "Thumbnail Image 3" },
];
let mainImage = document.querySelector("#gallery > img");
let thumbnails = document.querySelector("#gallery .thumbnails");
mainImage.src = galleryImages[0].src;
mainImage.alt = galleryImages[0].alt;

galleryImages.forEach((image, index) => {
  let img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  img.dataset.arrayIndex = index;
  // going select the first image, in this case the index is 0
  img.dataset.selected = index === 0 ? true : false;

  img.addEventListener("click", (e) => {
    let selectedIndex = e.target.dataset.arrayIndex;
    let selectedImage = galleryImages[selectedIndex];
    mainImage.src = selectedImage.src;
    mainImage.alt = selectedImage.alt;

    thumbnails.querySelectorAll("img").forEach(function(img){
      img.dataset.selected = false;
    });
    e.target.dataset.selected = true;

  });
  thumbnails.appendChild(img);

});

