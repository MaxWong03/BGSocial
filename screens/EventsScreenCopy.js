import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEventsData } from './../hooks/useEventsData';
import { ButtonGroup, ListItem, Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils'
import AttendanceList from '../components/AttendanceList';

export default function EventsScreen() {

  const {
    state,
    dispatchState
  } = useEventsData();

  const buttons = ['My Events', 'Pending Events', 'Explore']

  return (
    <ScrollView >
      <ButtonGroup
        buttons={buttons} // the top buttons
        containerStyle={styles.ButtonGroup}
      />
      {
        state.events.map((event, i) => {
          if (event.chosen_event_date.date) {
            return (
              // <Card key={i} containerStyle={styles.card}>
              <View key={i} style={styles.flexParent}>
                <AttendanceList/>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: event.event_games[0].image }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View>
                    <Text style={styles.name}>{formatDateWithTime(event.chosen_event_date.date)}</Text>
                    <Text style={styles.attendanceCount}>Attendants: 4</Text>

                  </View>
                  <Button
                    buttonStyle={styles.button}
                    title='View more info'
                    type='outline'
                    iconRight={true}
                    icon={ // definite the button here
                      <Icon
                        size={20}
                        name='info'
                        type='material-icons'
                        color='#bdbdbd'
                      />
                    } />
                </View>
              </View>
              // </Card>
            );
          }
        })
      }
    </ScrollView>
  );
}

EventsScreen.navigationOptions = {
  title: 'Events',
};

const styles = StyleSheet.create({
  attendanceSideBar: {
    // margin: 10,
    // flexDirection: "row",
    // borderRadius: 10,
    // backgroundColor: '#fafafa',
    // overflow: 'hidden',
    // height: 150,
    // alignItems: 'stretch',
    // borderColor: '#eee',
    width: 20,
    backgroundColor: '#FFFFFF'
  },
  flexParent: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    height: 150,
    alignItems: 'stretch',
    borderColor: '#eee',
    borderWidth: 1 // the border length
  },
  imageContainer: {
    flex: 2,
  },
  textContainer: {
    flex: 2,
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
  ButtonGroup: {
    backgroundColor: '#fafafa',
    height: 50
  }
});
