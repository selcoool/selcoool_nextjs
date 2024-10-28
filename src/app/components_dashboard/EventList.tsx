import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface EventCalendarProps {
    selectedViewFromCalendar?: Date; // Expecting this to be a Date object
}

interface CalendarEvent {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
}

const calendarEvents: CalendarEvent[] = [
    {
        title: "Math",
        allDay: false,
        start: new Date(2024, 9, 18, 8, 0), // October 18, 2024, 8:00 AM
        end: new Date(2024, 9, 18, 8, 45), // October 18, 2024, 8:45 AM
    },
    {
        title: "English",
        allDay: false,
        start: new Date(2024, 9, 3, 9, 0), // October 3, 2024, 9:00 AM
        end: new Date(2024, 9, 3, 9, 45),   // October 3, 2024, 9:45 AM
    },
    {
        title: "Biology",
        allDay: false,
        start: new Date(2024, 9, 3, 10, 0), // October 3, 2024, 10:00 AM
        end: new Date(2024, 9, 3, 10, 45),   // October 3, 2024, 10:45 AM
    },
    {
        title: "Physics",
        allDay: false,
        start: new Date(2024, 9, 3, 11, 0), // October 3, 2024, 11:00 AM
        end: new Date(2024, 9, 3, 11, 45),   // October 3, 2024, 11:45 AM
    },
    {
        title: "Chemistry",
        allDay: false,
        start: new Date(2024, 9, 3, 13, 0), // October 3, 2024, 1:00 PM
        end: new Date(2024, 9, 3, 13, 45),   // October 3, 2024, 1:45 PM
    },
    {
        title: "History",
        allDay: false,
        start: new Date(2024, 9, 3, 14, 0), // October 3, 2024, 2:00 PM
        end: new Date(2024, 9, 3, 14, 45),   // October 3, 2024, 2:45 PM
    },
    {
        title: "English",
        allDay: false,
        start: new Date(2024, 9, 3, 15, 0), // October 3, 2024, 3:00 PM
        end: new Date(2024, 9, 3, 15, 45),   // October 3, 2024, 3:45 PM
    },
    {
        title: "Biology",
        allDay: false,
        start: new Date(2024, 9, 3, 16, 0), // October 3, 2024, 4:00 PM
        end: new Date(2024, 9, 3, 16, 45),   // October 3, 2024, 4:45 PM
    },
];

