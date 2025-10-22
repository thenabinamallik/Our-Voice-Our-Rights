import React from "react";

const ComparisonCard = ({ comparison }) => {
  if (!comparison || comparison.length === 0) return null;

  const formatDiff = (val) => (val >= 0 ? `+${val}` : val);

  return (
    <div className="my-6 bg-yellow-100 p-4 rounded-xl shadow">
      <h3 className="text-lg font-bold mb-4">Month-over-Month Comparison</h3>
      <ul className="space-y-2 text-gray-800 text-base">
        {comparison.map((monthData, index) => (
          <li key={index} className="border-b border-yellow-300 pb-2">
            <div className="font-semibold">{monthData.month}</div>
            <div>Total Persondays: {monthData.total_persondays}</div>
            <div>Total Wages: ₹{monthData.total_wages}</div>
            <div>Works Completed: {monthData.works_completed}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonCard;
