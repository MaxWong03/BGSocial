import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import RecordPlayer from '../components/CreateEventFriends';
import useFriendSlot from '../hooks/useFriendSlot';
import { useNavigationParam } from 'react-navigation-hooks';
import { getUserInfo } from './../hooks/sessionContext';


export default function CreatePlayScreen() {
  const userFriends = useNavigationParam('userFriends');
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const screenWidth = Dimensions.get('window').width;
  const { userData } = getUserInfo();
  const { avatar, id, name } = userData;
  console.log(avatar, id, name);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };
  return (
    <>
      <RecordPlayer
        changeFriendSlot={changeFriendSlot}
        userFriends={userFriends}
        buttonText={'Add Player Score'}
      />
      <BarChart
        data={data}
        height={220}
        width={screenWidth}
        chartConfig={chartConfig}
      />
    </>
  )
}

const styles = StyleSheet.create({

})

const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
}