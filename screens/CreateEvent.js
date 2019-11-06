import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import useFriendSlot from '../hooks/useFriendSlot';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { getUserInfo } from './../hooks/sessionContext';
import { api } from './../api';
import useButtonProps from '../hooks/useButtonProps';

export default function createEventScreen() {
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot();
  const { gameSlots, changeGameSlot } = useGameSlot();
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const [eventTitle, setEventTitle] = useState('');
  const { location, latitude, longitude, setLatitude, setLongitude } = useLocation();
  const refreshEventScreen = useNavigationParam('refreshEventScreen');
  const { navigate } = useNavigation();
  const userGames = useNavigationParam('userGames')
  const userFriends = useNavigationParam('userFriends')
  const { userData } = getUserInfo();
  const {buttonTitle, setButtonTitle, buttonColor, setButtonColor} 
  = useButtonProps('Create Event!', '#2089dc');
  
  const createEventAction = () => {
    if (!gameSlots.length) {
      setButtonColor('red');
      setButtonTitle('Select At Least One Game');
    } else if (!friendSlots.length) {
      setButtonColor('red')
      setButtonTitle('Invite At Least One Friend');
    } else {
      const eventDates = timeSlots.map(time => {
        setButtonColor('#2089dc');
        setButtonTitle('Create Event!');
        return {
          "date": JSON.stringify(time["date"]),
          "is_chosen": false,
          "is_open": true,
          "location": location
        }
      });

      const eventAttendants = friendSlots.map(friend => {
        return {
          "is_confirmed": false,
          "is_not_assisting": false,
          "attendant_id": friend
        }
      });

      eventAttendants.push({
        "is_confirmed": true,
        "is_not_assisting": false,
        "attendant_id": userData.id
      })

      const eventGames = gameSlots.map(game => {
        return {
          "game_id": game
        }
      })


      const newEvent = {
        "owner_id": userData.id,
        title: eventTitle,
        spots: eventAttendants.length,
        eventDates,
        eventAttendants,
        eventGames
      };

      api.post(`/events/`, newEvent).then((res) => {
        const { data: createdEvent } = res;
        createdEvent['chosen_event_date'] = {
          date: null,
          location: null
        };
        refreshEventScreen();
        navigate('Events');
      })
    }
  };

  return (
    <>
      <View style={styles.mapContainer}>
        {
          latitude && longitude ?
            <>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={({ nativeEvent }) => {
                  setLatitude(nativeEvent.coordinate.latitude);
                  setLongitude(nativeEvent.coordinate.longitude);
                }}
                children={
                  <Marker draggable coordinate={{ latitude, longitude }} />
                }
              />
              <EventTitle
                onChangeText={setEventTitle}
                value={eventTitle}
              />
            </>
            :
            <ActivityIndicator size='large' color="#0000ff" />
        }

      </View>
      <ScrollView >
        <EventDate
          timeSlots={timeSlots}
          addTimeSlot={addTimeSlot}
          changeTimeSlot={changeTimeSlot}
          deleteTimeSlot={deleteTimeSlot}
          buttonText={'Add Date'}
        />
        <EventGames
          userGames={userGames}
          changeGameSlot={changeGameSlot}
          buttonText={'Add Games'}
        />
        <EventFriends
          userFriends={userFriends}
          changeFriendSlot={changeFriendSlot}
          buttonText={'Invite Friends'}
        />
      </ScrollView>
      <Button
        title={buttonTitle}
        icon={
          <Icon
            name='check-circle'
            type='font-awesome'
            color='white'
            iconStyle={{marginRight: 5}}
          />
        }
        onPress={createEventAction}
        buttonStyle={{backgroundColor: buttonColor}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 150,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});