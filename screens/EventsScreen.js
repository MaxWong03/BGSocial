import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEventsData } from './../hooks/useEventsData';
import { ButtonGroup, Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils';
import EventItem from '../components/EventItem';
import { getUserInfo } from './../hooks/sessionContext';

export default function EventsScreen({navigation}) {
  const [screenState, setButtonGroup] = useState(0);

  const {
    state,
    dispatchState
  } = useEventsData();

  const slider = function (currentScreen) {
    setButtonGroup(currentScreen);
  };

  const buttons = ['My Events', 'Pending Events', 'Explore']

  const confirmEvents = (state) => {
    return state.events.filter(event => event.chosen_event_date.date)
  }

  const pendingEvents = (state) => {
    return state.events.filter(event => !event.chosen_event_date.date)
  }

  const { id } = getUserInfo();

  return (
    <ScrollView >
      <ButtonGroup
        buttons={buttons}
        containerStyle={styles.ButtonGroup}
        selectedIndex={screenState}
        onPress={slider}
      />
      {screenState === 0 &&
        confirmEvents(state).map((event, index) => {
          return (
            <EventItem
              key={index}
              date={formatDateWithTime(event.chosen_event_date.date)}
              imageUrl={event.event_games[0].image}
            />
          );
        })
      }
      {screenState === 1 &&
        pendingEvents(state).map((event, index) => {
          return (
            <EventItem
              key={index}
              hosted={id === event.owner_id}
              date={""}
              imageUrl={event.event_games[0].image}
            />
          );
        })
      }
      {screenState === 2 &&
        pendingEvents(state).map((event, index) => {
          return (
            <EventItem
              key={index}
              date={""}
              hosted={id === event.owner_id}
              imageUrl={event.event_games[0].image}
            />
          );
        })
      }
      <Icon
            size={50}
            name='add-circle'
            type='material-icons'
            color='#bdbdbd'
            onPress={() => navigation.navigate('CreateEvent')}
          />
    </ScrollView>
  );
};

EventsScreen.navigationOptions = {
  title: 'Events',
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
    flex: 1,
  },
  textContainer: {
    flex: 1,
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
