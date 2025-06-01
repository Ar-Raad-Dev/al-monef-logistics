
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { Locale } from '@/lib/dictionaries';
import { cn } from '@/lib/utils';

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
  const isMounted = useRef(false);
  // Status to manage different phases: loading script, map initialized, or error
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  // Store specific error messages
  const [internalErrorMessage, setInternalErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    isMounted.current = true;
    console.log(`[${lang}] GoogleMapComponent effect triggered. API Key: ${apiKey ? 'Present' : 'MISSING'}`);

    if (!apiKey) {
      console.error(`[${lang}] Google Maps API Key is missing.`);
      if (isMounted.current) {
        setInternalErrorMessage(noApiKeyMessage);
        setStatus('error');
      }
      return;
    }

    if (!mapRef.current) {
      console.error(`[${lang}] mapRef.current is null during useEffect setup. This might be a timing issue or the div isn't rendered.`);
      if (isMounted.current) {
        setInternalErrorMessage("Map container element not found in DOM at setup.");
        setStatus('error');
      }
      return;
    }
    
    console.log(`[${lang}] Attempting to load Google Maps (Center: ${center.lat},${center.lng})`);
    if (isMounted.current) {
      setStatus('loading');
      setInternalErrorMessage(null);
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['marker'],
      language: lang,
    });

    loader.load().then(async (google) => {
      if (!isMounted.current) {
        console.log(`[${lang}] GoogleMapComponent unmounted before map could be initialized.`);
        return;
      }
      if (!mapRef.current) {
        console.error(`[${lang}] mapRef.current is null AFTER Google Maps API script loaded.`);
        if (isMounted.current) {
          setInternalErrorMessage("Map container (ref) became null post-API load. Please try refreshing.");
          setStatus('error');
        }
        return;
      }

      console.log(`[${lang}] Google Maps API script loaded. mapRef.current is available. Initializing map.`);
      try {
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
          console.log(`[${lang}] Marker added to map at:`, markerPosition);
        }

        if (isMounted.current) {
          setStatus('loaded');
        }
        console.log(`[${lang}] Map initialization complete.`);
      } catch (initError) {
        console.error(`[${lang}] Error initializing Google Map instance:`, initError);
        if (isMounted.current) {
          setInternalErrorMessage(initError instanceof Error ? initError.message : "Failed to initialize map instance.");
          setStatus('error');
        }
      }
    }).catch(e => {
      if (!isMounted.current) {
        console.log(`[${lang}] GoogleMapComponent unmounted before map loading error could be processed.`);
        return;
      }
      console.error(`[${lang}] Error loading Google Maps API script:`, e);
      const specificMessage = e.message || "Failed to load map script. Check API key, network, and browser console for Google API errors.";
      if (isMounted.current) {
        setInternalErrorMessage(specificMessage);
        setStatus('error');
      }
    });

    return () => {
      isMounted.current = false;
      console.log(`[${lang}] GoogleMapComponent effect cleanup.`);
      // The map instance is tied to the mapRef.current div.
      // When this component unmounts (e.g. due to key change or navigation),
      // React removes mapRef.current from the DOM, and the Google Maps instance
      // associated with it is effectively cleaned up by the browser/API.
      // The @googlemaps/js-api-loader also handles cleaning up the <script> tag it might have added.
    };
  }, [apiKey, center.lat, center.lng, zoom, markerPosition?.lat, markerPosition?.lng, markerTitle, mapId, lang, noApiKeyMessage, loadingMessage]);


  return (
    <div className="h-full w-full relative">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground p-4 animate-pulse z-20">
          {loadingMessage}...
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 text-destructive p-4 text-center text-sm z-20">
          {internalErrorMessage || "An unexpected error occurred."}
        </div>
      )}
      <div
        ref={mapRef}
        className={cn(
          "h-full w-full rounded-lg overflow-hidden border border-border",
          // Make map container less prominent until loaded to avoid flicker or showing empty div
          status !== 'loaded' ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'
        )}
        // Ensure the map div itself does not have React children that would conflict
      />
    </div>
  );
};

export default GoogleMapComponent;
