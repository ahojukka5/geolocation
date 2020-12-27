import React, { useEffect, useState } from 'react';

const App = () => {
  const [position, setPosition] = useState();
  const [message, setMessage] = useState('initializing app');

  const success = (pos) => {
    var crd = pos.coords;
    setPosition(crd);
  };

  const errors = (err) => {
    setMessage(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    const getPosition = async () => {
      if (!navigator.geolocation) {
        setMessage('navigator.geolocation not found');
        return;
      }
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setMessage(`result.state = ${result.state}`);
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(success);
      } else if (result.state === 'prompt') {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(success, errors, options);
      }
    };
    getPosition();
  }, []);

  return (
    <div>
      <h2>GeoLocation</h2>
      <p>message: {message}</p>
      {position && (
        <div>
          <div>Your current position is:</div>
          <div>Latitude: {position.latitude}</div>
          <div>Longitude: {position.longitude}</div>
          <div>Accuracy: {position.accuracy} meters</div>
        </div>
      )}
    </div>
  );
};

export default App;
