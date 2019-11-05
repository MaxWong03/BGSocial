import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import EventDates from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';
import EventTitle from '../components/CreateEventTitle';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import useFriendSlot from '../hooks/useFriendSlot';
import { id } from '../utils/makeNewID';
import useLocation from '../hooks/useLocation';
import { getUserInfo } from '../hooks/sessionContext';
import { api } from '../api';

export default function EditEventScreen() {
  const { navigate } = useNavigation();
  const event = useNavigationParam('event');
  const userGames = useNavigationParam('userGames');
  const userFriends = useNavigationParam('userFriends');
  const refreshEventScreen = useNavigationParam('refreshEventScreen')
  const { id: eventID, title, spots, is_open, event_dates, event_attendants, event_games } = event;
  const { location: presetLocation } = event_dates[0];
  const [eventTitle, setEventTitle] = useState(title);
  const { userData } = getUserInfo();

  const timeArray = event_dates.map((date) => {
    return {
      id: id(),
      date: date.date
    }
  });

  //states
  const { gameSlots, changeGameSlot } = useGameSlot(event_games);
  const { friendSlots, changeFriendSlot } = useFriendSlot(event_attendants);
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot(timeArray);
  const { location, latitude, longitude, setLatitude, setLongitude } = useLocation(presetLocation);

  const editEventAction = () => {

    const eventAttendants = friendSlots.map(friend => {
      const attendant = event_attendants.find(attendant => attendant.id === friend || attendant.id === friend.id);
      if (attendant) return {
        is_confirmed: attendant.is_confirmed,
        is_invited: attendant.is_invited,
        is_not_assisting: attendant.is_not_assisting,
        attendant_id: attendant.id,
        event_id: attendant.event_id
      }
      else return {
        is_confirmed: false,
        is_invited: true,
        is_not_assisting: false,
        attendant_id: friend,
        event_id: eventID

      }
    });

    eventAttendants.push({
      is_confirmed: true,
      is_invited: true,
      is_not_assisting: false,
      attendant_id: userData.id,
      event_id: eventID
    })

    const eventDates = timeSlots.map(time => {
      const eventTime = event_dates.find(dateObj => dateObj.date === time.date);
      if (eventTime) return {
        is_chosen: eventTime.is_chosen,
        is_open,
        date: eventTime.date,
        location: location
      }
      else return {
        is_chosen: false,
        is_open: true,
        location: location,
        date: time.date
      }
    })

    const eventGames = gameSlots.map(game => {
      return {
        "game_id": game.game_id || game
      }
    })

    const editEvent = {
      eventId: eventID,
      title: eventTitle,
      spots: eventAttendants.length,
      is_open,
      owner_id: userData.id,
      eventDates,
      eventAttendants,
      eventGames
    }

    api.post(`/events/${eventID}/`, editEvent).then((res) => {
      navigate('Events');
    })
    .catch(err => console.log(err));
  }
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
      <ScrollView>
        <EventDates
          timeSlots={timeSlots}
          addTimeSlot={addTimeSlot}
          changeTimeSlot={changeTimeSlot}
          deleteTimeSlot={deleteTimeSlot}
          buttonText={'Edit Date'}
        />
        <EventGames
          userGames={userGames}
          changeGameSlot={changeGameSlot}
          eventGameList={event_games.map(game => {
            return {
              ...game['game'],
              selected: true
            }
          })}
          buttonText={'Edit Games'}
        />
        <EventFriends
          userFriends={userFriends}
          changeFriendSlot={changeFriendSlot}
          eventFriendList={event_attendants.map(friend => {
            return {
              ...friend,
              invited: true
            }
          })}
          buttonText={'Edit Attendance'}
        />
      </ScrollView>
      <Button
        title='Edit Event!'
        icon={
          <Icon
            name='check-circle'
            type='font-awesome'
            color='white'
          />
        }
        onPress={editEventAction}
      />
    </>
  )
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