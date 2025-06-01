
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
  // Status to manage different phases: loading script, map initialized, or error
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  // Store specific error messages
  const [internalErrorMessage, setInternalErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Immediately set to error if API key is missing
    if (!apiKey) {
      console.error(`[${lang}] Google Maps API Key is missing.`);
      if (isMounted) {
        setInternalErrorMessage(noApiKeyMessage);
        setStatus('error');
      }
      return;
    }

    // If mapRef.current is null here, it means the div hasn't been rendered by React yet.
    // This effect will run after the initial render where mapRef is assigned.
    if (!mapRef.current) {
        console.warn(`[${lang}] mapRef.current is null during useEffect setup. This is unexpected if component is mounted.`);
        // This state indicates a problem with the component's own rendering, not API loading yet.
        if (isMounted) {
            setInternalErrorMessage("Map container element not found in DOM.");
            setStatus('error');
        }
        return;
    }
    
    console.log(`[${lang}] Attempting to load Google Maps (API Key: ${apiKey ? '******' : 'MISSING'}, Center: ${center.lat},${center.lng})`);
    if (isMounted) {
      setStatus('loading'); // Reset status on re-run (e.g., lang change)
      setInternalErrorMessage(null); // Clear previous errors
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['marker'],
      language: lang,
    });

    loader.load().then(async (google) => {
      if (!isMounted) {
        console.log(`[${lang}] GoogleMapComponent unmounted before map could be initialized.`);
        return;
      }
      if (!mapRef.current) {
        // This is the critical error from before
        console.error(`[${lang}] mapRef.current is null AFTER Google Maps API script loaded, but component is still mounted. The map div might have been removed.`);
        if (isMounted) {
          setInternalErrorMessage("Map container (ref) became null. Please try refreshing.");
          setStatus('error');
        }
        return;
      }

      console.log(`[${lang}] Google Maps API script loaded. mapRef.current is available. Initializing map.`);
      try {
        // Ensure the map div is clear before Google Maps initializes over it
        // mapRef.current.innerHTML = ''; // Usually not necessary, Maps SDK handles this.

        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapId: mapId || 'DEMO_MAP_ID', // Using DEMO_MAP_ID if no mapId is provided
          disableDefaultUI: false,
        });

        if (markerPosition) {
          new AdvancedMarkerElement({
            map: map,
            position: markerPosition,
            title: markerTitle,
          });
          console.log(`[${lang}] Marker added to map at:`, markerPosition);
        }

        if (isMounted) {
          setStatus('loaded');
        }
        console.log(`[${lang}] Map initialization complete.`);
      } catch (initError) {
        console.error(`[${lang}] Error initializing Google Map instance:`, initError);
        if (isMounted) {
          setInternalErrorMessage(initError instanceof Error ? initError.message : "Failed to initialize map instance.");
          setStatus('error');
        }
      }
    }).catch(e => {
      if (!isMounted) {
        console.log(`[${lang}] GoogleMapComponent unmounted before map loading error could be processed.`);
        return;
      }
      console.error(`[${lang}] Error loading Google Maps API script:`, e);
      const specificMessage = e.message || "Failed to load map script. Check API key, network, and browser console for Google API errors.";
      if (isMounted) {
        setInternalErrorMessage(specificMessage);
        setStatus('error');
      }
    });

    return () => {
      isMounted = false;
      console.log(`[${lang}] GoogleMapComponent effect cleanup. isMounted set to false.`);
      // If you were storing the map instance (e.g., in a ref: mapInstanceRef.current),
      // you might call mapInstanceRef.current.dispose() or similar map-specific cleanup here.
      // The js-api-loader handles the <script> tag cleanup automatically.
    };
  }, [apiKey, center.lat, center.lng, zoom, markerPosition?.lat, markerPosition?.lng, markerTitle, mapId, lang, noApiKeyMessage, loadingMessage]);


  return (
    <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden border border-border">
      {status === 'loading' && (
        <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground p-4 animate-pulse">
          {loadingMessage}...
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center h-full w-full bg-destructive/10 text-destructive p-4 text-center text-sm">
          {internalErrorMessage || "An unexpected error occurred."}
        </div>
      )}
      {/* When status is 'loaded', this div will be empty, and Google Maps will have populated mapRef.current */}
    </div>
  );
};

export default GoogleMapComponent;
