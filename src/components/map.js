import React from "react";

export default function Map({ imageUrl }) {
  return (
    // Map component
    <div className="mini-map-container">
      <div className="image-wrapper">
        <h1>Bản đồ khu bảo tàng</h1>
        <img className="mini-map" src={imageUrl} alt="map" />
      </div>
    </div>
  );
}
