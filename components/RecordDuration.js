import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Icon, Button, Input } from 'react-native-elements';

export default function RecordDuration({ duration, changeDuration }) {
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
        rightElement={
          <Input
            placeholder={'Enter Duration (Minutes):'}
            value={duration}
            onChangeText={newDuration => changeDuration(newDuration)}
            inputContainerStyle={styles.inputContainerStyle}
          />
        }
        bottomDivider
      />
    </>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    width: 250
  }
})