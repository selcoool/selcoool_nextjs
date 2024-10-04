"use client";
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
  {
    name: "Fri",
    present: 65,
    absent: 55,
  },
];

const ChartBar = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-96"> {/* Set fixed height */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Attendance</h1>
        {/* Uncomment if Image is needed */}
        {/* <Image src="/moreDark.png" alt="More Options" width={20} height={20} /> */}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart  data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#ddd" />
          <XAxis
          axisLine={false}
            dataKey="name"
            tick={{ fill: "#e81387" }}
            tickLine={false}
            
          />
          <YAxis 
          axisLine={false} // Hide axis line
            tick={{ fill: "#1be933"}}
            tickLine={false} 
            tickMargin={5}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            formatter={(value, entry) => {
              return <span style={{ fontWeight: entry.value === 'present' ? 'bold' : 'normal' }}>{value}</span>;
            }}
          />
          <Bar
            dataKey="present"
            fill="#e3d83a"
        
            legendType="circle"
            activeBar={<Rectangle fill="gold" stroke="purple"  />}
            radius={[10, 10, 0, 0]}
           
         
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="rect"
            activeBar={<Rectangle fill="green" stroke="purple" />}
            radius={[10, 10, 0, 0]}
       
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;


// "use client";
// import React from 'react';
// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: "Mon",
//     present: 60,
//     absent: 40,
//   },
//   {
//     name: "Tue",
//     present: 70,
//     absent: 60,
//   },
//   {
//     name: "Wed",
//     present: 90,
//     absent: 75,
//   },
//   {
//     name: "Thu",
//     present: 90,
//     absent: 75,
//   },
//   {
//     name: "Fri",
//     present: 65,
//     absent: 55,
//   },
// ];

// const ChartBar = () => {
//   return (
//     <div className="bg-white rounded-lg p-4 h-96"> {/* Set fixed height */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-lg font-semibold">Attendance</h1>
//         {/* Uncomment if Image is needed */}
//         {/* <Image src="/moreDark.png" alt="More Options" width={20} height={20} /> */}
//       </div>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart width={500} height={300} data={data} barSize={20}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
//           <XAxis
//           // axisLine={false}
//             dataKey="name"
//             tick={{ fill: "#e81387" }}
//             tickLine={true}
//           />
//           <YAxis 
//           axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false}
//             // tick={{ fill: "#1be933" }}
//             // tickLine={false} 
        
//             // axisLine={false} // Hide axis line
            
//           />
//           <Tooltip
//             contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
//           />
//           <Legend
//             align="left"
//             verticalAlign="top"
//             wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
//             formatter={(value, entry) => {
//               // Change color based on data key
//               const color = entry.value === 'present' ? 'blue' : 'gold'; // Set your desired colors
//               return <span style={{ color, fontWeight: 'bold' }}>{value}</span>;
//             }}
//           />
//           <Bar
//             dataKey="present"
//             fill="#e3d83a"
//             legendType="circle"
//             activeBar={<Rectangle fill="gold" stroke="purple" />}
//             radius={[10, 10, 0, 0]}
//           />
//           <Bar
//             dataKey="absent"
//             fill="#C3EBFA"
//             legendType="circle"
//             activeBar={<Rectangle fill="green" stroke="purple" />}
//             radius={[10, 10, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartBar;

