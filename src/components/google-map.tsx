
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
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [internalErrorMessage, setInternalErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    isMounted.current = true;
    console.log(`[GoogleMapComponent Client] Received apiKey prop: ${apiKey ? 'Present' : 'MISSING or Empty'}`, 'Value (first 5 chars):', apiKey?.substring(0,5));


    if (!apiKey) {
      console.error(`[${lang}] Google Maps API Key is missing in GoogleMapComponent prop.`);
      if (isMounted.current) {
        setInternalErrorMessage(noApiKeyMessage);
        setStatus('error');
      }
      return;
    }

    if (!mapRef.current) {
      console.error(`[${lang}] mapRef.current is null during useEffect setup.`);
      if (isMounted.current) {
        setInternalErrorMessage("Map container element not found in DOM at setup.");
        setStatus('error');
      }
      return;
    }
    
    if (isMounted.current) {
      setStatus('loading');
      setInternalErrorMessage(null);
    }

    const GmapsLoader = Loader as any; 
    if (GmapsLoader.instance && GmapsLoader.instance.options.language !== lang) {
      console.warn(
        `Google Maps Loader instance detected with language '${GmapsLoader.instance.options.language}', but current language is '${lang}'. Resetting loader instance.`,
        { previousOptions: GmapsLoader.instance.options, newLanguage: lang }
      );
      GmapsLoader.instance = null; 
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['marker'],
      language: lang, 
      id: '__googleMapsScriptId', 
    });

    loader.load().then(async (google) => {
      if (!isMounted.current) {
        return;
      }
      if (!mapRef.current) {
        console.error(`[${lang}] mapRef.current is null AFTER Google Maps API script loaded.`);
        if (isMounted.current) {
          setInternalErrorMessage("Map container (ref) became null post-API load.");
          setStatus('error');
        }
        return;
      }

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
        }

        if (isMounted.current) {
          setStatus('loaded');
        }
      } catch (initError) {
        console.error(`[${lang}] Error initializing Google Map instance:`, initError);
        if (isMounted.current) {
          setInternalErrorMessage(initError instanceof Error ? initError.message : "Failed to initialize map instance.");
          setStatus('error');
        }
      }
    }).catch(e => {
      if (!isMounted.current) {
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
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
      const script = document.getElementById('__googleMapsScriptId');
      if (script) {
        script.remove();
      }
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
          {internalErrorMessage || "An unexpected error occurred with the map."}
        </div>
      )}
      <div
        ref={mapRef}
        className={cn(
          "h-full w-full rounded-lg overflow-hidden border border-border",
          status !== 'loaded' ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'
        )}
      />
    </div>
  );
};

export default GoogleMapComponent;
