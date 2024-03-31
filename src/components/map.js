import React, { useState, useEffect } from 'react';

function DynamicImageComponent({imageUrl = 'https://cdn.britannica.com/37/245037-050-79129D52/world-map-continents-oceans.jpg'}) {
  // const [imageUrl, setImageUrl] = useState('/default-image.jpg'); // Set a default image URL

  // useEffect(() => {
  //   // Function to load a new image after a delay (e.g., 3 seconds)
  //   const loadNewImage = setTimeout(() => {
  //     setImageUrl('/images/mapedit.png'); // Load a new image after the delay
  //   }, 3000); // Change the delay as needed (in milliseconds)

  //   // Cleanup function to clear the timeout when the component unmounts
  //   return () => clearTimeout(loadNewImage);
  // }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <div className='dynamic-image-container'>
      <div className='image-wrapper'>
      <h1>Bản đồ khu bảo tàng</h1>
        <img className="dynamic-image" src={imageUrl} alt="Description of the image" />
      </div>
    </div>
  );

}

export default DynamicImageComponent;
