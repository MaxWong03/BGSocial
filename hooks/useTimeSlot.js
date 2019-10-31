import React, { useState } from 'react';

const makeID = () => {
  let id = 0;
  return function () {
    return id++;
  }
}
const id = makeID();

export default function useTimeSlot() {

  const [timeSlots, setTimeSlots] = useState([{ id: id(), "date": new Date() }]);


  const addTimeSlot = () => {
    if (timeSlots.length < 3) {
      const newTime = { id: id(), "date": new Date() }
      setTimeSlots([...timeSlots, newTime])
    }
  };

  const changeTimeSlot = (id, newDate) => {
    const updateTimeSlot = timeSlots.map((time) => {
      if (time.id === id) return { ...time, "date": newDate };
      else return time;
    });
    setTimeSlots(updateTimeSlot);
  };

  const deleteTimeSlot = (id) => {
    if (timeSlots.length > 1) {
      const updateTimeSlot = timeSlots.filter(time => time.id !== id);
      setTimeSlots(updateTimeSlot);
    }
  }


  return {
    timeSlots,
    addTimeSlot,
    changeTimeSlot,
    deleteTimeSlot
  }
}