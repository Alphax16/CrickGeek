import React, { useEffect } from "react";
import { Marker as LeafletMarker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";


const Marker = ({ loc, lat, long, map }) => {
  useEffect(() => {
    const addMarkerToMap = async (loc, lat, long, map) => {
      try {
        console.log(loc, lat, long, map);
        if (map) {
          const customIcon = L.icon({
            iconUrl: markerIconPng,
            iconSize: [30, 30],
          });

          const marker = new LeafletMarker([lat, long], { icon: customIcon }).addTo(map);
          marker.bindPopup(loc);
        } else {
          console.warn("Map prop is not available.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    addMarkerToMap(loc, parseFloat(lat), parseFloat(long), map);
  }, [loc, lat, long, map]);

  return null;
};

export default Marker;
