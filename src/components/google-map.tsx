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
    if (!apiKey) {
      setError(noApiKeyMessage);
      setIsLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['marker'],
      language: lang,
    });

    loader.load().then(async (google) => {
      if (mapRef.current) {
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapId: mapId || 'DEMO_MAP_ID', // Use a default map ID or a user-provided one
          disableDefaultUI: false,
        });

        if (markerPosition) {
          new AdvancedMarkerElement({
            map: map,
            position: markerPosition,
            title: markerTitle,
          });
        }
        setIsLoading(false);
      }
    }).catch(e => {
      console.error("Error loading Google Maps: ", e);
      setError("Failed to load map. Please check the console for details or ensure your API key is valid and has the Maps JavaScript API enabled.");
      setIsLoading(false);
    });
  // Ensure effect re-runs if key props change, though most are static for this use case.
  }, [apiKey, center.lat, center.lng, zoom, markerPosition?.lat, markerPosition?.lng, markerTitle, mapId, lang, noApiKeyMessage, loadingMessage]);


  if (error) {
    return <div className="flex items-center justify-center h-full w-full bg-muted text-destructive p-4 rounded-lg text-center">{error}</div>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground p-4 rounded-lg">{loadingMessage}...</div>;
  }

  return <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden" />;
};

export default GoogleMapComponent;
