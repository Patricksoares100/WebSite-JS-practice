
const weatherAPIKey = "d9b9e4b6a98f4ee3b25f3f5ad4fd247e"
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${weatherAPIKey}&units=metric`

//gallery section
const galleryImages = [
  { src: "./assets/gallery/image1.jpg", alt: "Thumbnail Image 1" },
  { src: "./assets/gallery/image2.jpg", alt: "Thumbnail Image 2" },
  { src: "./assets/gallery/image3.jpg", alt: "Thumbnail Image 3" },
];

const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

// side menu handler
function sideHandler() {
  document.querySelector("#open-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
  });

  document.querySelector("#close-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
  });
}

//greeting section
function greetingHandler() {
  let greetingText;
  let currentHour = new Date().getHours();

  if (currentHour < 12) {
    greetingText = "Good Morning!";
  } else if (currentHour < 19) {
    greetingText = "Good Afternoon!";
  } else if (currentHour < 24) {
    greetingText = "Good Evening!";
  } else {
    greetingText = "Welcome!";
  }

  document.querySelector("#greeting").innerHTML = greetingText;
}

//local time
function timeHandler() {
  setInterval(function () {
    let timeLocal = new Date();
    document.querySelector("span[data-time=hours]").textContent = timeLocal
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = timeLocal
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = timeLocal
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }, 1000);
}

//gallery section
function galleryHandler() {
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
      // we gone unselect all the images and select the one that was clicked
      thumbnails.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false;
      });
      e.target.dataset.selected = true;
    });
    thumbnails.appendChild(img);
  });
}

function selectProductHandler(productList) {
  let productSection = document.querySelector(".products-area");
  productSection.textContent = "";
  productList.forEach(function (product, index) {

    let totalProducts = products.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totalProducts;

    let freeProducts = products.filter(function (product) {
      return !product.price || product.price === 0;
    });
    let totalFreeProducts = freeProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = totalFreeProducts;
    let paidProducts = products.filter(function (product) {
      return product.price > 0;
    });
    let totalPaidProducts = paidProducts.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = totalPaidProducts;

    // create the html element for the individual product
    let productElm = document.createElement("div");
    productElm.classList.add("product-item");

    // we gone create de product image
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "Image for " + product.image;

    // we gone create the product details
    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    // we gone create the product title, author, pricetitle, product price
    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;
    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;
    let priceTitle = document.createElement("p");
    priceTitle.classList.add("price-title");
    priceTitle.textContent = product.title;
    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = product.price > 0 ? '$ ' + product.price.toFixed(2) : 'Free';

    // Append the product details
    productDetails.append(productTitle);
    productDetails.append(productAuthor);
    productDetails.append(priceTitle);
    productDetails.append(productPrice);

    // and all child thml elements of the product
    productElm.append(productImage);
    productElm.append(productDetails);

    // add completed individual product to the product section
    productSection.append(productElm);


  });
}

// select the products
function productsHandler() {

  let freeProducts = products.filter(function (product) {
    return !product.price || product.price === 0;
  });

  let paidProducts = products.filter(function (product) {
    return product.price > 0;
  });

  selectProductHandler(paidProducts);

  let productsFilter = document.querySelector(".products-filter");
  productsFilter.addEventListener("click", function (e) {
    let filter = e.target.id;
    if (filter === "all") {
      
      selectProductHandler(products);
    } else if (filter === "free") {
      selectProductHandler(freeProducts);
    } else if (filter === "paid") {
      selectProductHandler(paidProducts);
    }
  });
}

// footer section
function footerHandler() {
  let currentYear = new Date().getFullYear();
  document.querySelector("footer").textContent = `© ${currentYear} All Rights Reserved`;
}

//location Handler
function weatherHandler() {
navigator.geolocation.getCurrentPosition( position => {
  let latitute = position.coords.latitude;
  let longitude = position.coords.longitude;
  let weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitute}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`;
  fetch(weatherAPIURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const weatherCondition = data.weather[0].description;
    const userLocation = data.name;
    let temperature = data.main.temp.toFixed(1);

    function celciusToFahrenheit(temperature) {
      return (temperature * 9) / 5 + 32;
    }
    let celsiusText = `${weatherCondition} in ${userLocation} with a temperature of ${temperature}°C`;
    let fahrText = `${weatherCondition} in ${userLocation} with a temperature of ${celciusToFahrenheit(
      temperature
    ).toFixed(1)}°F`;
    document.querySelector("p#weather").innerHTML = celsiusText;
    document.querySelector(".weather-group").addEventListener("click", (e) => {
      if (e.target.id === "celsius") {
        document.querySelector("p#weather").innerHTML = celsiusText;
      } else if (e.target.id === "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
      }
    });
  });
});
}

// Page load
galleryHandler();
sideHandler();
greetingHandler();
timeHandler();
productsHandler();
footerHandler();
weatherHandler();
