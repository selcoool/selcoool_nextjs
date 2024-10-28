"use client";
import BigCalendar from '@/app/components_dashboard/BigCalendar';
import EventList from '@/app/components_dashboard/EventList';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Define the type for value state
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventPage= () => {
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
            {/* Left section with calendar */}
            <div className='w-full md:w-2/3 flex flex-col space-y-6 '>
                <BigCalendar selectedViewFromCalendar={validDate} />
            </div>

            {/* Right section */}
            <div className='w-full md:w-1/3 h-full space-y-6 '>
                <Calendar onChange={onChange} value={value} />
                <EventList selectedViewFromCalendar={validDate} />
            </div>
        </div>
    );
}

export default EventPage;



