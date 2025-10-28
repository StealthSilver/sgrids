"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useTheme } from "next-themes";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FC } from "react";
import "@/app/globals.css";


// 📍 Coordinates for Smart Grid Analytics (Bengaluru)
const position: [number, number] = [12.9716, 77.5946];

// 🌗 Map URLs for dark and light themes
const darkUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const lightUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export const MapComponent: FC = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-[350px] rounded-md overflow-hidden shadow-md border border-gray-300 dark:border-gray-700">
      <MapContainer
        center={position as L.LatLngExpression}  // ✅ Explicit cast fixes TS error
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={theme === "dark" ? darkUrl : lightUrl}
          attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
        />
        <Marker position={position as L.LatLngExpression}>
          <Popup>
            <strong>Smart Grid Analytics</strong>
            <br />
            Bengaluru, Karnataka
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
