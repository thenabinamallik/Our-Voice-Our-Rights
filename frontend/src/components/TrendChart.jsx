import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TrendChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Last 6 Months Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total_persondays"
            stroke="#3B82F6"
            name="Persondays"
          />
          <Line
            type="monotone"
            dataKey="total_wages"
            stroke="#10B981"
            name="Wages"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
