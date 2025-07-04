// Main script for NASA Space Explorer

// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Get references to our HTML elements
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const getImagesButton = document.querySelector('button');
    const gallery = document.getElementById('gallery');
    
    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    
    // Get space facts elements
    const newFactButton = document.getElementById('newFactBtn');

    // Load a random space fact when the page loads
    window.SpaceFacts.displayFact();

    // Add click event listener to the button
    getImagesButton.addEventListener('click', handleGetImages);
    
    // Add click event listener to the "new fact" button
    newFactButton.addEventListener('click', function() {
        // Add a small animation to show the fact is changing
        const factText = document.getElementById('space-fact-text');
        factText.style.opacity = '0.5';
        
        // After a short delay, show the new fact
        setTimeout(function() {
            window.SpaceFacts.displayFact();
            factText.style.opacity = '1';
        }, 200);
    });
    
    // Add modal event listeners
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        // Close modal if user clicks outside the modal content
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Function to handle when user clicks "Get Space Images"
    async function handleGetImages() {
        // Get the selected dates from the input fields
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        // Validate that both dates are selected
        if (!startDate || !endDate) {
            alert('Please select both start and end dates!');
            return;
        }

        // Validate that start date comes before end date
        if (startDate > endDate) {
            alert('Start date must be before end date!');
            return;
        }

        // Show loading message while we fetch the data
        showLoading();

        try {
            // Fetch space images from NASA's API
            const images = await fetchNASAImages(startDate, endDate);
            
            // Replace the placeholder/loading with the gallery
            displayImages(images);
            
        } catch (error) {
            // If something goes wrong, show an error message
            console.error('Error fetching NASA images:', error);
            showError('Sorry, there was an error loading the space images. Please try again.');
        }
    }

    // Function to fetch images from NASA's APOD API
    async function fetchNASAImages(startDate, endDate) {
        // Build the complete API URL with our parameters
        const url = `${window.NASA_CONFIG.APOD_URL}?api_key=${window.NASA_CONFIG.API_KEY}&start_date=${startDate}&end_date=${endDate}`;
        
        // Make the request to NASA's API
        const response = await fetch(url);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        // Convert the response to JavaScript objects and return them
        const data = await response.json();
        return data;
    }

    // Function to display the gallery of space images
    function displayImages(images) {
        // Clear everything from the gallery (removes placeholder or previous results)
        gallery.innerHTML = '';

        // Check if we received any images
        if (!images || images.length === 0) {
            // Show message when no images are found
            gallery.innerHTML = `
                <div class="placeholder">
                    <div class="placeholder-icon">🌌</div>
                    <p>No space images found for the selected date range.</p>
                </div>
            `;
            return;
        }

        // Create a container for all the image cards
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-grid';

        // Loop through each image and create a card for it
        images.forEach(imageData => {
            const imageCard = createImageCard(imageData);
            galleryContainer.appendChild(imageCard);
        });

        // Add the complete gallery to the page (replaces placeholder)
        gallery.appendChild(galleryContainer);
    }

    // Function to create an individual image card
    function createImageCard(imageData) {
        // Create a new div element for this image card
        const card = document.createElement('div');
        card.className = 'image-card';

        // Format the date to look nicer
        const formattedDate = formatDate(imageData.date);

        // Check if this is an image or video and create appropriate content
        if (imageData.media_type === 'image') {
            // For images, show the actual space image
            card.innerHTML = `
                <div class="image-wrapper">
                    <img src="${imageData.url}" alt="${imageData.title}" loading="lazy" />
                </div>
                <div class="image-details">
                    <h3 class="image-title">${imageData.title}</h3>
                    <p class="image-date">${formattedDate}</p>
                </div>
            `;
        } else if (imageData.media_type === 'video') {
            // Check if this is a YouTube video to display it better
            const isYouTube = isYouTubeVideo(imageData.url);
            const videoThumbnail = isYouTube ? getYouTubeThumbnail(imageData.url) : null;
            
            if (isYouTube && videoThumbnail) {
                // For YouTube videos, show thumbnail with play button
                card.innerHTML = `
                    <div class="video-wrapper">
                        <div class="video-thumbnail">
                            <img src="${videoThumbnail}" alt="${imageData.title}" loading="lazy" />
                            <div class="play-button">▶</div>
                            <div class="video-label">YouTube Video</div>
                        </div>
                    </div>
                    <div class="image-details">
                        <h3 class="image-title">${imageData.title}</h3>
                        <p class="image-date">${formattedDate}</p>
                    </div>
                `;
            } else {
                // For other videos, show a placeholder with link
                card.innerHTML = `
                    <div class="video-wrapper">
                        <div class="video-placeholder">
                            <span class="video-icon">🎬</span>
                            <p>Video Content</p>
                            <p class="video-hint">Click to view video</p>
                        </div>
                    </div>
                    <div class="image-details">
                        <h3 class="image-title">${imageData.title}</h3>
                        <p class="image-date">${formattedDate}</p>
                    </div>
                `;
            }
        }

        // Add click event to open modal with this image's details
        card.addEventListener('click', function() {
            openModal(imageData);
        });

        return card;
    }

    // Helper function to check if a URL is a YouTube video
    function isYouTubeVideo(url) {
        // Check if the URL contains YouTube domains
        return url.includes('youtube.com') || url.includes('youtu.be');
    }

    // Helper function to get YouTube thumbnail from video URL
    function getYouTubeThumbnail(url) {
        try {
            let videoId = '';
            
            // Extract video ID from different YouTube URL formats
            if (url.includes('youtube.com/watch?v=')) {
                // Format: https://www.youtube.com/watch?v=VIDEO_ID
                videoId = url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                // Format: https://youtu.be/VIDEO_ID
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('youtube.com/embed/')) {
                // Format: https://www.youtube.com/embed/VIDEO_ID
                videoId = url.split('embed/')[1].split('?')[0];
            }
            
            // Return high-quality thumbnail URL if we found a video ID
            if (videoId) {
                return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
        } catch (error) {
            console.log('Could not extract YouTube thumbnail:', error);
        }
        
        return null;
    }

    // Helper function to get YouTube embed URL from regular URL
    function getYouTubeEmbedUrl(url) {
        try {
            let videoId = '';
            
            // Extract video ID from different YouTube URL formats
            if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('youtube.com/embed/')) {
                // Already an embed URL
                return url;
            }
            
            // Return embed URL if we found a video ID
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch (error) {
            console.log('Could not create YouTube embed URL:', error);
        }
        
        return url; // Return original URL if we can't convert it
    }

    // Function to open the modal with image details
    function openModal(imageData) {
        // Format the date for display
        const formattedDate = formatDate(imageData.date);
        
        // Create modal content based on media type
        let modalContent = '';
        
        if (imageData.media_type === 'image') {
            // For images, show the larger version
            modalContent = `
                <img src="${imageData.url}" alt="${imageData.title}" class="modal-image" />
                <h2 class="modal-title">${imageData.title}</h2>
                <p class="modal-date">${formattedDate}</p>
                <p class="modal-explanation">${imageData.explanation}</p>
            `;
        } else if (imageData.media_type === 'video') {
            // Check if this is a YouTube video for better embedding
            const isYouTube = isYouTubeVideo(imageData.url);
            
            if (isYouTube) {
                // For YouTube videos, embed the video directly in the modal
                const embedUrl = getYouTubeEmbedUrl(imageData.url);
                modalContent = `
                    <div class="video-embed-container">
                        <iframe 
                            src="${embedUrl}" 
                            title="${imageData.title}"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <h2 class="modal-title">${imageData.title}</h2>
                    <p class="modal-date">${formattedDate}</p>
                    <div class="video-links">
                        <a href="${imageData.url}" target="_blank" rel="noopener" class="modal-video-link">
                            🎬 Watch on YouTube
                        </a>
                    </div>
                    <p class="modal-explanation">${imageData.explanation}</p>
                `;
            } else {
                // For other videos, show video link and details
                modalContent = `
                    <div class="video-link-container">
                        <div class="video-preview">
                            <span class="large-video-icon">🎬</span>
                            <p>Video content available at external link</p>
                        </div>
                    </div>
                    <h2 class="modal-title">${imageData.title}</h2>
                    <p class="modal-date">${formattedDate}</p>
                    <div class="video-links">
                        <a href="${imageData.url}" target="_blank" rel="noopener" class="modal-video-link">
                            🔗 Watch Video
                        </a>
                    </div>
                    <p class="modal-explanation">${imageData.explanation}</p>
                `;
            }
        }
        
        // Insert the content into the modal
        modalBody.innerHTML = modalContent;
        
        // Show the modal
        modal.style.display = 'block';
        
        // Prevent body from scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close the modal
    function closeModal() {
        // Hide the modal
        modal.style.display = 'none';
        
        // Allow body to scroll again
        document.body.style.overflow = 'auto';
    }

    // Helper function to make dates look nicer
    function formatDate(dateString) {
        // Convert the date string to a Date object
        const date = new Date(dateString);
        
        // Format it to be more readable (like "January 15, 2024")
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        return date.toLocaleDateString('en-US', options);
    }

    // Function to show loading message (replaces placeholder)
    function showLoading() {
        gallery.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-icon">🚀</div>
                <p>Loading space images from NASA...</p>
            </div>
        `;
    }

    // Function to show error message (replaces placeholder)
    function showError(message) {
        gallery.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-icon">⚠️</div>
                <p>${message}</p>
            </div>
        `;
    }
});

// Set up the date pickers when the page loads
// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers with good default values
setupDateInputs(startInput, endInput);
