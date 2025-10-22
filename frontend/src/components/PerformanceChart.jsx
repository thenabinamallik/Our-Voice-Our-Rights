import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PerformanceChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_persondays" fill="#3B82F6" name="Persondays" />
          <Bar dataKey="total_wages" fill="#10B981" name="Wages" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
