import React, { useState, useEffect } from "react";
import DistrictSelector from "../components/DistrictSelector";
import PerformanceChart from "../components/PerformanceChart";
import TrendChart from "../components/TrendChart";
import ComparisonCard from "../components/ComparisonCard";
import { getPerformance, getComparison } from "../api";
import { useVoice } from "../hooks/useVoice";

const Home = () => {
  const [districtId, setDistrictId] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
  if (!districtId) return;

  getPerformance(districtId)
    .then((data) => {
      const formatted = data.map((d) => ({
        month: d.month,
        total_persondays: d.Persondays_of_Central_Liability_so_far,
        total_wages: parseFloat(d.Material_and_skilled_Wages),
        works_completed: d.Number_of_Completed_Works
      }));
      setPerformance(formatted);
    })
    .catch((err) => console.error(err));

  getComparison(districtId)
    .then((data) => {
      console.log("Comparison data:", data); // <- check here
      setComparison(data);
    })
    .catch((err) => console.error(err));
}, [districtId]);


  const summaryText =
    performance.length > 0
      ? `इस जिले में कुल पर्सनडे ${performance[0].total_persondays} हैं, कुल वेतन ${performance[0].total_wages} हैं।`
      : "";

  useVoice(summaryText, voiceEnabled);

 return (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
      Our Voice, Our Rights - MGNREGA Dashboard
    </h1>

    <div className="max-w-6xl mx-auto">
      {/* Voice Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`px-4 py-2 rounded-lg text-white font-semibold focus:outline-none ${
            voiceEnabled ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {voiceEnabled ? "Voice ON" : "Voice OFF"}
        </button>
      </div>

      {/* Main layout */}
      <div className="max-w-full mx-auto p-4 sm:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Left column: selector + charts */}
        <div className="flex-1 flex flex-col gap-6">
          <DistrictSelector onSelect={setDistrictId} />

          {performance.length > 0 && (
            <div className="bg-white p-4 rounded-xl shadow">
              <PerformanceChart data={performance} />
            </div>
          )}

          {comparison.length > 0 && (
            <div className="bg-white p-4 rounded-xl shadow">
              <TrendChart data={comparison} />
            </div>
          )}
        </div>

        {/* Right column: Comparison card */}
        {comparison.length > 0 && (
          <div className="w-full md:w-1/3 bg-yellow-100 p-4 rounded-xl shadow">
            <ComparisonCard comparison={comparison} />
          </div>
        )}

      </div>
    </div>
  </div>
);
}
export default Home;
