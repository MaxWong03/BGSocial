import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import SelectGamesModal from './SelectGamesModal';

export default function SelectGames() {
  const [visible, setVisible] = useState(true);

  //close SelectGame component
  const goBack = () => setVisible(false);

  return (
    <Overlay
      isVisible={visible}
      children={
        <SelectGamesModal
          goBack={goBack}
        />
      }
    />
  )
}