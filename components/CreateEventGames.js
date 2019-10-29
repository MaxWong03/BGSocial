import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import SelectGames from './SelectGames';

export default function CreatEventGames() {
  return (
    <>
      <Text style={styles.SectionHeader}> Select Games</Text>
      <ListItem
        title={'Games:'}
        leftIcon={
          <Icon
            name='videogame-asset'
            type='material-icons'
          />
        }
        rightElement={<SelectGames />}
      />
    </>
  )
}

const styles = StyleSheet.create({
  SectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
})