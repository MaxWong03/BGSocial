import React, {useEffect, useState} from 'react';
import { SearchBar } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks';


import {
  StyleSheet,
  Text,
  View,
  Dimensions
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
    // flex: 1,
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
  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }
  ];

  
  return(
    <View>
      <SearchBar
        placeholder="Type Here..."
        // onChangeText={(event) => {setSearch(event)}}
        // value={search}
      />

      <View style={styles.container}>
        <Text> Replace This Text Container To Test Out Components</Text>
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
      <View>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              topDivider
              bottomDivider
              chevron
              onPress={() => {
                navigate('Home');
              }}
            />
          ))
        }
      </View>
    </View>
  );
};