import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
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
import { Overlay, Button, Text, ListItem, CheckBox } from 'react-native-elements';



export default function SingleEventScreen({ navigation }) {
  const [state, setState] = useState({});
  const [overlay, setOverlay] = useState(false);
  const [count, setCount] = useState(state.spots || 0);
  const userGames = useNavigationParam('userGames');
  const userFriends = useNavigationParam('userFriends');

  function deleteModal() {
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

  function cancelOpenModal() {
    Alert.alert(
      'Open Event Cancellation',
      `Plese press confirm if you want to close your event only for your invited friends`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => setOpenEvent(state.event.id, false) },
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

  async function setOpenEvent(eventId, isOpen) {
    try {
      console.log('setOpenEvent(eventId)', eventId);
      await api.post(`/events/${eventId}`, { spots: (count + confirmedAttendants.length), is_open: isOpen })
      setOverlay(false)
      loadSingleEvent(eventId);
    } catch (e) {
      console.log(e)
    }
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
      <IconBar iconsData={chosenDateViewData} horizontal={false} padding={2} />
    )
  }

  function renderOwnerEventBody(event) {

    return (
      <View style={styles.boxShadow}>
        {event.event_dates.map((eventDate) => {
          const iconBarData = [
            {
              iconName: 'map-pin',
              textInfo: eventDate.location,
              iconColor: '#BBB'
            },
            {
              iconName: 'calendar-o',
              textInfo: formatDateWithTime(eventDate.date),
              iconColor: '#BBB'
            },
            {
              iconName: 'group',
              textInfo: `Votes: `,
              iconColor: '#BBB'
            }
          ];

          return (
            <ListItem
              key={eventDate.id}
              title={
                <IconBar iconsData={iconBarData} horizontal={false} padding={3} />
              }
              rightElement={
                <Button
                  type='outline'
                  title='CHOOSE'
                  buttonStyle={{ paddingVertical: 4 }}
                  titleStyle={{ fontSize: 12 }}
                  onPress={() => confirmEvent(event.id, eventDate.id)}
                />
              }
              bottomDivider
            />
          );
        })}
      </View>
    );
  }

  function renderVotesEventBody(event) {
    return (
      <View style={styles.boxShadow}>
        {event.event_dates.map((eventDate) => {
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
          const checked = !!checkVoteOfUserByDateId(userId, eventDate.id, event.event_votes);
          return (
            <ListItem
              key={eventDate.id}
              title={
                <IconBar iconsData={iconBarData} horizontal={false} padding={3} />
              }
              checkBox={{
                containerStyle: { backgroundColor: 'white', borderColor: 'white' },
                checked: checked,
                title: 'Vote',
                onPress: () => {
                  checked ?
                    cancelvoteEventDate(event.id, eventDate.id) : voteEventDate(event.id, eventDate.id)
                }
              }}
              bottomDivider
            />
          );
        })}
      </View>
    );
  }

  function renderConfirmAttendances(confirmedAttendants) {
    return (
      <View style={styles.boxShadow}>
        <ListItem
          topDivider
          title='Attendants'
          bottomDivider
        />
        {confirmedAttendants.map((attendant) => (
          <ListItem
            key={attendant.id}
            leftAvatar={{ source: { uri: attendant.avatar } }}
            title={attendant.name}
            containerStyle={{ padding: 5 }}
            bottomDivider
          />
        ))}
      </View>
    )
  }

  function renderGames(games) {
    return (
      <View style={styles.boxShadow}>
        <ListItem
          topDivider
          title="Event's Games"
          bottomDivider
        />
        {games.map((gameData) => (
          <ListItem
            key={gameData.id}
            rightAvatar={{ size: 40, rounded: false, source: { uri: gameData.game.image } }}
            title={gameData.game.name}
            containerStyle={{ paddingVertical: 5, paddingHorizontal: 18 }}
            bottomDivider
          />
        ))}
      </View>
    )
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
    if (state.event.is_open) {
      const button = {
        iconName: 'check',
        textInfo: 'Open Event',
        iconColor: 'blue',
        onPress: () => cancelOpenModal()
      }
      buttons.push(button)
    } else {
      const button = {
        iconName: 'check',
        textInfo: 'Open Event',
        onPress: () => setOverlay(true)
      }
      buttons.push(button)
    }
    buttons.push({ iconName: 'trash-o', textInfo: 'Delete', onPress: deleteModal });
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
      <View style={styles.boxShadow}>
        <ListItem
          leftAvatar={{ size: 120, rounded: false, source: { uri: getEventMainImage(state.event) } }}
          title={state.event.title ? state.event.title : state.event.event_games[0].game.name}
          containerStyle={{ padding: 10 }}
          pad={10}
          titleStyle={{ paddingLeft: 8, paddingBottom: 10, fontSize: 18 }}
          subtitle={
            <View>
              {chosenDate && renderChosenDateInfo(chosenDate, confirmedAttendants)}
            </View>
          }
        />
        <View style={styles.iconBar}>
          <IconBar
            iconsData={iconBarItems}
            horizontal={true}
          />
        </View>
      </View>
      <View>
        {chosenDate && renderConfirmAttendances(confirmedAttendants)}
        {isOwner && !chosenDate && renderOwnerEventBody(state.event)}
        {!isOwner && !chosenDate && renderVotesEventBody(state.event)}
        {renderGames(state.event.event_games)}
      </View>
      <Overlay
        isVisible={overlay}
        windowBackgroundColor="rgba(0, 0, 0, .7)"
        overlayBackgroundColor='white'
        onBackdropPress={() => setOverlay(false)}
        height="auto"
      >
        <View style={{paddingHorizontal: 14, paddingVertical: 8}}>
          <Text h4 style={{ marginBottom: 10 }}>Open Event to friends</Text>

          <Text>You are about to open your event to all your friends.
           How many extra spots you want to leave available? So far your confirm attendants are {confirmedAttendants.length}
          </Text>
          <View style={{ marginVertical: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Button
              title="-"
              type="outline"
              onPress={() => setCount(count - 1)}
            />
            <Text style={{ fontSize: 16, paddingHorizontal: 16 }}>{count}</Text>
            <Button
              title="+"
              type="outline"
              onPress={() => setCount(count + 1)}
            />
          </View>
          <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <Button
              title="Cancel"
              type="clear"
              onPress={() => setOverlay(false)}
            />
            <Button
              title="Accept"
              type="clear"
              onPress={() => setOpenEvent(state.event.id, true)}
            />
          </View>
        </View>
      </Overlay>
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
  boxShadow: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 16,
    backgroundColor: 'white'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4'
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
    backgroundColor: 'white',
    marginTop: 6,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
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
  },
});
