import React, { useEffect, useState } from "react";
import axios from "axios";

const DanbooruBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchRandomBackgroundImage = async () => {
      try {
        const response = await axios.get(
          "https://danbooru.donmai.us/posts.json",
          {
            params: {
              limit: 1, // Fetch a single random image
              tags: "ratio:16:9 order:random", // Use the `order:random` meta-tag
            },
          }
        );

        if (response.data && response.data.length > 0) {
          setBackgroundImage(response.data[0].file_url);
        }
      } catch (error) {
        console.error("Error fetching image from Danbooru:", error);
      }
    };

    fetchRandomBackgroundImage();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        {/* Your content */}
    </div>
  );
};

export default DanbooruBackground;
