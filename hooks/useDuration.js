import React, { useState } from 'react';

export default function useDuration() {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  const changeHour = (newHour) => {
    (/^\d+$/.test(newHour) || !newHour) && setHour(newHour);
  }
  const changeMinute = (newMinute) => {
    (/^\d+$/.test(newMinute) || !newMinute) && newMinute <= 60 && setMinute(newMinute);
  }
  const changeSecond = (newSecond) => {
    (/^\d+$/.test(newSecond) || !newSecond) && newSecond <= 60 && setSecond(newSecond);
  }

  return {
    hour,
    minute,
    second,
    changeHour,
    changeMinute,
    changeSecond
  }
}