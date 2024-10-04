


"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L from 'leaflet';

// Importing Map components dynamically to avoid server-side rendering issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });



  

const MapGoogle = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [polylinePositions, setPolylinePositions] = useState<[number, number][]>([]);
  const [Geocoder, setGeocoder] = useState<any>(null); // To store dynamically imported Geocoder


//   const customIcon = new L.Icon({
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32]
//   });

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      

      const getCurrentLocation = async () => {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setPosition([position.coords.latitude, position.coords.longitude]);
        } catch (error) {
          console.error("Error getting current location:", error);
        }
      };

      getCurrentLocation();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && position) {
      const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await response.json();
          setAddress(data.display_name);
        } catch (error) {
          console.error("Error getting address from coordinates:", error);
        }
      };

      const [latitude, longitude] = position;
      getAddressFromCoordinates(latitude, longitude);
    }
  }, [position]);

  useEffect(() => {
    if (typeof window !== 'undefined' && position && selectedPosition) {
      const [lat1, lon1] = position;
      const [lat2, lon2] = selectedPosition;
      const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const dist = data.routes[0].distance / 1000; // convert to kilometers
          setDistance(dist.toFixed(2)); // round to 2 decimal places
        })
        .catch(error => {
          console.error("Error calculating distance:", error);
        });
    }
  }, [position, selectedPosition]);

//   const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = e.target.value;
//     if (!searchTerm) {
//       setSelectedPosition(null);
//       setPolylinePositions([]);
//       return;
//     }

//     if (typeof window !== 'undefined') {
//       if (!Geocoder) {
//         const { default: L } = await import('leaflet-control-geocoder');
//         setGeocoder((L.Control as any).Geocoder.nominatim());
//       }
      
//       if (Geocoder) {
//         Geocoder.geocode(searchTerm, (results: any[]) => {
//           if (results && results.length > 0) {
//             const latlng: [number, number] = [results[0].center.lat, results[0].center.lng];
//             setSelectedPosition(latlng);
//             setPolylinePositions([position!, latlng]); // Update polyline positions
//           }
//         });
//       }
//     }
//   };

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setSelectedPosition(null);
      setPolylinePositions([]);
      return;
    }

    if (typeof window !== 'undefined') {
      import('leaflet-control-geocoder').then(() => {
        const geocoder = (window as any).L.Control.Geocoder.nominatim();
        geocoder.geocode(searchTerm, (results: any[]) => {
          if (results && results.length > 0) {
            const latlng: [number, number] = [results[0].center.lat, results[0].center.lng];
            setSelectedPosition(latlng);
            setPolylinePositions([position!, latlng]); // Update polyline positions
          }
        });
      });
    }
  };

  return (
    <div className='w-[80%] mx-auto mb-[2rem]'>
      <div className='flex flex-col space-y-[1rem]'>
       
        <p> {address || 'Loading...'}</p>
        {position && selectedPosition && <p>Distance: {distance} km</p>}
        {position ? (
          <div className='relative flex justify-center '>
              <input type="text" placeholder="Enter your address..." onChange={handleSearch} className='absolute z-[9999] w-[15rem] md:w-[30rem] outline-none border  h-[2rem] px-2 ring-2 bottom-0 right-0' />
          <MapContainer center={position} zoom={14} style={{ height: '500px', width: '100%' }} >
           
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && selectedPosition && (
              <Polyline positions={[position, selectedPosition]} color="red">
                <Popup className="custom-popup-style">{`Khoảng cách: ${distance} km`}</Popup>
              </Polyline>
            )}
            <Marker position={position} >
              <Tooltip>Your location</Tooltip>
            </Marker>
            {position && selectedPosition && (
              <Marker position={selectedPosition}>
                <Tooltip>Searching point</Tooltip>
              </Marker>
            )}
          </MapContainer>
          </div>
        ) : (
          <p>Đang tải vị trí...</p>
        )}
      </div>
    </div>
  );
};

