import { useState, useEffect } from "react";

const CurrentLocation = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      });
    }
  }, []);

  return (
    <div className="current-location">
      <h2>Current Location</h2>
      <p>Latitude: {coordinates.latitude}</p>
      <p>Longitude: {coordinates.longitude}</p>
    </div>
  );
};

export default CurrentLocation;
