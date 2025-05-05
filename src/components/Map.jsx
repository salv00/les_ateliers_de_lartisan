
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported
import L from 'leaflet'; // Import Leaflet library itself

// Fix for default Leaflet marker icon issue with build tools like Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


export function Map() {
  // Nouvelles coordonnées fournies par l'utilisateur
  const position = [48.15197214038225, 7.251657843589784]; 
  const address = "18 Rue du Schossrain, 68240 Kaysersberg Vignoble"; // Keep address consistent

  return (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-lg relative z-10 border border-border">
      <MapContainer 
        center={position} 
        zoom={16} // Slightly more zoomed in
        scrollWheelZoom={false} // Disable scroll wheel zoom for better page scroll experience
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold mb-1 text-base text-primary">Les Ateliers de l'Artisan</h3>
              <p className="text-sm mb-2">{address.split(',')[0]}<br />{address.split(',')[1].trim()}</p>
              <Button 
                variant="default"
                size="sm" // Smaller button
                className="w-full flex items-center justify-center gap-1.5"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`, '_blank', 'noopener,noreferrer')}
              >
                <MapPin className="w-3.5 h-3.5" />
                Itinéraire
              </Button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
  