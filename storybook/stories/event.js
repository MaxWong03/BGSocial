import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';
import AttendanceList from '../../components/AttendanceList';
import React, { Fragment } from 'react';

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
 
storiesOf('Events', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('InviteFriends can be closed via a button', () => (
    <Fragment>
    <View 
      style= {styles.container}
      >
        {/* <SearchBar
          placeholder="Type Here..."
          // onChangeText={(event) => {setSearch(event)}}
          // value={search}
        /> */}
        <AttendanceList />
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
  ));