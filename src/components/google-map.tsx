
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
    // console.log(`[${lang}] GoogleMapComponent effect triggered. API Key: ${apiKey ? 'Present' : 'MISSING'}`);

    if (!apiKey) {
      console.error(`[${lang}] Google Maps API Key is missing.`);
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
    
    // console.log(`[${lang}] Attempting to load Google Maps (Center: ${center.lat},${center.lng})`);
    if (isMounted.current) {
      setStatus('loading');
      setInternalErrorMessage(null);
    }

    // Workaround for js-api-loader singleton issue with dynamic options
    const GmapsLoader = Loader as any; // Type assertion for internal access
    if (GmapsLoader.instance && GmapsLoader.instance.options.language !== lang) {
      console.warn(
        `Google Maps Loader instance detected with language '${GmapsLoader.instance.options.language}', but current language is '${lang}'. ` +
        `Resetting loader instance to allow re-initialization with new language.`,
        { previousOptions: GmapsLoader.instance.options, newLanguage: lang }
      );
      GmapsLoader.instance = null; // Modify internal static property
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['marker'],
      language: lang, // This is the critical option that was causing conflict
      id: '__googleMapsScriptId', // Explicitly set the ID, though it's the default
    });

    loader.load().then(async (google) => {
      if (!isMounted.current) {
        // console.log(`[${lang}] GoogleMapComponent unmounted before map could be initialized.`);
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

      // console.log(`[${lang}] Google Maps API script loaded. Initializing map.`);
      try {
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapId: mapId || 'DEMO_MAP_ID', // It's good practice to use your own Map ID in production
          disableDefaultUI: false,
        });

        if (markerPosition) {
          new AdvancedMarkerElement({
            map: map,
            position: markerPosition,
            title: markerTitle,
          });
          // console.log(`[${lang}] Marker added to map at:`, markerPosition);
        }

        if (isMounted.current) {
          setStatus('loaded');
        }
        // console.log(`[${lang}] Map initialization complete.`);
      } catch (initError) {
        console.error(`[${lang}] Error initializing Google Map instance:`, initError);
        if (isMounted.current) {
          setInternalErrorMessage(initError instanceof Error ? initError.message : "Failed to initialize map instance.");
          setStatus('error');
        }
      }
    }).catch(e => {
      if (!isMounted.current) {
        // console.log(`[${lang}] GoogleMapComponent unmounted before map loading error could be processed.`);
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
      // console.log(`[${lang}] GoogleMapComponent effect cleanup. mapRef.current:`, mapRef.current);
      
      // Clear the map container's content. The map instance itself is managed by the Maps API
      // and should be garbage collected when its DOM element is removed or cleared.
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
        // console.log(`[${lang}] mapRef.current content cleared.`);
      }

      // Removing the script tag explicitly can sometimes help ensure a cleaner state 
      // for subsequent loads, though the Loader instance reset is the primary fix here.
      const script = document.getElementById('__googleMapsScriptId');
      if (script) {
        script.remove();
        // console.log(`[${lang}] Google Maps script tag (__googleMapsScriptId) removed.`);
      }
      // No need to delete window.google.maps as Loader.instance = null should allow
      // the loader to re-evaluate its state upon next instantiation.
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
