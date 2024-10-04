"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/vi"; // Import Vietnamese locale
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);
moment.locale('vi');

// Định nghĩa kiểu cho sự kiện
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
        start: new Date(2024, 9, 3, 8, 0), // October 3, 2024, 8:00 AM
        end: new Date(2024, 9, 3, 8, 45), // October 3, 2024, 8:45 AM
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
    allDay: 'Cả ngày',
    previous: 'Trước',
    next: 'Tiếp theo',
    today: 'Hôm nay',
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    agenda: 'Lịch trình',
    date: 'Ngày',
    time: 'Thời gian',
    event: 'Sự kiện',
    showMore: (total: number) => `+${total} sự kiện khác`,
    noEventsInRange: 'Không có sự kiện nào trong khoảng thời gian này.' 
};

const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WEEK); // Mặc định là view tuần
    const [date, setDate] = useState<Date>(new Date(2024, 9, 3)); // Khởi tạo ngày hiện tại là 3 tháng 10 năm 2024

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };

    const handleNavigate = (newDate: Date) => {
        setDate(newDate); // Cập nhật ngày mới
        console.log("Navigated to:", newDate);
    };

    return (
        <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
           endAccessor="end"
            views={["day", "week", "month",'agenda']}
            view={view}
            date={date} // Thêm props date
            style={{ height: "100vh" }} // Điều chỉnh chiều cao để dễ thấy hơn
            onView={handleOnChangeView}
            onNavigate={handleNavigate} // Thêm hàm này
            min={new Date(2024, 9, 3, 0, 0, 0)} // Ngày 3 tháng 10 năm 2024, 00:00
            max={new Date(2024, 9, 3, 23, 59, 59)} // Ngày 3 tháng 10 năm 2024, 23:59
            messages={messages}
        />
    );
};

export default BigCalendar;

