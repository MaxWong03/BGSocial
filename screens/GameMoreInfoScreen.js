import React, { useState } from 'react';
import GameInfo from './../components/GameInfo';
import { ListItem, Icon, Text } from 'react-native-elements';
import { api } from '../api';
import { Text as SVGText } from 'react-native-svg';
import { View, ScrollView, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { AreaChart, XAxis, BarChart, Grid } from 'react-native-svg-charts'

export default function GameMoreInfoScreen({ navigation }) {
  const individualGame = navigation.getParam("game");

  const [state, setStatisticsPlay] = useState({
    playsDataUser: {},
    playsDataGlobal: {},
    playsDataLocal: {}
  });

  const [dataState, setData] = useState({
    friendsData: [],
    userData: [],
    globalData: []
  })

  async function loadPlaysStatistics() {
    const playsDataLocal = await api.get(`/plays/${individualGame.id}/games-statistics?users=friends`);
    const playsDataUser = await api.get(`/plays/${individualGame.id}/games-statistics?`);
    const playsDataGlobal = await api.get(`/plays/${individualGame.id}/games-statistics?users=global`);

    setStatisticsPlay({
      ...state,
      playsDataLocal: playsDataLocal.data[0],
      playsDataUser: playsDataUser.data[0],
      playsDataGlobal: playsDataGlobal.data[0],
    });

    if (playsDataLocal.data.length > 0 && playsDataUser.data.length > 0 && playsDataGlobal.data.length) {
      setData({
        ...dataState, friendsData: [playsDataLocal.data[0].max_score, Math.round(Number(playsDataLocal.data[0].avg_score) * 100) / 100, playsDataLocal.data[0].min_score],
        userData: [playsDataUser.data[0].max_score, Math.round(Number(playsDataUser.data[0].avg_score) * 100) / 100, playsDataUser.data[0].min_score],
        globalData: [playsDataGlobal.data[0].max_score, Math.round(Number(playsDataGlobal.data[0].avg_score) * 100) / 100, playsDataGlobal.data[0].min_score]
      })
    };
  }


  function getData(state, user) {
    console.log([user.data[0].max_score, Number(user.data[0].avg_score), user.data[0].min_score])
    if (!!userData) {
      return [user.data[0].max_score, Math.round(Number(user.data[0].avg_score) * 100) / 100, user.data[0].min_score]
    }
  }


  if (!!dataState) {
    const CUT_OFF = Math.max(...[...dataState.friendsData, ...dataState.userData, ...dataState.globalData]) / 3 * 2
    Labels = ({ x, y, bandwidth, data }) => {
      // console.log('Labels', x, y, bandwidth, data);
      const arrayOfArrays = data.map((value, index) => {
        // console.log('value', value);
        return value.data.map((valueItem, index2) => {
          const xDistance = x(index2) + bandwidth / 3 * (index - 1);
          // console.log('valueItem', valueItem, 'xDistance', xDistance, value.data.length * index + index2, 'bandwidth', bandwidth);
          return (<SVGText
            key={value.data.length * index + index2}
            x={xDistance + (bandwidth / 2)}
            y={valueItem < CUT_OFF ? y(valueItem) - 10 : y(valueItem) + 15}
            fontSize={14}
            fill={valueItem >= CUT_OFF ? 'white' : 'black'}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
          >
            {valueItem}
          </SVGText>)

        });
      });

      const flatArray = [...arrayOfArrays[0], ...arrayOfArrays[1], ...arrayOfArrays[2]];
      return (flatArray);
    };

  }

  const barData = [
    {
      data: dataState.userData,
      svg: {
        fill: 'rgb(32, 165, 40)',
      },
    },
    {
      data: dataState.friendsData,
      svg: {
        fill: 'rgb(134, 65, 244)',
      },
    },
    {
      data: dataState.globalData,
      svg: {
        fill: 'rgb(134, 165, 244)',
      },
    }

  ];

  const colorsLegend = ['rgb(32, 165, 40)', 'rgb(134, 65, 244)', 'rgb(134, 165, 244)'];

  function onWillFocus() {
    loadPlaysStatistics();
  }

  return (
    <View style={{ height: "100%" }}>
      <NavigationEvents onWillFocus={onWillFocus} />
      <ScrollView >
        <GameInfo
          game={individualGame}
          playTimes={state.playsDataUser ? state.playsDataUser.play_counts : "Haven't played"}
        />
        {!!dataState && 
        <View>
          <View style={styles.titleChart}>
            <Text style={{ fontSize: 15 }}>Statistics of Plays </Text>
          </View>

          <View style={styles.boxShadow}>
            <BarChart
              horizontal={false}
              spacingInner={0.1}
              style={{ flex: 1 }}
              data={barData}
              gridMin={0}
              svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              contentInset={{ top: 10, bottom: 10 }}
            >
              <Labels />
            </BarChart>
          </View>
          <View style={styles.xLabels}>
            <Text>Max Score</Text>
            <Text>Average Score</Text>
            <Text>Minimun Score</Text>
          </View>
          <View style={styles.legend}>
            <View style={{ borderBottomWidth: 1, color: '#ddd' }}>
              <Text>Legend</Text>
            </View>
            {
              ['User', 'Friends', 'Global'].map((player, index) => (
                <View key={index} style={{ borderBottomWidth: 1, color: '#ddd', flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'space-between' }}>
                  <Text >{player}</Text>
                  <View style={{ backgroundColor: `${colorsLegend[index]}`, width: 20, height: 20 }}></View>
                </View>
              ))
            }
          </View>
        </View>}
      </ScrollView>

    </View>
  );
}

const opacity = 0.8;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

const styles = StyleSheet.create({
  boxShadow: {
    flexDirection: 'row',
    height: 200,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'white'
  },

  legend: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    width: 150,
    paddingHorizontal: 5,
    paddingVertical: 5
  },

  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },

  titleChart: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  }

});