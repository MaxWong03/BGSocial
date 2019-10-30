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
import EventItem from '../components/EventItem';
import api from './../api';



export default function SingleEventScreen({ navigation }) {
  const [state, setState] = useState({});

  function openDeleteModal () {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => deleteEvent(state.event.id)},
      ],
      {cancelable: false},
    );
  }

  useEffect(() => {
    loadSingleEvent(navigation.getParam('eventID'));
  }, [navigation.state.params.eventID]);

  const deleteEventCallback = navigation.getParam('removeEvent');

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
        <Text>{!!chosenDate ? chosenDate.location : ""}</Text>
        <Text>{!!chosenDate ? formatDateWithTime(chosenDate.date) : ""}</Text>
        <Text>{!!chosenDate ? `Attendants: ${confirmedAttendants.length}` : ""}</Text>
        <Icon
          size={30}
          name='trash-o'
          type='font-awesome'
          color='#cf0e11'
          onPress={() => openDeleteModal()}
          iconStyle={styles.icon}
        />
        <Button

          title="Confirm"
        />
      </View>
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  mainContainer: {

  },
  flexParent: {
    justifyContent: 'space-around',
    flexDirection: "row",
    height: 300
  },
  attendantsListContainer: {
    flex: 0,
    backgroundColor: '#fafafa',
    width: 40
  },
  button: {
    justifyContent: 'space-around'
  },
  ButtonGroup: {
    backgroundColor: '#fafafa',
    height: 50
  },
  imageContainer: {
    alignSelf: 'flex-end'
  },
  image: {
    width: 330,
    height: 300,
    resizeMode: 'stretch'
  },
  textContainer: {
    flex: 2,
    height: 400
  },
  modalContainer: {
    height: 200
  }
});
