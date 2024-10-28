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

const AdminPage = () => {

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

  // const currentDate = new Date().toISOString().split('T')[0]; // Dynamic date in YYYY-MM-DD format

  return (
    <div className='flex p-4 gap-[0.5rem] flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto'>
      {/* Left section with user cards */}
      <div className='w-full md:w-2/3 flex flex-col space-y-6'>
        <div className='flex flex-wrap gap-[1rem]'>
          <UserCard Type='New User' Quality={20} Date={validDate} />
          <UserCard Type='User Accessed Within 14 Days' Quality={30} Date={validDate} />
          <UserCard Type='User Accessed More Than 14 Days' Quality={10} Date={validDate} />
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
      <div className='w-full md:w-1/3 h-full bg-[#ffdfb5]'>
        <Calendar onChange={onChange} value={value} />
         <EventList  selectedViewFromCalendar={validDate}/> 
      </div>
    </div>
  );
};

export default AdminPage;



// import ChartBar from '@/app/components/Chart/ChartBar';
// import ChartLine from '@/app/components/Chart/ChartLine';
// import Expertise from '@/app/components/Chart/Expertise';
// import ChartCircle from '@/app/components_dashboard/ChartCircle';
// import EventCalendar from '@/app/components_dashboard/EventCalendar';
// import UserCard from '@/app/components_dashboard/UserCard';
// import React from 'react';

// interface CalendarEvent {
//   title: string;
//   allDay: boolean;
//   start: Date;
//   end: Date;
// }

// const calendarEvents: CalendarEvent[] = [
//   {
//       title: "Math",
//       allDay: false,
//       start: new Date(2024, 9, 3, 8, 0), // October 3, 2024, 8:00 AM
//       end: new Date(2024, 9, 3, 8, 45), // October 3, 2024, 8:45 AM
//   },
//   {
//       title: "English",
//       allDay: false,
//       start: new Date(2024, 9, 3, 9, 0), // October 3, 2024, 9:00 AM
//       end: new Date(2024, 9, 3, 9, 45),   // October 3, 2024, 9:45 AM
//   },
//   {
//       title: "Biology",
//       allDay: false,
//       start: new Date(2024, 9, 3, 10, 0), // October 3, 2024, 10:00 AM
//       end: new Date(2024, 9, 3, 10, 45),   // October 3, 2024, 10:45 AM
//   },
//   {
//       title: "Physics",
//       allDay: false,
//       start: new Date(2024, 9, 3, 11, 0), // October 3, 2024, 11:00 AM
//       end: new Date(2024, 9, 3, 11, 45),   // October 3, 2024, 11:45 AM
//   },
//   {
//       title: "Chemistry",
//       allDay: false,
//       start: new Date(2024, 9, 3, 13, 0), // October 3, 2024, 1:00 PM
//       end: new Date(2024, 9, 3, 13, 45),   // October 3, 2024, 1:45 PM
//   },
//   {
//       title: "History",
//       allDay: false,
//       start: new Date(2024, 9, 3, 14, 0), // October 3, 2024, 2:00 PM
//       end: new Date(2024, 9, 3, 14, 45),   // October 3, 2024, 2:45 PM
//   },
//   {
//       title: "English",
//       allDay: false,
//       start: new Date(2024, 9, 3, 15, 0), // October 3, 2024, 3:00 PM
//       end: new Date(2024, 9, 3, 15, 45),   // October 3, 2024, 3:45 PM
//   },
//   {
//       title: "Biology",
//       allDay: false,
//       start: new Date(2024, 9, 3, 16, 0), // October 3, 2024, 4:00 PM
//       end: new Date(2024, 9, 3, 16, 45),   // October 3, 2024, 4:45 PM
//   },
// ];




// const AdminPage = () => {
//   const currentDate = new Date().toISOString().split('T')[0]; // Dynamic date in YYYY-MM-DD format

//   return (
//     <div className='flex p-4 gap-[0.5rem] flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto'>
//       {/* Left section with user cards */}
//       <div className='w-full md:w-2/3 flex flex-col space-y-6'>
//         <div className='flex flex-wrap gap-[1rem]'>
//           <UserCard Type='New User' Quality={20} Date={currentDate} />
//           <UserCard Type='User Accessed Within 14 Days' Quality={30} Date={currentDate} />
//           <UserCard Type='User Accessed More Than 14 Days' Quality={10} Date={currentDate} />
//         </div>

//         {/* Expertise and Chart sections */}
//         <div className='flex flex-col items-center lg:flex-row space-x-1 space-y-1'>
//           <div className='w-full lg:w-1/3'>
//           <ChartCircle />
//           </div>
//           <div className='w-full lg:w-2/3'>
//             <ChartBar />
//           </div>
//         </div>

//         <div className='w-full'>
//           <ChartLine />
//         </div>
//       </div>

//       {/* Right section */}
//       <div className='w-full md:w-1/3 bg-gray-400'>
//         <EventCalendar />
//         <div className='flex flex-col gap-4'>
//              {
//               calendarEvents.map((event)=>(
//                 <div className='' key={event.}></div>
//               ))
//              }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;







