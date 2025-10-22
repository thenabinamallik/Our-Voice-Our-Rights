import React, { useEffect, useState } from "react";
import { getDistricts } from "../api";

const DistrictSelector = ({ onSelect }) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getDistricts().then((data) => {
      setDistricts(data);

      // Optional: auto-select nearest district using geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          let nearest = null;
          let minDist = Infinity;
          data.forEach((d) => {
            if (d.lat && d.lon) {
              const dist = Math.hypot(d.lat - latitude, d.lon - longitude);
              if (dist < minDist) {
                minDist = dist;
                nearest = d;
              }
            }
          });
          if (nearest) onSelect(nearest.district_code || nearest.id);
        });
      }
    });
  }, [onSelect]);

  return (
    <div className="my-4">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.district_code || d.id} value={d.district_code || d.id}>
            {d.district_name || d.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;
