import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { useEventsData } from './../hooks/useEventsData';
import { ButtonGroup, Icon } from 'react-native-elements';
import { getConfirmedAttendants } from './../utils';
import EventItem from '../components/EventItem';
import { getUserInfo } from './../hooks/sessionContext';
import useGamesData from '../hooks/useGamesData';
import useFriendsData from '../hooks/useFriendsData';

export default function EventsScreen({ navigation }) {
  // Refreshing attempt

  const fetchData = async() =>{ // get the data again
    loadGames();
    loadAllFriends();
    loadEvents();
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    // console.log("in the onrefresh function");
    setRefreshing(true);
    fetchData().then(()=>{
        setRefreshing(false)
    })
  }, [refreshing]);

  // end of reffreshign attempt code

  const [screenState, setButtonGroup] = useState(0);
  const { state: userGames, loadGames } = useGamesData();
  const { state: userFriends, loadAllFriends } = useFriendsData();
  function onWillFocus(payload) {
    loadGames();
    refreshEventScreen();
  }
  const {
    state,
    confirmEvents,
    pendingEvents,
    userConfirmed,
    removeEvent,
    goingToEvent,
    setConfirmEvent,
    refreshEventScreen,
    notGoingToEvent,
    openEvents,
    loadEvents
  } = useEventsData();
  const slider = function (currentScreen) {
    setButtonGroup(currentScreen);
  };
  const buttons = ['My Events', 'Pending Events', 'Explore']
  const { userData } = getUserInfo();
  const userId = userData.id;
  let eventsToShow = [];
  if (screenState === 0) {
    eventsToShow = confirmEvents(state, userId);
  }
  else if (screenState == 1) {
    eventsToShow = pendingEvents(state, userId);
  }
  else if (screenState == 2) {
    eventsToShow = openEvents(state, userId);
  }

  console.log(state.events.spots)
  return (
    <View style={{ height: "100%" }}>
      <NavigationEvents onWillFocus={onWillFocus} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }
      >
        <ButtonGroup
          buttons={buttons}
          containerStyle={styles.buttonGroup}
          selectedIndex={screenState}
          onPress={slider}
        />
        <View style={{paddingHorizontal: 14}}>
          {eventsToShow.map((event) => {
            return (
              <EventItem
                key={event.id}
                chosenDate={event.chosen_event_date.date}
                imageUrl={event.event_games[0].image}
                eventTitle={event.title || event.event_games[0].name}
                isOwner={userId === event.owner_id}
                confirmedAssistance={userConfirmed(event, userId)}
                attendants={getConfirmedAttendants(event).length}
                spots={event.spots}
                isOpen={event.is_open}
                onPress={() => navigation.navigate('SingleEvent', {
                  eventID: event.id,
                  removeEvent,
                  goingToEvent,
                  setConfirmEvent,
                  notGoingToEvent,
                  userGames,
                  userFriends
                })}
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.iconBox}>
        <Icon
          size={20}
          name='calendar-plus-o'
          type='font-awesome'
          color='white'
          onPress={() => navigation.navigate('CreateEvent', {
            userGames,
            userFriends,
            refreshEventScreen,
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
    color: 'white'
  },
  iconBox: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0e92cf',
    borderRadius: 1000,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignContent: 'center'
  }
});