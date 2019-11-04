import React from 'react';
import { ListItem, Icon, Button } from 'react-native-elements';

export default function RecordDuration() {
  return (
    <>
      <Button
        title={'Set Duration'}
      />
      <ListItem
        title={'Duration: '}
        leftIcon={
          <Icon
            name='timer'
            type='material-icons'
          />
        }
        bottomDivider
      />
    </>
  )
}