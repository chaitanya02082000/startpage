import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackgroundImageFetcher = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booru API endpoints (choose your preferred source)
  const booruAPIs = [
    'https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=random%3A1',
    'https://konachan.com/post.json?limit=1&tags=order:random',
    'https://yande.re/post.json?limit=1&tags=order:random'
  ];

  const fetchRandomImage = async () => {
    try {
      setLoading(true);
      // Randomly select a Booru API
      const selectedAPI = booruAPIs[Math.floor(Math.random() * booruAPIs.length)];
      
      const response = await axios.get(selectedAPI, {
        headers: {
          'User-Agent': 'YourAppName/1.0'
        }
      });

      // Extract image URL based on the specific Booru API response structure
      let imageUrl;
      if (selectedAPI.includes('gelbooru')) {
        imageUrl = response.data[0]?.file_url;
      } else {
        imageUrl = response.data[0]?.file_url || response.data[0]?.image_url;
      }

      if (imageUrl) {
        setBackgroundImage(imageUrl);
        setError(null);
      } else {
        throw new Error('No image found');
      }
    } catch (err) {
      console.error('Error fetching image:', err);
      setError('Failed to fetch image');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomImage();
    
    // Optional: Refresh image periodically
    const intervalId = setInterval(fetchRandomImage, 3600000); // Every hour
    
    return () => clearInterval(intervalId);
  }, []);

  // Styling for full-screen background
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
    filter: 'brightness(0.7)', // Optional: dim the background slightly
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      <div style={backgroundStyle}>
        {/* Your start page content goes here */}
        <div style={{color: 'white', padding: '20px'}}>
          <h1>Welcome to Your Start Page</h1>
          {backgroundImage && (
            <button onClick={fetchRandomImage}>
              Refresh Background
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageFetcher;