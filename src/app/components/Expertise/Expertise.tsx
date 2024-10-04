"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { skill: 'REACTJS', level: 60 },
  { skill: 'API RESFUL', level: 80 },
  { skill: 'NEXTJS', level: 75 },
  { skill: 'NESTJS', level: 75 },
  { skill: 'DOCKER', level: 100 },
  { skill: 'CI/CID', level: 60 },
];

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d84b6e', '#00c49f'];


function Expertise() {
  return (
    <div className="w-[80%] mx-auto mb-[2rem]">
          <h1 className='text-purple-600 font-extrabold text-[1.8rem] md:text-[2.5rem]'>My current skills:</h1>
       <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="skill" type="category" />
        <Tooltip />
        <Bar dataKey="level">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
     </div>
  )
}

export default Expertise






