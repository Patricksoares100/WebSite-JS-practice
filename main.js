const weatherAPIKey = "d9b9e4b6a98f4ee3b25f3f5ad4fd247e";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${weatherAPIKey}&units=metric`;
const newsApiKey = `456aa11f72cd4d82993523f716bc9edb`;

//gallery section
const galleryImages = [
  { src: "./assets/gallery/image1.jpg", alt: "Thumbnail Image 1" },
  { src: "./assets/gallery/image2.jpg", alt: "Thumbnail Image 2" },
  { src: "./assets/gallery/image3.jpg", alt: "Thumbnail Image 3" },
];

const products = [
  {
    title: "QA Tester",
    author: "Pedro",
    price: 49.9,
    image: "./assets/products/image1.png",
  },
  {
    title: "Médica",
    author: "Maria",
    price: 55,
    image: "./assets/products/image3.png",
  },
  {
    title: "Carpinteiro",
    author: "André",
    price: 20,
    image: "./assets/products/image2.png",
  },
  {
    title: "Farmaceutico",
    author: "António",
    price: 25,
    image: "./assets/products/image4.png",
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
    price: 0,
    image: "./assets/products/img4.png",
  },
];

// side menu handler
function sideHandler() {
  document.querySelector("#open-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
  });

  const galleryElement = document.querySelector(
    'header nav .wrapper ul li a[href="#gallery"]'
  );
  const homeElement = document.querySelector(
    'header nav .wrapper ul li a[href="#home"]'
  );

  if (galleryElement) {
    galleryElement.addEventListener(
      "click",
      (e) => {
        window.location.href = "gallery.html";
      },
      true
    );
  }
  if (homeElement) {
    homeElement.addEventListener(
      "click",
      (e) => {
        console.log("Home element clicked");
        window.location.href = "index.html";
      },
      true
    );
  }
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
// random news api call
async function fetchRandomNewsHandler() {
  const numberNewsShowed = 3;
  const newsApiUrlHandler = `https://newsapi.org/v2/top-headlines?pageSize=${numberNewsShowed}&sources=techcrunch&apiKey=${newsApiKey}`;
  try {
    const response = await fetch(newsApiUrlHandler);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("erro ao carregar as noticias", error);
    return [];
  }
}

async function fetchRandomNewsMain() {
  const articlesTheme = "techcrunch"
  const numberNewsShowed = 6;
  const newsApiUrlHandler = `https://newsapi.org/v2/top-headlines?pageSize=${numberNewsShowed}&sources=${articlesTheme}&apiKey=${newsApiKey}`;
  try {
    const response = await fetch(newsApiUrlHandler);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("erro ao carregar as noticias", error);
    return [];
  }
}

//gallery section
async function galleryHandler() {
  const articles = await fetchRandomNewsHandler();

  // Select main image and thumbnails container
  let mainImage = document.querySelector("#gallery > img");
  let thumbnails = document.querySelector("#gallery .thumbnails");

  // Loop through each article and create thumbnails
  articles.forEach((article, index) => {
    let img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    img.dataset.arrayIndex = index;
    img.dataset.selected = index === 0 ? "true" : "false"; // Select the first image initially

    // Add click event listener to each thumbnail
    img.addEventListener("click", (e) => {
      let selectedIndex = e.target.dataset.arrayIndex;
      let selectedArticle = articles[selectedIndex];
      mainImage.src = selectedArticle.urlToImage;
      mainImage.alt = selectedArticle.title;

      // Unselect all images and select the clicked one
      thumbnails.querySelectorAll("img").forEach((img) => {
        img.dataset.selected = "false";
      });
      e.target.dataset.selected = "true";
    });

    thumbnails.appendChild(img);

    // Set the first article as the main image initially
    if (index === 0) {
      mainImage.src = article.urlToImage;
      mainImage.alt = article.title;
    }
  });
}

