import React, { useState } from 'react';

export default function useButtonProps(initTitle, initColor) {
  const [buttonTitle, setButtonTitle] = useState(initTitle);
  const [buttonColor, setButtonColor] = useState(initColor);
  return {
    buttonTitle,
    setButtonTitle,
    buttonColor,
    setButtonColor
  }
}