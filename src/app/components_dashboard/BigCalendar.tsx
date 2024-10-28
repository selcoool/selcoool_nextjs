"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);
// Set English locale (no need to import the locale explicitly)
moment.locale('en');

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

const messages = {
    allDay: 'All Day',
    previous: 'Previous',
    next: 'Next',
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Time',
    event: 'Event',
    showMore: (total: number) => `+${total} more events`,
    noEventsInRange: '  No events in this range.'
};

interface BigCalendarProps {
    selectedViewFromCalendar: Date; // Type this according to your requirements (e.g., string, Date)
}

const BigCalendar = ({ selectedViewFromCalendar }: BigCalendarProps) => {
    const [view, setView] = useState<View>(Views.WEEK); // Default to week view
    const [date, setDate] = useState<Date>(new Date(selectedViewFromCalendar)); // Set initial date

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };

    const handleNavigate = (newDate: Date) => {
        setDate(newDate); // Update to the new date
        console.log("Navigated to:", newDate);
    };

    // Update date when selectedViewFromCalendar changes
    useEffect(() => {
        setDate(new Date(selectedViewFromCalendar));
    }, [selectedViewFromCalendar]);

    return (
        <div className="bg-[#ffffff] rounded-md">
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                // views={["day", "week", "month", "agenda"]}
                views={["day", "week", "month"]}
                view={view}
                date={date} // Add date prop
                style={{ height: "100vh" }} // Adjust height for better visibility
                onView={handleOnChangeView}
                onNavigate={handleNavigate} // Handle navigation between dates
                min={new Date(2024, 9, 3, 0, 0, 0)} // Set minimum time for the day
                max={new Date(2024, 9, 3, 23, 59, 59)} // Set maximum time for the day
                // messages={messages}
            />
        </div>
    );
};

export default BigCalendar;





// "use client";
// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import "moment/locale/vi"; // Import Vietnamese locale
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useState, useEffect } from "react";

// const localizer = momentLocalizer(moment);
// moment.locale('vi');

// interface CalendarEvent {
//     title: string;
//     allDay: boolean;
//     start: Date;
//     end: Date;
// }

// const calendarEvents: CalendarEvent[] = [
//     {
//         title: "Math",
//         allDay: false,
//         start: new Date(2024, 9, 18, 8, 0), // October 18, 2024, 8:00 AM
//         end: new Date(2024, 9, 18, 8, 45), // October 18, 2024, 8:45 AM
//     },
//     {
//         title: "English",
//         allDay: false,
//         start: new Date(2024, 9, 3, 9, 0), // October 3, 2024, 9:00 AM
//         end: new Date(2024, 9, 3, 9, 45),   // October 3, 2024, 9:45 AM
//     },
//     {
//         title: "Biology",
//         allDay: false,
//         start: new Date(2024, 9, 3, 10, 0), // October 3, 2024, 10:00 AM
//         end: new Date(2024, 9, 3, 10, 45),   // October 3, 2024, 10:45 AM
//     },
//     {
//         title: "Physics",
//         allDay: false,
//         start: new Date(2024, 9, 3, 11, 0), // October 3, 2024, 11:00 AM
//         end: new Date(2024, 9, 3, 11, 45),   // October 3, 2024, 11:45 AM
//     },
//     {
//         title: "Chemistry",
//         allDay: false,
//         start: new Date(2024, 9, 3, 13, 0), // October 3, 2024, 1:00 PM
//         end: new Date(2024, 9, 3, 13, 45),   // October 3, 2024, 1:45 PM
//     },
//     {
//         title: "History",
//         allDay: false,
//         start: new Date(2024, 9, 3, 14, 0), // October 3, 2024, 2:00 PM
//         end: new Date(2024, 9, 3, 14, 45),   // October 3, 2024, 2:45 PM
//     },
//     {
//         title: "English",
//         allDay: false,
//         start: new Date(2024, 9, 3, 15, 0), // October 3, 2024, 3:00 PM
//         end: new Date(2024, 9, 3, 15, 45),   // October 3, 2024, 3:45 PM
//     },
//     {
//         title: "Biology",
//         allDay: false,
//         start: new Date(2024, 9, 3, 16, 0), // October 3, 2024, 4:00 PM
//         end: new Date(2024, 9, 3, 16, 45),   // October 3, 2024, 4:45 PM
//     },
// ];

// const messages = {
//     allDay: 'Cả ngày',
//     previous: 'Trước',
//     next: 'Tiếp theo',
//     today: 'Hôm nay',
//     month: 'Tháng',
//     week: 'Tuần',
//     day: 'Ngày',
//     agenda: 'Lịch trình',
//     date: 'Ngày',
//     time: 'Thời gian',
//     event: 'Sự kiện',
//     showMore: (total: number) => `+${total} sự kiện khác`,
//     noEventsInRange: 'Không có sự kiện nào trong khoảng thời gian này.' 
// };

// interface BigCalendarProps {
//     selectedViewFromCalendar: Date; // Type this according to your requirements (e.g., string, Date)
// }

// const BigCalendar = ({ selectedViewFromCalendar }:BigCalendarProps) => {
//     const [view, setView] = useState<View>(Views.WEEK); // Default to week view
//     const [date, setDate] = useState<Date>(new Date(selectedViewFromCalendar)); // Set initial date

//     const handleOnChangeView = (selectedView: View) => {
//         setView(selectedView);
//     };

//     const handleNavigate = (newDate: Date) => {
//         setDate(newDate); // Update to the new date
//         console.log("Navigated to:", newDate);
//     };

//     // Update date when selectedViewFromCalendar changes
//     useEffect(() => {
//         setDate(new Date(selectedViewFromCalendar));
//     }, [selectedViewFromCalendar]);

//     return (
//         <div className="bg-[#ffffff] ">
//             <Calendar
//                 localizer={localizer}
//                 events={calendarEvents}
//                 startAccessor="start"
//                 endAccessor="end"
//                 views={["day", "week", "month", "agenda"]}
//                 view={view}
//                 date={date} // Add date prop
//                 style={{ height: "100vh" }} // Adjust height for better visibility
//                 onView={handleOnChangeView}
//                 onNavigate={handleNavigate} // Handle navigation between dates
//                 min={new Date(2024, 9, 3, 0, 0, 0)} // Set minimum time for the day
//                 max={new Date(2024, 9, 3, 23, 59, 59)} // Set maximum time for the day
//                 // messages={messages}
//             />
//         </div>
//     );
// };

// export default BigCalendar;





