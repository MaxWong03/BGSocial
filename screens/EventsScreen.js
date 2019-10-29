import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useEventsData } from './../hooks/useEventsData';
import { ButtonGroup, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils';
import EventItem from '../components/EventItem';
import { getUserInfo } from './../hooks/sessionContext';

export default function EventsScreen({ navigation }) {
  const [screenState, setButtonGroup] = useState(0);

  const {
    state,
    dispatchState,
    confirmEvents,
    pendingEvents,
    confirmAttendants,
    userConfirmed
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

  const userId = 1;

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
    <View>
    <ScrollView>
      <ButtonGroup
        buttons={buttons}
        containerStyle={styles.buttonGroup}
        selectedIndex={screenState}
        onPress={slider}
      />
      {eventsToShow.map((event, index) => {
        return  (
          <EventItem
            key={index}
            chosenDate={event.chosen_event_date.date}
            imageUrl={event.event_games[0].image}
            isOwner={userId === event.owner_id}
            confirmedAssistance={userConfirmed(event, userId)}
            attendants={confirmAttendants(event.event_attendants).length}
          />
        );
      })}
      
    </ScrollView>
    <Icon
        size={30}
        name='calendar-plus-o'
        type='font-awesome'
        color='#0e92cf'
        onPress={() => navigation.navigate('CreateEvent')}
        iconStyle={styles.icon}
      />
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
    alignSelf:'flex-end'
  }
});