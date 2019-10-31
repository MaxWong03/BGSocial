import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {
  formatDateWithTime,
  getEventMainImage,
  getEventChosenEventDate,
  getConfirmedAttendants
} from './../utils';
import AttendanceList from '../components/AttendanceList';
import api from './../api';



export default function SingleEventScreen({ navigation }) {
  const [state, setState] = useState({});

  function openDeleteModal() {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteEvent(state.event.id) },
      ],
      { cancelable: false },
    );
  }

  useEffect(() => {
    loadSingleEvent(navigation.getParam('eventID'));
  }, [navigation.state.params.eventID]);

  const deleteEventCallback = navigation.getParam('removeEvent');
  const goingEventCallback = navigation.getParam('goingToEvent');
  const confirmEventCallback = navigation.getParam('setConfirmEvent');

  function isLoading() {
    return !state.event || state.event.id != navigation.getParam('eventID');
  }

  async function loadSingleEvent(id) {
    const event = await api.get(`/events/${id}`);
    setState({ ...state, event: event.data });
  };

  function deleteEvent(eventId) {
    deleteEventCallback(eventId);
    navigation.navigate('Events');
  }

  function goingToEvent(eventId) {
    goingEventCallback(eventId);
    navigation.navigate('Events');
  }

  function confirmEvent(eventId) {
    loadSingleEvent(eventId)
    confirmEventCallback(eventId);
  }


  const userId = 1;

  if (isLoading()) {
    return (<View></View>) // display loading...
  }

  const chosenDate = getEventChosenEventDate(state.event);
  const confirmedAttendants = getConfirmedAttendants(state.event);

  // console.log('state.event', state.event);
  // console.log('getEventMainImage(state.event)', getEventMainImage(state.event));

  return (
    <ScrollView style={styles.mainContainer}>
      <Text>Single Event</Text>
      <View style={styles.flexParent}>
        <View style={styles.attendantsListContainer}>
          <AttendanceList backgroundColor={'#fafafa'} />
        </View>
        <Image
          style={styles.image}
          source={{ uri: getEventMainImage(state.event) }}
        />
      </View>
      <View style={styles.textContainer}>
        <View >
          <View style={styles.flexBoxText}>
            <View style={{ flex: 0, width: 30, alignItems: 'center' }}>
              <Icon
                size={20}
                name='map-pin'
                type='font-awesome'
                color='#bdbdbd'
                iconStyle={styles.icon}
              />
            </View>
            <Text style={{ flex: 1 }}>{!!chosenDate ? chosenDate.location : ""}</Text>
          </View>
          <View style={styles.flexBoxText}>
            <View style={{ flex: 0, width: 30, alignItems: 'center' }}>
              <Icon
                size={20}
                name='calendar-o'
                type='font-awesome'
                color='#bdbdbd'
                iconStyle={styles.icon}
              />
            </View>
            <Text style={{ flex: 1 }}>{!!chosenDate ? formatDateWithTime(chosenDate.date) : ""}</Text>
          </View>
          <View style={styles.flexBoxText}>
            <View style={{ flex: 0, width: 30, alignItems: 'center' }}>
              <Icon
                size={20}
                name='group'
                type='font-awesome'
                color='#bdbdbd'
                iconStyle={styles.icon}
              />
            </View>
            <Text style={{ flex: 1 }}>{!!chosenDate ? `Attendants: ${confirmedAttendants.length}` : ""}</Text>
          </View>
        </View>


        {(userId === state.event.owner_id) &&
          <View>
            {!chosenDate &&
              <Button
                buttonStyle={styles.button}
                title="Confirm Event"
                type='outline'
                iconRight={true}
                onPress={() => confirmEvent(state.event.id)}
                icon={
                  <Icon
                    size={20}
                    name='check-square-o'
                    type='font-awesome'
                    color='#cf0e11'
                    iconStyle={styles.icon}
                  />
                }
              />
            }
            <Button
              buttonStyle={styles.button}
              title="Delete Event"
              type='outline'
              iconRight={true}
              onPress={() => openDeleteModal()}
              icon={
                <Icon
                  size={20}
                  name='trash-o'
                  type='font-awesome'
                  color='#cf0e11'
                  iconStyle={styles.icon}
                />
              }
            />
            <Icon
              size={30}
              name='qq'
              type='font-awesome'
              color='#0e92cf'
              onPress={() => navigation.navigate('EditEvent', {
                event: state.event
              })}
              iconStyle={styles.icon}
            />
          </View>}
      </View>
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  flexParent: {
    flexDirection: "row",
    height: 210
  },
  flexBoxText: {
    justifyContent: 'space-around',
    flexDirection: "row",

  },
  attendantsListContainer: {
    flex: 0,
    backgroundColor: '#fafafa',
    width: 40,
    height: 200
  },
  button: {
    justifyContent: 'space-around',
    width: 200,
    alignSelf: 'center'
  },
  imageContainer: {
    alignSelf: 'flex-end'
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'stretch'
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-around'
  },
  modalContainer: {
    height: 200
  }
});
