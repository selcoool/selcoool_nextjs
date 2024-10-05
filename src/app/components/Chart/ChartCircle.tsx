"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

// Define the type for the data entries
interface DataEntry {
  name: string;
  value: number;
  fill: string;
}

// Data for the pie chart
const data: DataEntry[] = [
  { name: "REACTJS", value: 30, fill: "#8884d8" },
  { name: "NESTJS", value: 10, fill: "#ffc658" },
  { name: "NEXTJS", value: 20, fill: "#ff8042" },
  { name: "CI/CID", value: 10, fill: "#d84b6e" },
  { name: "DOCKER", value: 10, fill: "#00c49f" },
];

const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

// Define type for the label function parameters
interface LabelProps {
  name: string;
  value: number;
}

// Custom label function
const renderCustomLabel = ({ name, value }: LabelProps) => {
  const percentage = ((value / totalValue) * 100).toFixed(0);
  return `${name}: ${percentage}%`;
};

const ChartCircle = () => {
  const [fontSize, setFontSize] = useState(12); // Default font size

  // Function to adjust font size based on window width
  const adjustFontSize = () => {
    const width = window.innerWidth;
    if (width < 600) {
      setFontSize(5); // Small screens
    } else if (width < 900) {
      setFontSize(7); // Medium screens
    } else {
      setFontSize(12); // Large screens
    }
  };

  useEffect(() => {
    adjustFontSize(); // Initial adjustment
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart  >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={fontSize * 5} // Dynamic inner radius based on font size
            outerRadius={fontSize * 8} // Dynamic outer radius based on font size
            label={renderCustomLabel} // Apply custom label function
           
            stroke="none" // Ensure no stroke is applied to the pie slices
          >
            {/* Apply colors explicitly */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">92</h1>
        <p className="text-xs text-gray-500">of 100 points</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">THIS IS MY SKILLS</h2>
    </div>
  );
};

export default ChartCircle;
