"use client"
import ChartBar from '@/app/components/Chart/ChartBar';
import ChartLine from '@/app/components/Chart/ChartLine';
import ChartCircle from '@/app/components_dashboard/ChartCircle';
import EventCalendar from '@/app/components_dashboard/EventCalendar';
import EventList from '@/app/components_dashboard/EventList';
import UserCard from '@/app/components_dashboard/UserCard';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const UserPage = () => {
   // Set initial value to the current date
  const [value, onChange] = useState<Value>(new Date());

  // Log the selected date
  console.log('Selected Date:', value);

  // Extract the selected date, ensuring it is a Date
  let selectedDate: Date | null;

  // Handle the case where value might be an array
  if (Array.isArray(value)) {
      selectedDate = value[0]; // Get the first date if it's an array
  } else {
      selectedDate = value; // Otherwise, it's already a Date or null
  }

  // Ensure selectedDate is a Date or fallback to the current date
  const validDate: Date = selectedDate instanceof Date ? selectedDate : new Date();

  return (
    <div className='flex p-4 gap-[0.5rem] flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto'>
      {/* Left section with user cards */}
      <div className='w-full md:w-2/3 flex flex-col space-y-6'>
        <div className='flex flex-wrap gap-[1rem]'>
        <UserCard Type='User Accessed More Than 14 Days' Quality={10} Date={new Date(validDate.getTime() - 14 * 24 * 60 * 60 * 1000)} />
        <UserCard Type='New User' Quality={20} Date={validDate} />
                    <UserCard Type='User Accessed Within 14 Days' Quality={30} Date={new Date(validDate.getTime() + 14 * 24 * 60 * 60 * 1000)} />
                    
        </div>

        {/* Expertise and Chart sections */}
        <div className='flex flex-col items-center lg:flex-row space-x-1 space-y-1'>
          <div className='w-full lg:w-1/3'>
            <ChartCircle />
          </div>
          <div className='w-full lg:w-2/3'>
            <ChartBar />
          </div>
        </div>

        <div className='w-full'>
          <ChartLine />
        </div>
      </div>

      {/* Right section */}
      <div className='w-full md:w-1/3 h-full  space-y-6'>
      <Calendar onChange={onChange} value={value} />
      <EventList  selectedViewFromCalendar={validDate}/> 
      </div>
    </div>
  );
};

export default UserPage;