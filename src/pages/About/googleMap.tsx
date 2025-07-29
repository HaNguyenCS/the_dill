import React, { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

const ADDRESS = 'The Dill Banh Mi, 32 Coleville Rd, North York, ON M2J 4K6';
const DEFAULT_CENTER = { lat: 43.7067889, lng: -79.4763312 };

function GoogleMap() {
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(DEFAULT_CENTER);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
    const mapId  = process.env.REACT_APP_GOOGLE_MAP_ID!;
    const [markerRef, marker] = useAdvancedMarkerRef();
    
    useEffect(() => {
        if (!window.google?.maps?.Geocoder) return;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: ADDRESS }, (results, status) => {
        if (results && status === 'OK' && results[0]) {
            const loc = results[0].geometry.location;
            setCenter({ lat: loc.lat(), lng: loc.lng() });
        } else {
            console.error('Geocode failed:', status);
        }
        });
    }, []);

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                id="about-map"
                mapId={mapId}
                center={center}
                zoom={16}
                gestureHandling="greedy"
                style={{
                width: '100%',
                maxWidth: 800,
                height: 400,
                margin: '2rem auto',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            >
                <AdvancedMarker position={center} />
                {/* <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    position={center}
                    >
                    This is an example for the{' '}
                    <code style={{whiteSpace: 'nowrap'}}>&lt;AdvancedMarker /&gt;</code>{' '}
                    combined with an Infowindow.
                </InfoWindow> */}
            </Map>
        </APIProvider>
    );
}
export default GoogleMap;