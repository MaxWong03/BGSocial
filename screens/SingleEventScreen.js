import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import {
  formatDateWithTime,
  getEventMainImage,
  getEventChosenEventDate,
  getConfirmedAttendants
} from './../utils';
import IconVerticalWithLabel from '../components/IconVerticalWithLabel'
import AttendanceList from '../components/AttendanceList';
import IconBar from '../components/IconBar';
import { api } from './../api';
import { getUserInfo } from './../hooks/sessionContext';
import { useNavigationParam } from 'react-navigation-hooks';



export default function SingleEventScreen({ navigation }) {
  const [state, setState] = useState({});
  const userGames = useNavigationParam('userGames');
  const userFriends = useNavigationParam('userFriends');

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
  function notGoingModal() {
    Alert.alert(
      'Reject Event assistance',
      'Are you sure you are not going to this event? The event will not appear in your event list anymore.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Not Going', onPress: () => notGoing(state.event.id) },
      ],
      { cancelable: false },
    );
  }

  useEffect(() => {
    loadSingleEvent(navigation.getParam('eventID'));
  }, [navigation.state.params.eventID]);

  const deleteEventCallback = navigation.getParam('removeEvent');
  const goingEventCallback = navigation.getParam('goingToEvent');
  const notGoingEventCallback = navigation.getParam('notGoingToEvent');
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

  async function goingToEvent(eventId) {
    await api.post(`/events/${eventId}/going`);
    await goingEventCallback(eventId);
    loadSingleEvent(eventId);
  }

  async function notGoing(eventId) {
    await notGoingEventCallback(eventId);
    navigation.navigate('Events');
  }

  async function confirmEvent(eventId, eventDateId) {
    await confirmEventCallback(eventId, eventDateId);
    loadSingleEvent(eventId);
  }

  async function voteEventDate(eventId, eventDateId) {
    await api.post(`/events/${eventId}/dates/${eventDateId}/vote`);
    loadSingleEvent(eventId);
  }

  async function cancelvoteEventDate(eventId, eventDateId) {
    await api.post(`/events/${eventId}/dates/${eventDateId}/vote-delete`);
    loadSingleEvent(eventId);
  }


  const userId = getUserInfo().userData.id;

  if (isLoading()) {
    return (<ActivityIndicator size='large' color="#0000ff" style={{ marginTop: 200 }} />) // display loading...
  }

  function renderChosenDateInfo(chosenDate, confirmedAttendants) {
    const chosenDateViewData = [
      {
        iconName: 'map-pin',
        iconColor: '#bdbdbd',
        textInfo: chosenDate.location,
      },
      {
        iconName: 'calendar-o',
        iconColor: '#bdbdbd',
        textInfo: formatDateWithTime(chosenDate.date),
      },
      {
        iconName: 'group',
        iconColor: '#bdbdbd',
        textInfo: `Attendants: ${confirmedAttendants.length}`,
      }
    ];
    return (
      <IconBar iconsData={chosenDateViewData} horizontal={false} padding={10} />
    )
  }

  function renderOwnerEventBody(event) {

    return event.event_dates.map((eventDate) => {
      const iconBarData = [
        {
          iconName: 'map-pin',
          textInfo: eventDate.location,
        },
        {
          iconName: 'calendar-o',
          textInfo: formatDateWithTime(eventDate.date),
        },
        {
          iconName: 'group',
          textInfo: `Votes: `,
        }
      ];
      return (
        <View key={eventDate.id} style={styles.eventDateChooseDateContainer}>
          <View style={{ flex: 1 }}>
            <IconBar iconsData={iconBarData} horizontal={false} padding={4} />
          </View>
          <View style={{ flex: 0, padding: 10 }}>
            <IconVerticalWithLabel
              iconName="calendar-o"
              textInfo="Choose Date"
              iconColor="blue"
              onPress={() => confirmEvent(event.id, eventDate.id)}
            />
          </View>
        </View>
      )
    });
  }

  function renderVotesEventBody(event) {

    return event.event_dates.map((eventDate) => {
      const iconBarData = [
        {
          iconName: 'map-pin',
          textInfo: eventDate.location,
        },
        {
          iconName: 'calendar-o',
          textInfo: formatDateWithTime(eventDate.date),
        },
        {
          iconName: 'group',
          textInfo: `Votes: ${getVotesByDateId(event.event_votes, eventDate.id).length}`,
        }
      ];
      return (
        <View key={eventDate.id} style={styles.eventDateChooseDateContainer}>
          <View style={{ flex: 1 }}>
            <IconBar iconsData={iconBarData} horizontal={false} padding={4} />
          </View>
          <View style={{ flex: 0, padding: 10 }}>
            <IconVerticalWithLabel
              iconName={checkVoteOfUserByDateId(userId, eventDate.id, event.event_votes) ? "calendar-times-o" : "calendar-check-o"}
              textInfo={checkVoteOfUserByDateId(userId, eventDate.id, event.event_votes) ? 'Cancel Vote' : 'Vote!'}
              iconColor={checkVoteOfUserByDateId(userId, eventDate.id, event.event_votes) ? 'red' : 'blue'}
              onPress={() => checkVoteOfUserByDateId(userId, eventDate.id, event.event_votes) ?
                cancelvoteEventDate(event.id, eventDate.id) : voteEventDate(event.id, eventDate.id)}
            />
          </View>
        </View>
      )
    });
  }

  function getOwnerButtons() {
    const buttons = [
      {
        iconName: 'edit', textInfo: 'Edit',
        onPress: () => navigation.navigate('EditEvent', {
          event: state.event,
          userGames,
          userFriends
        })
      },
    ];
    if (chosenDate) {
      buttons.push({
        iconName: 'check', textInfo: 'Open Event',
        onPress: () => navigation.navigate('EditEvent', {
          event: state.event,
          userGames,
          userFriends
        })
      });
    }
    buttons.push({ iconName: 'trash-o', textInfo: 'Delete', onPress: openDeleteModal });
    return buttons;
  }

  function getAttendantButtons(eventAttendants) {
    const attendantButtons = [];
    if (eventAttendants.find(attendant => userId === attendant.attendant_id)) {
      attendantButtons.push({
        iconName: 'frown-o',
        iconType: 'font-awesome',
        textInfo: 'Not Going',
        onPress: notGoingModal
      });
    }
    if (chosenDate) {
      const button = {
        iconName: 'check',
        iconType: 'EvilIcon',
        textInfo: 'Going',
        onPress: () => goingToEvent(state.event.id)
      };
      if (checkIfUserIsGoing(eventAttendants, userId)) {
        button['iconColor'] = 'blue';
      }
      attendantButtons.push(button);
    }
    return attendantButtons;
  }

  function getVotesByDateId(eventVotes, eventDateId) {
    return eventVotes.filter(eventDate => eventDate.event_date_id === eventDateId)

  }

  function checkVoteOfUserByDateId(userId, eventDateId, eventVotes) {
    return getVotesByDateId(eventVotes, eventDateId).find(vote => vote.user_id === userId)
  }

  function checkIfUserIsGoing(eventAttendants, userId) {
    return !!eventAttendants.find(attendant => userId === attendant.attendant_id && attendant.is_confirmed === true)
  }

  const isOwner = userId === state.event.owner_id;
  const chosenDate = getEventChosenEventDate(state.event);
  const confirmedAttendants = getConfirmedAttendants(state.event);

  const iconBarItems = isOwner ? getOwnerButtons() : getAttendantButtons(state.event.event_attendants);


  //Here start the component rendered
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
      <View style={styles.iconBar}>
        <IconBar
          iconsData={iconBarItems}
          horizontal={true}
        />
      </View>
      <View style={styles.textContainer}>
        {chosenDate && renderChosenDateInfo(chosenDate, confirmedAttendants)}
        {isOwner && !chosenDate && renderOwnerEventBody(state.event)}
        {!isOwner && !chosenDate && renderVotesEventBody(state.event)}
      </View>
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  eventDateChooseDateContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1
  },
  button: {
    flex: 1
  },
  flexParent: {
    flexDirection: "row",
    backgroundColor: '#EEE'
  },
  flexBoxText: {
    justifyContent: 'space-around',
    flexDirection: "row",
  },
  attendantsListContainer: {
    flex: 0,
    backgroundColor: '#fafafa',
    width: 40,
    height: 220
  },
  imageContainer: {
    alignSelf: 'flex-end'
  },
  iconBar: {
    marginVertical: 6,
    borderTopColor: '#DDD',
    borderBottomColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 6
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 30,
    overflow: 'hidden',
    marginVertical: 10
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-around'
  },
  modalContainer: {
    height: 200
  }
});
