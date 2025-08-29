import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <MapContainer center={[-6.6, 106.8]} zoom={11} style={{ height: "300px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapView;
