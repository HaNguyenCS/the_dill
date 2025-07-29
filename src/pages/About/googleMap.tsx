import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const PLACE_COORDS = { lat: 43.7067889, lng: -79.4789061 };
const ZOOM_LEVEL = 15;
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
const mapId = process.env.REACT_APP_GOOGLE_MAP_ID || '';
function GoogleMap() {
  return (
    <APIProvider apiKey={apiKey} libraries={['places']}>
      <Map
        id={mapId}
        mapId={mapId}
        style={{
          width: '100%',
          maxWidth: 800,
          height: 400,
          margin: '1.5rem auto',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        center={PLACE_COORDS}
        zoom={ZOOM_LEVEL}
        gestureHandling="greedy"
      >
        <AdvancedMarker position={PLACE_COORDS} />
      </Map>
    </APIProvider>
  );
}
export default GoogleMap;