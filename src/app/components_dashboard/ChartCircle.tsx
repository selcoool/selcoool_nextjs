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
  { name: "PAST", value: 10, fill: "#ff8042" },
  { name: "NEW", value: 20, fill: "#8884d8" },
  { name: "OLD", value: 30, fill: "#ffc658" },
 
  // { name: "CI/CD", value: 10, fill: "#d84b6e" },
  // { name: "DOCKER", value: 10, fill: "#00c49f" },
];

const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

// Define type for the label function parameters
interface LabelProps {
  name: string;
  value: number;
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  fill: string;
}

// Custom label function with adjusted positioning
const renderCustomLabel = ({
  name,
  value,
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
}: LabelProps, fontSize: number) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const labelDistance = outerRadius + 12; // Adjusted distance to bring labels closer
  const x = cx + labelDistance * cos;
  const y = cy + labelDistance * sin;
  const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(0) : 0;

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: `${fontSize}px`, fontWeight: 'bold' }}
    >
      {`${name}: ${percentage}%`}
    </text>
  );
};

const ChartCircle = () => {
  const [fontSize, setFontSize] = useState(9); // Default font size for labels

  // Function to adjust font size based on window width
  const adjustFontSize = () => {
    const width = window.innerWidth;
    if (width < 600) {
      setFontSize(15); // Small screens
    } else if (width < 900) {
      setFontSize(15); // Medium screens
    } else {
      setFontSize(11); // Large screens
    }
  };

  useEffect(() => {
    adjustFontSize(); // Initial adjustment
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize); // Cleanup on unmount
  }, []);

  return (
    <div className="w-[100%] mx-auto  bg-white  rounded-md h-96 relative ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={fontSize * 2} // Dynamic inner radius based on font size
            outerRadius={fontSize * 4} // Dynamic outer radius based on font size
            label={(props) => renderCustomLabel(props, fontSize)} // Apply dynamic label font size and position
            stroke="none" // Ensure no stroke is applied to the pie slices
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 style={{ fontSize: `${fontSize * 2}px` }} className="font-bold text-gray-800">
          {totalValue}
        </h1>
        <p className="text-xs text-gray-500">of 100 percentage</p>
      </div>
      <h2 className="font-medium absolute bottom-[3rem] left-0 right-0 m-auto text-center text-gray-700">USER ACCESSED OUR SIDE</h2>
    </div>
  );
};

export default ChartCircle;

