
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { Locale } from '@/lib/dictionaries';

interface GoogleMapProps {
  apiKey: string | undefined;
  center: { lat: number; lng: number };
  zoom?: number;
  markerPosition?: { lat: number; lng: number };
  markerTitle?: string;
  mapId?: string;
  lang: Locale;
  noApiKeyMessage: string;
  loadingMessage: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  apiKey,
  center,
  zoom = 15,
  markerPosition,
  markerTitle = 'Location',
  mapId,
  lang,
  noApiKeyMessage,
  loadingMessage,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset states on re-render if apiKey or critical props change
    setIsLoading(true);
    setError(null);

    if (!apiKey) {
      console.error("Google Maps API Key is missing.");
      setError(noApiKeyMessage);
      setIsLoading(false);
      return;
    }

    console.log("Attempting to load Google Maps with API Key and language:", lang);

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['marker'], // 'maps' and 'marker' are distinct libraries
      language: lang,
      // region: lang === 'ar' ? 'SA' : undefined // Optional: hint region
    });

    loader.load().then(async (google) => {
      console.log("Google Maps API script loaded successfully.");
      if (mapRef.current) {
        console.log("Map container ref is available. Initializing map.");
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapId: mapId || 'DEMO_MAP_ID', 
          disableDefaultUI: false,
        });

        if (markerPosition) {
          new AdvancedMarkerElement({
            map: map,
            position: markerPosition,
            title: markerTitle,
          });
          console.log("Marker added to map at:", markerPosition);
        }
        setIsLoading(false);
        console.log("Map initialization complete.");
      } else {
        console.error("Map container ref (mapRef.current) is null after API load.");
        setError("Map container not found. Please try refreshing.");
        setIsLoading(false);
      }
    }).catch(e => {
      console.error("Error loading or initializing Google Maps:", e);
      // Check if the error object has a more specific message
      const errorMessage = e.message || "Failed to load map. Check browser console for details from Google Maps API, ensure your API key is valid, correctly configured in Google Cloud Console (Maps JavaScript API enabled, billing active, no restrictive referrers for localhost), and that your .env.local file is correct (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY) and server was restarted.";
      setError(errorMessage);
      setIsLoading(false);
    });

  // Key dependencies that should trigger re-load
  }, [apiKey, center.lat, center.lng, zoom, markerPosition?.lat, markerPosition?.lng, markerTitle, mapId, lang, noApiKeyMessage, loadingMessage]);


  if (error) {
    return <div className="flex items-center justify-center h-full w-full bg-destructive/10 text-destructive p-4 rounded-lg text-center text-sm">{error}</div>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground p-4 rounded-lg animate-pulse">{loadingMessage}...</div>;
  }

  return <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden border border-border" />;
};

export default GoogleMapComponent;
