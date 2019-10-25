import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
 } from "react-native-chart-kit";

import { useNavigation } from 'react-navigation-hooks';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function testScreen() {
  const {dangerouslyGetParent} = useNavigation();
  const { id, profilePicture } = dangerouslyGetParent().dangerouslyGetParent().getParam('userInfo');
  console.log('@TestsScreen:', id, profilePicture);
  const [data, setData] = useState(              
  [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    34,
  ]);
  // useEffect(() => {
  //   setInterval(() => {
  //     setData(() => {
  //       [
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //       ]
  //     })
  //   }, 500);
  // }, [data]);
  return(
    <View style={styles.container}>
      <Image 
       style={{width: 350, height: 250}}
      source={{uri: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=250&ext=1574562652&hash=AeQvzdgfz_mcRB1s'}}
      />
      <LineChart
        data={{
          // the month
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                34,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={220}
        yAxisLabel={'Rs'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          // shape color
          color: (opacity = 255) => `#FF0000`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};