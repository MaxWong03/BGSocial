import React, { useState } from 'react';

export default function useDuration(initHour, initMinute, initSecond) {
  const [hour, setHour] = useState(initHour || '');
  const [minute, setMinute] = useState(initMinute || '');
  const [second, setSecond] = useState(initSecond || '');

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