const EventList = ({ selectedViewFromCalendar }: EventCalendarProps) => {
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    
    useEffect(() => {
        // Filter events based on the selected date
        const events = calendarEvents.filter(event => {
            // Check if the event start date matches the selected date
            const eventStartDate = event.start;
            return (
                eventStartDate.getFullYear() === selectedViewFromCalendar?.getFullYear() &&
                eventStartDate.getMonth() === selectedViewFromCalendar?.getMonth() &&
                eventStartDate.getDate() === selectedViewFromCalendar?.getDate()
            );
        });

        setFilteredEvents(events);
    }, [selectedViewFromCalendar]);

    return (
        <div className='bg-[#ffdfb5]'>
            <div className='flex justify-between items-center px-[1rem]'>
                <span className='px-1 text-[1.3rem] lg:text-[1.5rem] font-bold'>New Events:</span>
                <Link href="/management/events" className='hover:text-[#47381a] hover:scale-110 underline'>Views</Link>
            </div>
            <div className='flex flex-col justify-center items-center h-full'>
                {filteredEvents.length > 0 ? (
                    filteredEvents.slice(0,5).map((event, index) => (
                        <div className='space-y-2 hover:bg-[#ccae3f] cursor-pointer w-full' key={`${event.title}-${index}`}>
                            <h3 className='text-[1.2rem] text-[#1D3654] text-center font-bold'>{event.title}</h3>
                            <div className='flex flex-col justify-center items-center py-[1rem]'>
                                <div>
                                    <span className='text-[#2c1f54] font-bold'>Start:</span> {event.start.toLocaleString()}
                                </div>
                                <div>
                                    <span className='text-[#2c1f54] font-bold'>End:</span> {event.end.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-[2rem] text-[#2c1f54]'>No events for this date.</div>
                )}
            </div>
        </div>
    );
};

export default EventList;



// import Link from 'next/link';
// import React from 'react';

// interface EventCalendarProps {
//     selectedViewFromCalendar: Date; // Type this according to your requirements (e.g., string, Date)
// }


// interface CalendarEvent {
//   title: string;
//   allDay: boolean;
//   start: Date;
//   end: Date;
// }

// const calendarEvents: CalendarEvent[] = [
//   {
//     title: "Math",
//     allDay: false,
//     start: new Date(2024, 9, 3, 8, 0), // October 3, 2024, 8:00 AM
//     end: new Date(2024, 9, 3, 8, 45), // October 3, 2024, 8:45 AM
//   },
//   {
//     title: "English",
//     allDay: false,
//     start: new Date(2024, 9, 3, 9, 0), // October 3, 2024, 9:00 AM
//     end: new Date(2024, 9, 3, 9, 45), // October 3, 2024, 9:45 AM
//   },
//   {
//     title: "Biology",
//     allDay: false,
//     start: new Date(2024, 9, 3, 10, 0), // October 3, 2024, 10:00 AM
//     end: new Date(2024, 9, 3, 10, 45), // October 3, 2024, 10:45 AM
//   },
//   {
//     title: "Physics",
//     allDay: false,
//     start: new Date(2024, 9, 3, 11, 0), // October 3, 2024, 11:00 AM
//     end: new Date(2024, 9, 3, 11, 45), // October 3, 2024, 11:45 AM
//   },
//   {
//     title: "Chemistry",
//     allDay: false,
//     start: new Date(2024, 9, 3, 13, 0), // October 3, 2024, 1:00 PM
//     end: new Date(2024, 9, 3, 13, 45), // October 3, 2024, 1:45 PM
//   },
//   {
//     title: "History",
//     allDay: false,
//     start: new Date(2024, 9, 3, 14, 0), // October 3, 2024, 2:00 PM
//     end: new Date(2024, 9, 3, 14, 45), // October 3, 2024, 2:45 PM
//   },
//   {
//     title: "English",
//     allDay: false,
//     start: new Date(2024, 9, 3, 15, 0), // October 3, 2024, 3:00 PM
//     end: new Date(2024, 9, 3, 15, 45), // October 3, 2024, 3:45 PM
//   },
//   {
//     title: "Biology",
//     allDay: false,
//     start: new Date(2024, 9, 3, 16, 0), // October 3, 2024, 4:00 PM
//     end: new Date(2024, 9, 3, 16, 45), // October 3, 2024, 4:45 PM
//   },
// ];

// const EventList = ({selectedViewFromCalendar}:EventCalendarProps) => {
//   return (
//     <div>
//       <div className='flex justify-between items-center px-[1rem]'>
//         <span className='px-1 text-[1.3rem] lg:text-[1.5rem] font-bold'>New Events:</span>
//         <Link href="/management/events" className='hover:text-[#47381a] hover:scale-110 hover:underline'>Views</Link>
//       </div>
//       <div className='flex flex-col justify-center items-center h-full'>
//         {calendarEvents.slice(0, 5).map((event, index) => (
//           <div className='space-y-2 hover:bg-[#ccae3f] cursor-pointer w-full' key={`${event.title}-${index}`}>
//             <h3 className='text-[1.2rem] text-[#1D3654] text-center font-bold'>{event.title}</h3>
//             <div className='flex flex-col justify-center items-center py-[1rem]'>
//               <div>
//                 <span className='text-[#2c1f54] font-bold'>Start:</span> {event.start.toLocaleString()}
//               </div>
//               <div>
//                 <span className='text-[#2c1f54] font-bold'>End:</span> {event.end.toLocaleString()}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventList;
