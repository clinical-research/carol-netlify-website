import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import earthImage from "../assets/world.png";
import R3fGlobe from "r3f-globe";

// Define N before using it
const N = 10; // Number of arcs to display on the globe

// List of major city coordinates (latitude and longitude)
const majorCities = [
  { lat: 40.7128, lng: -74.006 }, // New York
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 48.8566, lng: 2.3522 }, // Paris
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: 22.3193, lng: 114.1694 }, // Hong Kong
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: 19.4326, lng: -99.1332 }, // Mexico City
  { lat: -23.5505, lng: -46.6333 }, // São Paulo
  { lat: 28.6139, lng: 77.209 }, // New Delhi
  { lat: 55.7558, lng: 37.6173 }, // Moscow
  { lat: 30.0444, lng: 31.2357 }, // Cairo
  { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
  { lat: 37.5665, lng: 126.978 }, // Seoul
  { lat: 41.9028, lng: 12.4964 }, // Rome
  { lat: 52.52, lng: 13.405 }, // Berlin
  { lat: 25.2048, lng: 55.2708 }, // Dubai
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: 37.3382, lng: -121.8863 }, // San Jose
  { lat: -6.2088, lng: 106.8456 }, // Jakarta
];

const arcsData = [...Array(N).keys()].map(() => {
  // Pick random start and end cities (ensuring they're different)
  let startCity, endCity;
  do {
    startCity = majorCities[Math.floor(Math.random() * majorCities.length)];
    endCity = majorCities[Math.floor(Math.random() * majorCities.length)];
  } while (startCity.lat === endCity.lat && startCity.lng === endCity.lng);

  return {
    startLat: startCity.lat,
    startLng: startCity.lng,
    endLat: endCity.lat,
    endLng: endCity.lng,
    color: "lightyellow",
  };
});

// Create point data for both origins and destinations
const pointsData = [
  // Origin points (start of arcs)
  ...arcsData.map((arc) => ({
    lat: arc.startLat,
    lng: arc.startLng,
    size: 1,
    color: "white",
    isOrigin: true, // Flag to identify origin points
    label: getCityName(arc.startLat, arc.startLng), // Add label for the city
  })),
  // Destination points (end of arcs)
  ...arcsData.map((arc) => ({
    lat: arc.endLat,
    lng: arc.endLng,
    size: 1,
    color: "white",
    isOrigin: false, // Flag to identify destination points
    label: getCityName(arc.endLat, arc.endLng), // Add label for the city
  })),
];

// Function to get city name from coordinates
function getCityName(lat, lng) {
  const city = majorCities.find(
    (city) =>
      Math.abs(city.lat - lat) < 0.001 && Math.abs(city.lng - lng) < 0.001
  );

  // Return city names based on the coordinates
  if (city) {
    const cityNames = {
      "40.7128,-74.006": "New York",
      "51.5074,-0.1278": "London",
      "48.8566,2.3522": "Paris",
      "35.6762,139.6503": "Tokyo",
      // Add more city names as needed
    };

    const key = `${city.lat},${city.lng}`;
    return cityNames[key] || "City";
  }
  return "City";
}

const GlobeViz = () => {
  return (
    <R3fGlobe
      globeImageUrl={earthImage}
      backgroundImageUrl={null}
      pointColor="color"
      showGlobe={true}
      arcsData={arcsData}
      arcColor="color"
      arcStartLat="startLat"
      arcStartLng="startLng"
      arcEndLat="endLat"
      arcEndLng="endLng"
      arcDashLength={1}
      arcDashGap={0.5}
      arcDashAnimateTime={4000}
      arcAltitude={0.2}
      arcStroke={0.5}
      arcOpacity={1}
      pointsData={pointsData}
      pointAltitude={0}
      pointRadius="size"
      // Add label configuration
      labelText="label"
      labelSize={1.0}
      labelColor={() => "red"}
      labelDotRadius={100}
      labelAltitude={100}
      // Add animation for the person images
      pointsTransitionDuration={0}
      pointsMerge={false}
      // Make both origin and destination points appear with animation at different times
      globeRotation={[0, -Math.PI / 1.8, 0]}
      // Add atmosphere configuration with light yellow color
      atmosphereColor="rgba(250, 249, 2, 0.2)"
      atmosphereAltitude={0.2}
      showAtmosphere={true}
    />
  );
};

const Globe = () => {
  const cameraProps = useMemo(() => ({ fov: 50, position: [0, 0, 350] }), []);

  // Track mouse position

  return (
    <div className="w-full lg:h-[100vh] md:h-[80vh] h-[60vh] overflow-visible">
      <Canvas flat camera={cameraProps}>
        <OrbitControls
          enableZoom={false}
          minDistance={101}
          maxDistance={1e4}
          dampingFactor={0.1}
          zoomSpeed={0.3}
          rotateSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={1}
        />
        <ambientLight color={"lightblue"} intensity={Math.PI} />
        <directionalLight
          intensity={Math.PI}
          position={[-1, 1, 0]}
          color="#FFFFFF"
        />
        <GlobeViz />
      </Canvas>
    </div>
  );
};

export default Globe;
