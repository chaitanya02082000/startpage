import React, { useState, useEffect } from 'react';

const RandomBooruBackground = () => {
  const [imageUrl, setImageUrl] = useState('');
  const danbooruApiUrl = 'https://danbooru.donmai.us/posts/random.json';
  const apiKey = 'YYjGnPiU4J7eaYf5XDuTvMjyb';
  const login = 'zack0208';

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch(danbooruApiUrl );
        const imageData = await response.json();
        const imageUrl = imageData.file_url;
        setImageUrl(imageUrl);
        console.log(imageData)
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };
    fetchRandomImage();
  }, [danbooruApiUrl, apiKey, login]);

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