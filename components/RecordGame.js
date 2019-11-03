import React from 'react';
import { Button, Icon } from 'react-native-elements';

export default function RecordGame() {
  return (
    <Button
      // onPress={showModal}
      title={'Create Game Record'}
      icon={
        <Icon
          name='videogame-asset'
          type='material-icons'
          color='white'
        />
      }
    />
  )
}