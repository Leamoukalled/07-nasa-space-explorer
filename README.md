# Project 7: NASA API - Space Explorer App
NASA releases a new "Astronomy Picture of the Day" (APOD) every day—spotlighting breathtaking images of galaxies, stars, planets, and more.

Your task is to build an interactive web app that fetches and displays these photos using [NASA's API](https://api.nasa.gov/). Users will pick a date range and instantly view stunning photos from across the cosmos, along with titles and descriptions.

You'll get to use your skills to build something that's actually connected to real-world data from one of the most iconic organizations in the world.

## Starter Files
- The provided files include a NASA logo, date inputs, a button, a placeholder for your gallery, and basic layout and styling to help you get started.
- It also includes built-in logic (in `dateRange.js`) to handle the valid APOD date range—from June 16, 1995 to today. No need to modify it.
- All your custom JavaScript should go in `script.js`. That's where you'll write the code that fetches data and displays your gallery.

# NASA Space Explorer

## Getting Your NASA API Key

1. Visit the NASA API website: https://api.nasa.gov/
2. Click on "Get Started" 
3. Fill out the simple form with your information
4. You'll receive an API key via email
5. Copy your API key and replace `'your-api-key-here'` in the `config.js` file

## Note for Beginners

- An API key is like a password that lets your code access NASA's data
- Keep your API key private and don't share it publicly
- NASA provides a demo key `DEMO_KEY` for testing, but it has limited requests per day

## Using the APOD API

The Astronomy Picture of the Day (APOD) API returns a different space image or video each day along with a description written by astronomers.
