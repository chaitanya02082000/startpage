import React, { useState, useEffect, useRef } from 'react';

const RandomBooruBackground = () => {
  const [imageUrl, setImageUrl] = useState('');
  const danbooruApiUrl = 'https://danbooru.donmai.us/posts.json';
  const tag = 'ratio:16:9';
  const login = 'zack0208';
  const apiKey = 'YjGnPiU4J7eaYf5XDuTvMjyb';
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    let ignore = false;
    const fetchRandomImage = async () => {
      try {
        const randomPageNumber = Math.floor(Math.random() * 100) + 1;
        const response = await fetch(
          `${danbooruApiUrl}?login=${login}&api_key=${apiKey}&tags=${tag}&page=${randomPageNumber}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const imageData = await response.json();
        if (imageData.length === 0) {
          console.warn(
            `No images found on page ${randomPageNumber}, trying a different page.`
          );
          fetchRandomImage();
          return;
        }
        const randomPost =
          imageData[Math.floor(Math.random() * imageData.length)];
        const imageUrl = randomPost.media_asset.variants[3].url;
        if (!ignore && isMounted.current) {
          setImageUrl(imageUrl);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Error fetching random image:', error);
        }
      }
    };

    fetchRandomImage();

    return () => {
      ignore = true;
      isMounted.current = false;
    };
  }, [login, apiKey, tag]);

  useEffect(() => {
    if (imageUrl) {
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
    }
  }, [imageUrl]);

  return (
    <div>
      <h1>Random Booru Background</h1>
      <button onClick={() => window.location.reload()}>
        Refresh Background
      </button>
    </div>
  );
};

export default RandomBooruBackground;