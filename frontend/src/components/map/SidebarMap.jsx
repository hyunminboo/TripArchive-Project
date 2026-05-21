import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet with react
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: iconRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14);
    }
  }, [center, map]);
  return null;
};

const SidebarMap = ({ onSelectPlace, isModalOpen, setIsModalOpen }) => {
  const [position, setPosition] = useState(null); // {lat, lng}
  const [searchQuery, setSearchQuery] = useState('');
  const [tempPlaceName, setTempPlaceName] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const newPos = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
        setPosition(newPos);
        setTempPlaceName(result.display_name);
      } else {
        alert('검색 결과가 없습니다.');
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  const handleLocationSelect = async (latlng) => {
    setPosition(latlng);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lon || latlng.lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setTempPlaceName(data.display_name);
      } else {
        setTempPlaceName('알 수 없는 위치');
      }
    } catch (error) {
      console.error('위치 정보 가져오기 오류:', error);
      setTempPlaceName('위치 정보 오류');
    }
  };

  const handleConfirm = () => {
    if (tempPlaceName) {
      onSelectPlace(tempPlaceName);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        className="sidebar-map-trigger" 
        onClick={() => setIsModalOpen(true)}
      >
        <img src="/images/globe_icon_gray.svg" alt="지도 검색" width={22} height={22} />
        <span>지도 검색하기</span>
      </button>

      {isModalOpen && createPortal(
        <div className="map-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-header">
              <h3>지도에서 위치 찾기</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSearch} className="map-modal-search">
              <input
                type="text"
                placeholder="장소 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">검색</button>
            </form>
            
            <div className="map-modal-map-wrapper">
              <MapContainer 
                center={position || [37.5665, 126.9780]} 
                zoom={11} 
                style={{ height: '350px', width: '100%', borderRadius: '12px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {position && <Marker position={position} />}
                <MapClickHandler onLocationSelect={handleLocationSelect} />
                <MapUpdater center={position} />
              </MapContainer>
            </div>
            
            <div className="map-modal-footer">
              <div className="temp-place">{tempPlaceName || '지도를 클릭하여 위치를 선택하세요'}</div>
              <button 
                className="confirm-btn" 
                onClick={handleConfirm}
                disabled={!position}
              >
                이 위치로 설정
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default SidebarMap;
