// Import our NASA API configuration
import { NASA_API_KEY, NASA_APOD_URL } from './config.js';

// Function to fetch today's Astronomy Picture of the Day
async function getTodaysAPOD() {
    try {
        // Build the complete URL with our API key
        // Template literals (backticks) make it easy to combine strings and variables
        const fullUrl = `${NASA_APOD_URL}?api_key=${NASA_API_KEY}`;
        
        // Fetch data from NASA's API
        // await waits for the response before continuing
        const response = await fetch(fullUrl);
        
        // Convert the response to JSON format
        const data = await response.json();
        
        // Return the space picture data
        return data;
        
    } catch (error) {
        // If something goes wrong, log the error
        console.error('Error fetching APOD data:', error);
        return null;
    }
}

// Example of how to use the function
// This shows how to get the data and display it
getTodaysAPOD().then(data => {
    if (data) {
        console.log('Title:', data.title);
        console.log('Date:', data.date);
        console.log('Explanation:', data.explanation);
        console.log('Image URL:', data.url);
    }
});
