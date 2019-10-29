import React, { useState } from 'react';

export default function useTimeSlot() {
  const [timeSlots, setTimeSlots] = useState([{ id: 0, time: new Date() }]);


  const addTimeSlot = () => {
    if (timeSlots.length < 3) {
      const newTime = { id: timeSlots.length, time: new Date() }
      setTimeSlots([...timeSlots, newTime])
    }
  };

  const changeTimeSlot = (index, newDate) => {
    const updateTimeSlot = timeSlots.map((time) => {
      if (time.id === index) return { ...time, time: newDate };
      else return time;
    });
    setTimeSlots(updateTimeSlot);
  };


  return {
    timeSlots,
    addTimeSlot,
    changeTimeSlot
  }
}