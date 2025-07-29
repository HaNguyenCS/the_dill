import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import GoogleMap from './googleMap.tsx';

export default function About() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  return (
    <div style={{ padding: '2rem', backgroundColor: '#FFF8E7' }}>
      <h1 style={{
        textAlign: 'center',
        fontFamily: 'Playfair Display, serif',
        color: '#385D30'
      }}>
        About Us
      </h1>
      <APIProvider apiKey={apiKey}>
        <GoogleMap />
      </APIProvider>
      <p style={{
        maxWidth: 800,
        margin: '1rem auto',
        fontFamily: 'Montserrat, sans-serif',
        color: '#555'
      }}>
        We’re proud to serve authentic Bánh Mì in the heart of the city.  
        Come visit us at our flagship location!
      </p>
    </div>
  );
}
