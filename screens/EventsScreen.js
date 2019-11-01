import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useEventsData } from './../hooks/useEventsData';
import { ButtonGroup, Icon } from 'react-native-elements';
import { getConfirmedAttendants } from './../utils';
import EventItem from '../components/EventItem';
import { getUserInfo } from './../hooks/sessionContext';
import useGamesData from '../hooks/useGamesData';
import useFriendsData from '../hooks/useFriendsData';

export default function EventsScreen({ navigation }) {
  const [screenState, setButtonGroup] = useState(0);
  const { state: userGames } = useGamesData();
  const { state: userFriends } = useFriendsData();

  const {
      state,
    confirmEvents,
    pendingEvents,
    userConfirmed,
    removeEvent,
    goingToEvent,
    setConfirmEvent,
    refreshEventScreen
  } = useEventsData();

//third view
  // useEffect(()={
  //   if (screenState == 2 ) {
  //     updateOpenEvents();
  //   }
  // }, screenState );

  const slider = function (currentScreen) {
    setButtonGroup(currentScreen);
  };

  const buttons = ['My Events', 'Pending Events', 'Explore']

  const { userData } = getUserInfo();

  const userId = userData.id;

  let eventsToShow = [];
  if ( screenState === 0 ) {
    eventsToShow = confirmEvents(state, userId);
  }
  else if (screenState == 1 ) {
    eventsToShow = pendingEvents(state, userId);
  }
  //third view
  // else if (screenState ==2) {
  //   eventsToShow = state.openEvents;
  // }

  return (
    <View style={{height:"100%"}}>
    <ScrollView>
      <ButtonGroup
        buttons={buttons}
        containerStyle={styles.buttonGroup}
        selectedIndex={screenState}
        onPress={slider}
      />
      {eventsToShow.map((event) => {
        return  (
          <EventItem
            key={event.id}
            chosenDate={event.chosen_event_date.date}
            imageUrl={event.event_games[0].image}
            isOwner={userId === event.owner_id}
            confirmedAssistance={userConfirmed(event, userId)}
            attendants={getConfirmedAttendants(event).length}
            onPress={() => navigation.navigate('SingleEvent', {
              eventID: event.id,
              removeEvent,
              goingToEvent,
              setConfirmEvent
            })}
          />
        );
      })}
      
    </ScrollView>
    <View style={styles.iconBox}>
    <Icon
        size={30}
        name='calendar-plus-o'
        type='font-awesome'
        color='white'
        onPress={() => navigation.navigate('CreateEvent', {
          userGames,
          userFriends,
          refreshEventScreen
        })}
        iconStyle={styles.icon}
      />
      </View>
    </View>
  );
};

EventsScreen.navigationOptions = {
  title: 'Events',
};

const styles = StyleSheet.create({
  buttonGroup: {
    backgroundColor: '#fafafa',
    height: 50
  },
  icon: {
    margin: 20,
    alignSelf:'flex-end',
  },
  iconBox: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0e92cf',
    borderRadius: 1000,
    padding:0,
    opacity:0.8

  }

});