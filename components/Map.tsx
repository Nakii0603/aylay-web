'use client'; // Next.js 13/14 client component

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the Location type
type Location = {
  position: [number, number];
  title: string;
  image: string;
  description: string;
};

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

// Correctly typed locations array
const locations: Location[] = [
  {
    title: 'Гандан хийд',
    position: [47.9187, 106.9177],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Gandan_Monastery.jpg',
    description: 'Буддын шашны гол хийд.',
  },
  {
    title: 'Сүхбаатарын талбай',
    position: [47.9155, 106.9102],
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Sukhbaatar_square_2017.jpg',
    description: 'Улаанбаатарын төв талбай.',
  },
];

export default function CustomMap() {
  return (
    <MapContainer
      center={[47.918873, 106.917701]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((loc: Location, index: number) => (
        <Marker key={index} position={loc.position} icon={customIcon}>
          <Popup>
            <h3>{loc.title}</h3>
            <img src={loc.image} alt={loc.title} width="200" />
            <p>{loc.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
