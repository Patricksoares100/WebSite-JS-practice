const weatherAPIKey = "d9b9e4b6a98f4ee3b25f3f5ad4fd247e";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${weatherAPIKey}&units=metric`;
const newsApiKey = `456aa11f72cd4d82993523f716bc9edb`;

//search bar

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("btnSearch");

searchButton.addEventListener("click", async function() {
    const searchTerm = searchInput.value;
    console.log(`Searching for "${searchTerm}"...`);
    if (searchTerm !== "") {
        try {
            selectProductHandler(searchTerm, true);
        } catch (error) {
            console.log("Error fetching news by search", error);
        }
    }
});

async function fetchNewsSearch(searchTerm) {
    try {
        const apiAllNews = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${newsApiKey}`;
        const response = await fetch(apiAllNews);
        const data = await response.json();
        // console.log(data);
        return data.articles;
    } catch (error) {
        console.error("erro ao carregar as noticias", error);
        return [];
    }
}

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
    setInterval(function() {
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
        // console.log(data);
        return data.articles;
    } catch (error) {
        console.error("erro ao carregar as noticias", error);
        return [];
    }
}

async function fetchRandomNewsMain(articlesTheme) {
    const numberNewsShowed = 6;
    const newsApiUrlHandler = `https://newsapi.org/v2/top-headlines?pageSize=${numberNewsShowed}&country=${articlesTheme}&apiKey=${newsApiKey}`;
    try {
        const response = await fetch(newsApiUrlHandler);
        const data = await response.json();
        // console.log(data);
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

async function selectProductHandler(articlesTheme, isSearch = false) {
    console.log(articlesTheme);
    let productSection = document.querySelector(".products-area");
    productSection.textContent = "";

    let articles;
    if (isSearch) {
        articles = await fetchNewsSearch(articlesTheme);
    } else {
        articles = await fetchRandomNewsMain(articlesTheme);
    }

    articles.forEach((article) => {
        // Create the HTML element for the individual product
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");

        // Create the product image
        // let productImage = document.createElement("img");
        // productImage.src = article.urlToImage;
        // productImage.alt = article.title;

        // Create the product title, author, price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        const title = article.title || "";
        const titleLength =
            title.length > 100 ? title.slice(0, 100) + "..." : title;

        productTitle.textContent = titleLength;

        let productDescription = document.createElement("p");
        productDescription.classList.add("product-author");

        const description = article.description || ""; // Default to an empty string if description is null or undefined
        const descriptionLength =
            description.length > 5 ? description.slice(0, 5) + "..." : description;

        productDescription.textContent = descriptionLength;
        productDescription.textContent = descriptionLength;
        // Add the image, title, and description to the product element
        // productElm.appendChild(productImage);
        productElm.appendChild(productTitle);
        // productElm.appendChild(productDescription);

        // Add the product element to the products section
        productSection.appendChild(productElm);
    });
}

// select the products
function productsHandler() {
    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e) {
        let filter = e.target.id;
        console.log(`Filter selected: ${filter}`);
        if (filter === "USA") {
            let articlesTheme = "us";
            selectProductHandler(articlesTheme);
        } else if (filter === "PT") {
            let articlesTheme = "pt";
            selectProductHandler(articlesTheme);
        } else if (filter === "UK") {
            let articlesTheme = "gb";
            selectProductHandler(articlesTheme);
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
sideHandler();
greetingHandler();
timeHandler();
productsHandler();
selectProductHandler("us");
weatherHandler();
galleryHandler();