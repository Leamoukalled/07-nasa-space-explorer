// Space Facts for NASA Space Explorer
// Collection of interesting space facts for students

// Array of fun space facts - each fact should be educational and engaging
const SPACE_FACTS = [
    "One day on Venus is longer than its year! Venus takes 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun.",
    
    "Jupiter's Great Red Spot is a giant storm that has been raging for over 400 years and is larger than Earth!",
    
    "There are more possible games of chess than there are atoms in the observable universe.",
    
    "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
    
    "The Sun is so massive that it makes up 99.86% of the total mass of our entire solar system.",
    
    "Saturn's moon Titan has lakes and rivers, but they're made of liquid methane instead of water.",
    
    "Space is completely silent because there's no air for sound waves to travel through.",
    
    "The footprints left by astronauts on the Moon will last for millions of years because there's no wind or weather to erase them.",
    
    "A year on Mercury is only 88 Earth days, but a day on Mercury lasts 176 Earth days!",
    
    "The International Space Station travels at 17,500 mph and orbits Earth every 90 minutes.",
    
    "There are more stars in the universe than grains of sand on all the beaches on Earth.",
    
    "Mars has the largest volcano in the solar system called Olympus Mons, which is about 13.6 miles high!",
    
    "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
    
    "The coldest place in the universe that we know of is the Boomerang Nebula, at -457°F (-272°C).",
    
    "Pluto is smaller than Earth's Moon and takes 248 Earth years to orbit the Sun once.",
    
    "The Milky Way galaxy is on a collision course with the Andromeda galaxy, but don't worry - it won't happen for 4.5 billion years!",
    
    "Astronauts can grow up to 2 inches taller in space because their spine stretches without gravity pressing down on it.",
    
    "One million Earths could fit inside the Sun, and the Sun is considered an average-sized star!",
    
    "The asteroid belt between Mars and Jupiter contains millions of asteroids, but most are very small.",
    
    "Europa, one of Jupiter's moons, has more water than all of Earth's oceans combined - it's just frozen under a thick ice shell!",
    
    "Black holes bend space and time so much that if you fell into one, time would appear to slow down from an outside observer's perspective.",
    
    "Saturn is less dense than water - if you had a bathtub big enough, Saturn would float!",
    
    "The Hubble Space Telescope has taken over 1.5 million observations and traveled more than 4 billion miles in orbit around Earth."
];

// Function to get a random space fact
function getRandomSpaceFact() {
    // Generate a random number between 0 and the length of our facts array
    const randomIndex = Math.floor(Math.random() * SPACE_FACTS.length);
    
    // Return the fact at that random position
    return SPACE_FACTS[randomIndex];
}

// Function to display the random fact in the HTML
function displayRandomFact() {
    // Get the element where we want to show the fact
    const factElement = document.getElementById('space-fact-text');
    
    // If the element exists, add a random fact to it
    if (factElement) {
        const randomFact = getRandomSpaceFact();
        factElement.textContent = randomFact;
    }
}

// Function to add hover effects to gallery items
function addHoverEffects() {
    // Wait a moment for gallery items to be created
    setTimeout(function() {
        // Find all image cards in the gallery
        const imageCards = document.querySelectorAll('.image-card');
        
        // Add enhanced hover effects to each card
        imageCards.forEach(function(card) {
            // Add mouseenter event (when mouse goes over the card)
            card.addEventListener('mouseenter', function() {
                // Add a subtle glow effect
                card.style.boxShadow = '0 12px 40px rgba(11, 61, 145, 0.3)';
            });
            
            // Add mouseleave event (when mouse leaves the card)
            card.addEventListener('mouseleave', function() {
                // Return to normal shadow
                card.style.boxShadow = '0 4px 16px rgba(11, 61, 145, 0.1)';
            });
        });
    }, 100);
}

// Make the functions available to other scripts
window.SpaceFacts = {
    getRandomFact: getRandomSpaceFact,
    displayFact: displayRandomFact,
    addHoverEffects: addHoverEffects
};
