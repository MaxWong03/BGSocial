import React, {useEffect, useState, Fragment} from 'react';
import { SearchBar } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks';
import AttendenceList from '../components/AttendenceList';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
 } from "react-native-chart-kit";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function testScreen() {
  const { navigate } = useNavigation();
  const [search, setSearch] = useState();
  
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
    <Fragment>






    <View 
    style= {styles.container}
    >
      {/* <SearchBar
        placeholder="Type Here..."
        // onChangeText={(event) => {setSearch(event)}}
        // value={search}
      /> */}
      <AttendenceList />
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
            width: '70%',
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
    </View>

<View 
style= {styles.container}
>
  {/* <SearchBar
    placeholder="Type Here..."
    // onChangeText={(event) => {setSearch(event)}}
    // value={search}
  /> */}
  <AttendenceList />
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
        width: '70%',
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
</View>

<View 
    style= {styles.container}
    >
      {/* <SearchBar
        placeholder="Type Here..."
        // onChangeText={(event) => {setSearch(event)}}
        // value={search}
      /> */}
      <AttendenceList />
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
            width: '70%',
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
    </View>

    <View 
    style= {styles.container}
    >
      {/* <SearchBar
        placeholder="Type Here..."
        // onChangeText={(event) => {setSearch(event)}}
        // value={search}
      /> */}
      <AttendenceList />
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
            width: '70%',
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
    </View>

    <View 
    style= {styles.container}
    >
      {/* <SearchBar
        placeholder="Type Here..."
        // onChangeText={(event) => {setSearch(event)}}
        // value={search}
      /> */}
      <AttendenceList />
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
            width: '70%',
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
    </View>
    </Fragment>
  );
};