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
  { name: "CI/CD", value: 10, fill: "#d84b6e" },
  { name: "DOCKER", value: 10, fill: "#00c49f" },
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
  const labelDistance = outerRadius + 20; // Adjusted distance to bring labels closer
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
  const [fontSize, setFontSize] = useState(12); // Default font size for labels

  // Function to adjust font size based on window width
  const adjustFontSize = () => {
    const width = window.innerWidth;
    if (width < 600) {
      setFontSize(9); // Small screens
    } else if (width < 900) {
      setFontSize(11); // Medium screens
    } else {
      setFontSize(15); // Large screens
    }
  };

  useEffect(() => {
    adjustFontSize(); // Initial adjustment
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize); // Cleanup on unmount
  }, []);

  return (
    <div className="w-[80%] mx-auto mt-[2rem] bg-white  rounded-md h-80 relative ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={fontSize * 4} // Dynamic inner radius based on font size
            outerRadius={fontSize * 6} // Dynamic outer radius based on font size
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
        <h1 style={{ fontSize: `${fontSize * 3}px` }} className="font-bold text-gray-800">
          {totalValue}
        </h1>
        <p className="text-xs text-gray-500">of 100 points</p>
      </div>
      <h2 className="font-medium absolute bottom-[3rem] left-0 right-0 m-auto text-center text-gray-700">THESE ARE MY SKILLS</h2>
    </div>
  );
};

export default ChartCircle;

// "use client";
// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

// // Define the type for the data entries
// interface DataEntry {
//   name: string;
//   value: number;
//   fill: string;
// }

// // Data for the pie chart
// const data: DataEntry[] = [
//   { name: "REACTJS", value: 30, fill: "#8884d8" },
//   { name: "NESTJS", value: 10, fill: "#ffc658" },
//   { name: "NEXTJS", value: 20, fill: "#ff8042" },
//   { name: "CI/CD", value: 10, fill: "#d84b6e" },
//   { name: "DOCKER", value: 10, fill: "#00c49f" },
// ];

// const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

// // Define type for the label function parameters
// interface LabelProps {
//   name: string;
//   value: number;
//   cx: number;
//   cy: number;
//   midAngle: number;
//   outerRadius: number;
//   fill: string;
// }

// // Custom label function with trigonometric positioning
// const renderCustomLabel = ({
//   name,
//   value,
//   cx,
//   cy,
//   midAngle,
//   outerRadius,
//   fill,
// }: LabelProps, fontSize: number) => {
//   const RADIAN = Math.PI / 180;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const labelDistance = outerRadius + 20; // Move labels further from the chart
//   const x = cx + labelDistance * cos;
//   const y = cy + labelDistance * sin;
//   const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(0) : 0;

//   return (
//     <text
//       x={x}
//       y={y}
//       fill={fill}
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//       style={{ fontSize: `${fontSize}px`, fontWeight: 'bold' }}
//     >
//       {`${name}: ${percentage}%`}
//     </text>
//   );
// };

// const ChartCircle = () => {
//   const [fontSize, setFontSize] = useState(12); // Default font size for labels

//   // Function to adjust font size based on window width
//   const adjustFontSize = () => {
//     const width = window.innerWidth;
//     if (width < 600) {
//       setFontSize(7); // Small screens
//     } else if (width < 900) {
//       setFontSize(10); // Medium screens
//     } else {
//       setFontSize(13); // Large screens
//     }
//   };

//   useEffect(() => {
//     adjustFontSize(); // Initial adjustment
//     window.addEventListener("resize", adjustFontSize);
//     return () => window.removeEventListener("resize", adjustFontSize); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="w-[80%] mx-auto my-[5rem] bg-white p-4 rounded-md h-80 relative shadow-lg">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             dataKey="value"
//             startAngle={180}
//             endAngle={0}
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={fontSize * 5} // Dynamic inner radius based on font size
//             outerRadius={fontSize * 8} // Dynamic outer radius based on font size
//             label={(props) => renderCustomLabel(props, fontSize)} // Apply dynamic label font size and position
//             stroke="none" // Ensure no stroke is applied to the pie slices
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.fill} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//         <h1 style={{ fontSize: `${fontSize * 3}px` }} className="font-bold text-gray-800">
//           {totalValue}
//         </h1>
//         <p className="text-xs text-gray-500">of 100 points</p>
//       </div>
//       <h2 className="font-medium absolute bottom-4 left-0 right-0 m-auto text-center text-gray-700">THESE ARE MY SKILLS</h2>
//     </div>
//   );
// };

// export default ChartCircle;









// "use client";
// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

// // Define the type for the data entries
// interface DataEntry {
//   name: string;
//   value: number;
//   fill: string;
// }

