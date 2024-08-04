const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = '550ba14894a0daceef801a3c359b7963'; 

  if (!city) {
    return res.render("index", { weather: null, error: "Please enter a city" });
  }

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;

  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
    console.log(weather); // Log the weather data for debugging
  } catch (err) {
    console.error(err); // Log the error for debugging
    if (err.response && err.response.status === 404) {
      error = "City not found. Please try again.";
    } else {
      error = "Error, please try again.";
    }
  }

  res.render("index", { weather, error });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});