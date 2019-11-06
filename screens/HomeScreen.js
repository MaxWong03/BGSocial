
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { getUserInfo } from './../hooks/sessionContext';
import { Avatar } from 'react-native-elements';
import { useEventsData } from './../hooks/useEventsData';
import EventItem from './../components/EventItem';
import { getConfirmedAttendants } from './../utils';
import {useNavigation} from 'react-navigation-hooks';

export default function HomeScreen() {

  const {navigate} = useNavigation();
  const { userData, profilePicture, name } = getUserInfo();
  const userId = userData.id;

  // Refreshing attempt
  const fetchData = async() =>{ // get the data again
    loadEvents();
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(()=>{
        setRefreshing(false)
    })
  }, [refreshing]);

  // end of reffreshign attempt code

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

  let eventToShow = [];
  eventToShow = confirmEvents(state, userId)
  let event = null;

  useEffect( ()=>{
    loadEvents();
  }, [])

  // const eventDates = eventToShow.map(event => event.chosen_event_date.date);


  if(eventToShow) {
    const mostRecentDate = new Date(Math.min.apply(null, eventToShow.map(event => new Date(event.chosen_event_date.date))));
    event = eventToShow.find(event => new Date(event.chosen_event_date.date).toString() === mostRecentDate.toString());
  }


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }
      >
        <View style={styles.welcomeContainer}>
          <Avatar
            rounded
            source={{ uri: `${profilePicture}` }}
            size="xlarge"
          />
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>{name}</Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Welcome to BGSocial!
            </Text>
          </TouchableOpacity>
        </View>

        {event &&
        <EventItem
          // key={event.id}
          chosenDate={event.chosen_event_date.date}
          imageUrl={event.event_games[0].image}
          eventTitle={event.title || event.event_games[0].name}
          isOwner={userId === event.owner_id}
          confirmedAssistance={userConfirmed(event, userId)}
          attendants={getConfirmedAttendants(event).length}
          onPress={() => navigate('SingleEvent', {
            eventID: event.id,
            removeEvent,
            goingToEvent,
            setConfirmEvent,
            notGoingToEvent,
            // userGames,
            // userFriends
          })}
        />}

      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://github.com/MaxWong03/BGSocial'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