// // Data for the pie chart
// const data: DataEntry[] = [
//   { name: "REACTJS", value: 30, fill: "#8884d8" },
//   { name: "NESTJS", value: 10, fill: "#ffc658" },
//   { name: "NEXTJS", value: 20, fill: "#ff8042" },
//   { name: "CI/CID", value: 10, fill: "#d84b6e" },
//   { name: "DOCKER", value: 10, fill: "#00c49f" },
// ];

// const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

// // Define type for the label function parameters
// interface LabelProps {
//   name: string;
//   value: number;
//   x: number;
//   y: number;
// }

// // Custom label function with styled JSX
// const renderCustomLabel = ({ name, value, x, y }: LabelProps) => {
//   const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(0) : 0;
//   return (
//     <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '10px' }}>
//       {`${name}: ${percentage}%`}
//     </text>
//   );
// };

// const ChartCircle = () => {
//   const [fontSize, setFontSize] = useState(12); // Default font size

//   // Function to adjust font size based on window width
//   const adjustFontSize = () => {
//     const width = window.innerWidth;
//     if (width < 600) {
//       setFontSize(7); // Small screens
//     } else if (width < 900) {
//       setFontSize(10); // Medium screens
//     } else {
//       setFontSize(13); // Large screens
//     }
//   };

//   useEffect(() => {
//     adjustFontSize(); // Initial adjustment
//     window.addEventListener("resize", adjustFontSize);
//     return () => window.removeEventListener("resize", adjustFontSize); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="w-[80%] mx-auto m-[5rem] bg-white p-4 rounded-md h-80 relative">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             dataKey="value"
//             startAngle={180}
//             endAngle={0}
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={fontSize * 5} // Dynamic inner radius based on font size
//             outerRadius={fontSize * 8} // Dynamic outer radius based on font size
//             label={renderCustomLabel} // Apply custom label function
//             stroke="none" // Ensure no stroke is applied to the pie slices
//           >
//             {/* Apply colors explicitly */}
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.fill} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//         <h1 style={{ fontSize: `${fontSize * 3}px` }} className="font-bold">
//           {totalValue}
//         </h1>
//         <p className="text-xs text-gray-500">of 100 points</p>
//       </div>
//       <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">THESE ARE MY SKILLS</h2>
//     </div>
//   );
// };

// export default ChartCircle;




// "use client";
// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

// // Define the type for the data entries
// interface DataEntry {
//   name: string;
//   value: number;
//   fill: string;
// }

// // Data for the pie chart
// const data: DataEntry[] = [
//   { name: "REACTJS", value: 30, fill: "#8884d8" },
//   { name: "NESTJS", value: 10, fill: "#ffc658" },
//   { name: "NEXTJS", value: 20, fill: "#ff8042" },
//   { name: "CI/CID", value: 10, fill: "#d84b6e" },
//   { name: "DOCKER", value: 10, fill: "#00c49f" },
// ];

// const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

// // Define type for the label function parameters
// interface LabelProps {
//   name: string;
//   value: number;
// }

// // Custom label function
// const renderCustomLabel = ({ name, value }: LabelProps) => {
//   const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(0) : 0; // Avoid division by zero
//   return `${name}: ${percentage}%`;
// };

// const ChartCircle = () => {
//   const [fontSize, setFontSize] = useState(12); // Default font size

//   // Function to adjust font size based on window width
//   const adjustFontSize = () => {
//     const width = window.innerWidth;
//     if (width < 600) {
//       setFontSize(7); // Small screens
//     } else if (width < 900) {
//       setFontSize(10); // Medium screens
//     } else {
//       setFontSize(13); // Large screens
//     }
//   };

//   useEffect(() => {
//     adjustFontSize(); // Initial adjustment
//     window.addEventListener("resize", adjustFontSize);
//     return () => window.removeEventListener("resize", adjustFontSize); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="w-[80%] mx-auto m-[5rem] bg-white p-4 rounded-md h-80 relative">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             dataKey="value"
//             startAngle={180}
//             endAngle={0}
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={fontSize * 5} // Dynamic inner radius based on font size
//             outerRadius={fontSize * 8} // Dynamic outer radius based on font size
//             label={renderCustomLabel} // Apply custom label function
//             stroke="none" // Ensure no stroke is applied to the pie slices
//           >
//             {/* Apply colors explicitly */}
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.fill} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//         <h1 style={{ fontSize: `${fontSize * 3}px` }} className="font-bold">
//           {totalValue}
//         </h1>
//         <p className="text-xs text-gray-500">of 100 points</p>
//       </div>
//       <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">THESE ARE MY SKILLS</h2>
//     </div>
//   );
// };

// export default ChartCircle;


