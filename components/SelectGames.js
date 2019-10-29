import React, { useState } from 'react';
import { Overlay, Button, Icon } from 'react-native-elements';
import SelectGamesModal from './SelectGamesModal';

export default function SelectGames() {
  const [visible, setVisible] = useState(false);

  const showSelectGameModal = () => setVisible(true);

  //close SelectGame component
  const goBack = () => setVisible(false);

  return (
    <>
      <Button 
        onPress={showSelectGameModal}
        icon={
          <Icon
          name='add'
          type='material-icons'
          color='white'
          />
        }
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