export default MapGoogle;





// "use client";
// // @ts-nocheck

// import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-control-geocoder';
// import L from 'leaflet';

// // Importing Map components dynamically to avoid server-side rendering issues
// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
// const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });
// const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
// const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// // Fix marker icon issue
// // delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });


// const MapGoogle = () => {
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [address, setAddress] = useState<string | null>(null);
//   const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);
//   const [polylinePositions, setPolylinePositions] = useState<[number, number][]>([]);


//   delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

//   useEffect(() => {
//     if (typeof window !== 'undefined' && navigator.geolocation) {
//       const getCurrentLocation = async () => {
//         try {
//           const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(resolve, reject);
//           });
//           setPosition([position.coords.latitude, position.coords.longitude]);
//         } catch (error) {
//           console.error("Error getting current location:", error);
//         }
//       };

//       getCurrentLocation();
//     }
//   }, []);

//   useEffect(() => {
//     const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
//       try {
//         const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
//         const data = await response.json();
//         setAddress(data.display_name);
//       } catch (error) {
//         console.error("Error getting address from coordinates:", error);
//       }
//     };

//     if (position) {
//       const [latitude, longitude] = position;
//       getAddressFromCoordinates(latitude, longitude);
//     }
//   }, [position]);

//   useEffect(() => {
//     if (position && selectedPosition) {
//       const [lat1, lon1] = position;
//       const [lat2, lon2] = selectedPosition;
//       const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
//       fetch(url)
//         .then(response => response.json())
//         .then(data => {
//           const dist = data.routes[0].distance / 1000; // convert to kilometers
//           setDistance(dist.toFixed(2)); // round to 2 decimal places
//         })
//         .catch(error => {
//           console.error("Error calculating distance:", error);
//         });
//     }
//   }, [position, selectedPosition]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = e.target.value;
//     if (!searchTerm) {
//       setSelectedPosition(null);
//       setPolylinePositions([]);
//       return;
//     }

//     if (typeof window !== 'undefined') {
//       import('leaflet-control-geocoder').then(() => {
//         const geocoder = (window as any).L.Control.Geocoder.nominatim();
//         geocoder.geocode(searchTerm, (results: any[]) => {
//           if (results && results.length > 0) {
//             const latlng: [number, number] = [results[0].center.lat, results[0].center.lng];
//             setSelectedPosition(latlng);
//             setPolylinePositions([position!, latlng]); // Update polyline positions
//           }
//         });
//       });
//     }
//   };

//   return (
//     <div className='w-[80%] mx-auto mb-[2rem]'>
//     <div className='flex flex-col space-y-[1rem]'>
//       {/* <h3>Bản đồ vị trí thời điểm truy cập</h3> */}
//       <input type="text" placeholder="Enter your address..." onChange={handleSearch} className='max-w-[40rem] outline-none border rounded-md h-[2rem] px-2 ring-2' />
//       <p><span className='text-blue-600'>Your current address</span>: {address || 'Loading...'}</p>

      

//       {position && selectedPosition && (
//         <p>Distance: {distance} km</p>
//       )}
//       {position ? (
//         <MapContainer center={position} zoom={14} style={{ height: '500px', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {position && selectedPosition && (
//             <Polyline positions={[position, selectedPosition]} color="red">
//             <Popup className="custom-popup-style">
//               {`Khoảng cách: ${distance} km`}
//             </Popup>
//           </Polyline>
//           )}
//           <Marker position={position}>
//             <Tooltip>
//               Your location
//             </Tooltip>
//           </Marker>
//           {position && selectedPosition && (
//             <Marker position={selectedPosition}>
//               <Tooltip>
//                Searching point
//               </Tooltip>
//             </Marker>
//           )}
//         </MapContainer>
//       ) : (
//         <p>Đang tải vị trí...</p>
//       )}
//       </div>
//     </div>
//   );
// };

// export default MapGoogle;


