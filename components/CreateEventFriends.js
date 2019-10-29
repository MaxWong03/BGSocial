import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import InviteFriends from './InviteFriends';

export default function CreateEventFriends() {
  return (
    <>
      <Text style={styles.SectionHeader}> Invite Friends</Text>
      <ListItem
        title={'Friends:'}
        leftIcon={
          <Icon
            name='group'
            type='material-icons'
          />
        }
        rightElement={<InviteFriends />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  SectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
})