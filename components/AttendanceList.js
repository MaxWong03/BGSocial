import { ListItem, Tooltip } from 'react-native-elements'
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// sample data
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
];

export default function AttendanceList(props) {
  const attendance = list.map((l, i) => (
    <Tooltip key={i}popover={<Text>{l.name}</Text>}>
      <ListItem
        key={i}
        // topDivider
        // bottomDivider
        leftAvatar={{ source: { uri: l.avatar_url }, size:'small' }}
        containerStyle={ { height: 'auto', width: 40, padding: 3 } }
      />
    </Tooltip>
  ))

  return (
    <ScrollView
      style={{
        width: 40,
        marginVertical: 5,
      }}
      // contentContainerStyle={{flexGrow : 1, justifyContent : 'center', width: 40,}}
    >
      {attendance}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 0
  },
});