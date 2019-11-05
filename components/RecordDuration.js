import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Icon, Button, Input } from 'react-native-elements';

export default function RecordDuration({ hour, changeHour, minute, changeMinute, second, changeSecond }) {
  return (
    <>
      <Button
        title={'Set Duration'}
        icon={
          <Icon
            name='timer-sand'
            type='material-community'
            color='white'
            iconStyle={{ marginRight: 5 }}
          />
        }
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
          <View styles={styles.durationContainer}>
            <Input
              placeholder={'Hour(s):'}
              value={hour}
              onChangeText={newHour => changeHour(newHour)}
              inputContainerStyle={styles.inputContainerStyle}
            />
            <Input
              placeholder={'Minute(s):'}
              value={minute}
              onChangeText={newMinute => changeMinute(newMinute)}
              inputContainerStyle={styles.inputContainerStyle}
            />
            <Input
              placeholder={'Second(s):'}
              value={second}
              onChangeText={newSecond => changeSecond(newSecond)}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>
        }
        bottomDivider
      />
    </>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    width: 120,
    marginRight: 5
  },
  durationContainer: {
    flexDirection: "row"
  }
})