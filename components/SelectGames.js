import React, { useState } from 'react';
import { Overlay, Button } from 'react-native-elements';
import SelectGamesModal from './SelectGamesModal';

export default function SelectGames() {
  const [visible, setVisible] = useState(false);

  const showSelectGameModal = () => setVisible(true);

  //close SelectGame component
  const goBack = () => setVisible(false);

  return (
    <>
      <Button 
        title="Select Games"
        onPress={showSelectGameModal}
      />
      <Overlay
        isVisible={visible}
        children={
          <SelectGamesModal
            goBack={goBack}
          />
        }
      />
    </>
  )
}