async function selectProductHandler(productList) {
  const articles = await fetchRandomNewsMain();
  let productSection = document.querySelector(".products-area");
  productSection.textContent = "";

  articles.forEach((article) => {
    // create the html element for the individual product
    let productElm = document.createElement("div");
    productElm.classList.add("product-item");

    // we gone create de product image
    let productImage = document.createElement("img");
    productImage.src = article.urlToImage;
    productImage.alt = article.title;

    // we gone create the product title, author, pricetitle, product price
    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = article.title;

    let productDescription = document.createElement("p");
    productDescription.classList.add("product-author");
    productDescription.textContent = article.description;

  // Adiciona a imagem, o título e a descrição ao elemento do produto
  productElm.appendChild(productImage);
  productElm.appendChild(productTitle);
  productElm.appendChild(productDescription);

  // Adiciona o elemento do produto à seção de produtos
  productSection.appendChild(productElm);
  });

  // let productAuthor = document.createElement("p");
  // productAuthor.classList.add("product-author");
  // productAuthor.textContent = product.author;
  // let priceTitle = document.createElement("p");
  // priceTitle.classList.add("price-title");
  // priceTitle.textContent = product.title;
  // let productPrice = document.createElement("p");
  // productPrice.classList.add("product-price");
  // productPrice.textContent =
  //   product.price > 0 ? "$ " + product.price.toFixed(2) : "Free";

  // let productSection = document.querySelector(".products-area");
  // productSection.textContent = "";
  // productList.forEach(function (product, index) {
  //   let totalProducts = products.length;
  //   document.querySelector(
  //     ".products-filter label[for=all] span.product-amount"
  //   ).textContent = totalProducts;

  //   let freeProducts = products.filter(function (product) {
  //     return !product.price || product.price === 0;
  //   });
  //   let totalFreeProducts = freeProducts.length;
  //   document.querySelector(
  //     ".products-filter label[for=free] span.product-amount"
  //   ).textContent = totalFreeProducts;
  //   let paidProducts = products.filter(function (product) {
  //     return product.price > 0;
  //   });
  //   let totalPaidProducts = paidProducts.length;
  //   document.querySelector(
  //     ".products-filter label[for=paid] span.product-amount"
  //   ).textContent = totalPaidProducts;

  //   // create the html element for the individual product
  //   let productElm = document.createElement("div");
  //   productElm.classList.add("product-item");

  //   // we gone create de product image
  //   let productImage = document.createElement("img");
  //   productImage.src = product.image;
  //   productImage.alt = "Image for " + product.image;

  //   // we gone create the product details
  //   let productDetails = document.createElement("div");
  //   productDetails.classList.add("product-details");

  //   // we gone create the product title, author, pricetitle, product price
  //   let productTitle = document.createElement("h3");
  //   productTitle.classList.add("product-title");
  //   productTitle.textContent = product.title;
  //   let productAuthor = document.createElement("p");
  //   productAuthor.classList.add("product-author");
  //   productAuthor.textContent = product.author;
  //   let priceTitle = document.createElement("p");
  //   priceTitle.classList.add("price-title");
  //   priceTitle.textContent = product.title;
  //   let productPrice = document.createElement("p");
  //   productPrice.classList.add("product-price");
  //   productPrice.textContent =
  //     product.price > 0 ? "$ " + product.price.toFixed(2) : "Free";

  //   // Append the product details
  //   productDetails.append(productTitle);
  //   productDetails.append(productAuthor);
  //   productDetails.append(priceTitle);
  //   productDetails.append(productPrice);

  //   // and all child thml elements of the product
  //   productElm.append(productImage);
  //   productElm.append(productDetails);

  //   // add completed individual product to the product section
  //   productSection.append(productElm);
  // });
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
  document.querySelector(
    "footer"
  ).textContent = `© ${currentYear} All Rights Reserved`;
}

//location Handler
function weatherHandler() {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitute = position.coords.latitude;
    let longitude = position.coords.longitude;
    let weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitute}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`;
    fetch(weatherAPIURL)
      .then((response) => response.json())
      .then((data) => {
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
        document
          .querySelector(".weather-group")
          .addEventListener("click", (e) => {
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
