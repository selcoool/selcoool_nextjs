"use client"
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    console.log('Date',value)
  return (
    <div className=''> <Calendar onChange={onChange} value={value} locale="vi-VN" /></div>
  )
}

export default EventCalendar