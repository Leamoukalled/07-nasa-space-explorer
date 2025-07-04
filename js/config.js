// Configuration for NASA API
// You can get a free API key at: https://api.nasa.gov/
// For now, we'll use the demo key (limited to 30 requests per hour)
const NASA_API_KEY = 'DEMO_KEY';

// NASA APOD (Astronomy Picture of the Day) API endpoint
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

// NASA Official Brand Colors (from NASA Graphics Standards Manual)
const NASA_BRAND_COLORS = {
    // Primary NASA colors
    nasaBlue: '#0B3D91',        // NASA Blue (primary brand color)
    nasaRed: '#FC3D21',         // NASA Red (accent color)
    nasaWhite: '#FFFFFF',       // Pure white
    
    // Secondary colors from NASA design system
    darkBlue: '#061F4A',        // Darker blue for headers
    lightBlue: '#4F94CD',       // Lighter blue for accents
    gray: '#5C6670',            // NASA gray for text
    lightGray: '#F5F5F5',       // Light background gray
    darkGray: '#2C3E50'         // Dark text color
};

// NASA Typography Guidelines
const NASA_FONTS = {
    // NASA uses these font families in their official materials
    primary: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    secondary: 'Georgia, "Times New Roman", serif',
    monospace: '"Courier New", Courier, monospace'
};

// Make these available to other JavaScript files
// This creates a global object that other scripts can access
window.NASA_CONFIG = {
    API_KEY: NASA_API_KEY,
    APOD_URL: NASA_APOD_URL,
    BRAND_COLORS: NASA_BRAND_COLORS,
    FONTS: NASA_FONTS
};

// Instructions for students:
// 1. Visit https://api.nasa.gov/ to get your own free API key
// 2. Replace 'DEMO_KEY' above with your actual API key
// 3. The DEMO_KEY allows 30 requests per hour for testing
// 4. Your own key allows 1000 requests per hour
// 5. NASA brand colors follow their official Graphics Standards Manual
// 6. These colors help make your app look professional and authentic
