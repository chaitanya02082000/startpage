import React, { useState, useEffect } from 'react';

const RandomBooruBackground = () => {
  const [imageUrl, setImageUrl] = useState('');
  const corsProxyUrl = 'https://api.allorigins.win/raw?url=';
  const danbooruApiUrl = 'https://danbooru.donmai.us/posts.json';
  const tag = 'ratio:16:9';
  const login = 'zack0208';
  const apiKey = 'YjGnPiU4J7eaYf5XDuTvMjyb';

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        
        const response = await fetch(`https://danbooru.donmai.us/posts.json?login=zack0208&api_key=YjGnPiU4J7eaYf5XDuTvMjyb&tags=ratio:16:9&page=10`  
         
            
          
         );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const imageData = await response.json();
        const randomPost = imageData[Math.floor(Math.random() * imageData.length)];
        const imageUrl = randomPost.media_asset.variants[3].url;
        setImageUrl(imageUrl);
        console.log(imageUrl)
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };
    fetchRandomImage();
  }, [danbooruApiUrl, tag, login, apiKey]);

  useEffect(() => {
    const updateBackgroundImage = () => {
      if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
      }
    };
    updateBackgroundImage();
  }, [imageUrl]);

  return (
    <div>
      <h1>Random Booru Background</h1>
      <button onClick={() => window.location.reload()}>Refresh Background</button>
    </div>
  );
};

export default RandomBooruBackground;