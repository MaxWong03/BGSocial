
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEventsData } from './../hooks/useEventsData';
import { Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils'
import AttendanceList from './AttendanceList';


export default function EventItem({imageUrl, date, hosted, title }) {
  return (
    <View style={styles.flexParent}>
      <AttendanceList/>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${imageUrl}` }}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.name}>{date}</Text>
          <Text style={styles.attendanceCount}>Attendants: 4</Text>
        </View>
        <Button
          buttonStyle={styles.button}
          title={`${title}`}
          type='outline'
          iconRight={true}
          icon={
            <Icon
              size={20}
              name='info'
              type='material-icons'
              color='#bdbdbd'
            />
          } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexParent: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    height: 150,
    alignItems: 'stretch',
    borderColor: '#eee',
    borderWidth: 1
  },
  imageContainer: {
    flex: 3,
    height: '100%'
  },
  textContainer: {
    flex: 3,
    padding: 20,
    justifyContent: 'space-between'
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  button: {
    justifyContent: 'space-around'
  },
});