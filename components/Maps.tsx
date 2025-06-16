"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

interface Marker {
  lat: number;
  lng: number;
  title: string;
}

interface GoogleMapsProps {
  markers?: Marker[]; // Optional markers
}

function GoogleMaps({ markers = [] }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
        version: "quarterly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      if (!mapRef.current) return;

      // Default center: Ulaanbaatar coordinates
      const defaultCenter = { lat: 47.8864, lng: 106.9057 };

      // Map options including mapId for advanced markers
      const options: google.maps.MapOptions = {
        center: defaultCenter,
        zoom: 10,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        mapId: process.env.NEXT_PUBLIC_MAP_ID || "", // Add your Map ID here
      };

      // Initialize map
      const map = new Map(mapRef.current, options);
      mapInstance.current = map;

      // Try to import AdvancedMarkerElement (new marker API)
      let AdvancedMarkerElement:
        | typeof google.maps.marker.AdvancedMarkerElement
        | null = null;
      try {
        const markerLib = (await loader.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;
        AdvancedMarkerElement = markerLib.AdvancedMarkerElement;
      } catch (e) {
        console.warn(
          "AdvancedMarkerElement not available, fallback to regular markers"
        );
      }

      // Function to add marker, uses AdvancedMarker if available
      const addMarker = (
        position: google.maps.LatLngLiteral,
        title: string
      ) => {
        if (AdvancedMarkerElement) {
          new AdvancedMarkerElement({
            position,
            title,
            map,
          });
        } else {
          // fallback to regular marker
          new google.maps.Marker({
            position,
            title,
            map,
          });
        }
      };

      // Add passed markers
      markers.forEach((markerData) => {
        addMarker(
          { lat: markerData.lat, lng: markerData.lng },
          markerData.title
        );
      });

      // Try to get user's current location and add marker
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(userLocation);
            map.setZoom(12);
            addMarker(userLocation, "Your location");
          },
          (error) => {
            console.warn("Error getting user location:", error);
            // Map stays centered on Ulaanbaatar if no user location
          }
        );
      }
    };

    initMap();
  }, [markers]);

  return <div ref={mapRef} className="w-full h-screen" />;
}

export default GoogleMaps;
