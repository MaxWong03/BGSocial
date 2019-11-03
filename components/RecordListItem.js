import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { Slider } from 'react-native-elements';


export default function RecordListItem({ title, leftAvatar, id, deleteRecordFriend, canDelete, updateScoreList }) {
  const [score, setScore] = useState(0)
  const onValueChange = (newValue) => {
    newValue = Math.round(newValue * 100)
    setScore(newValue);
    updateScoreList(id, newValue);
  }
  return (
    <ListItem
      title={title}
      leftAvatar={leftAvatar}
      bottomDivider
      rightElement={
        canDelete ?
          <>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
              <Slider
                value={0}
                onValueChange={onValueChange}
              />
              <Text>Score: {score}</Text>
            </View>
            <Button
              icon={
                <Icon
                  name='account-remove'
                  type='material-community'
                  color='white'
                />
              }
              buttonStyle={styles.deleteButton}
              onPress={() => deleteRecordFriend(id)}
            />
          </>
          :
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
              value={0}
              onValueChange={onValueChange}
            />
            <Text>Score: {score}</Text>
          </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    marginLeft: 5
  }
})

