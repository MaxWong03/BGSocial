import React from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { formatDateWithTime } from './../utils';
import IconVerticalWithLabel from '../components/IconVerticalWithLabel'
import IconBar from '../components/IconBar';
import { api } from './../api';
import { Overlay, Button, Text } from 'react-native-elements';
import { useNavigationParam } from 'react-navigation-hooks';

export default function SinglePlayScreen({ navigation }) {
  const play = navigation.getParam('play');
  const games = navigation.getParam('games');
  const users = navigation.getParam('users');
  const imageUrl = navigation.getParam('imageUrl');
  const iconBarItems = [
    {
      iconName: 'edit', textInfo: 'Edit Play',
      onPress: () => console.lgog('Edit')
    },
    {
      iconName: 'trash-o',
      textInfo: 'Delete',
      onPress: deleteModal
    }
  ]


  function deleteModal() {
    Alert.alert(
      'Delete Play',
      'Are you sure you want to delete this play?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deletePlay(play.id) },
      ],
      { cancelable: false },
    );
  }

  async function deletePlay(playId) {
    await api.post(`/plays/${playId}/delete`);
    navigation.navigate('Plays');
  }

  function getWinners(playsUsers) {
    const winnerInfo = [];
    const winners = playsUsers.filter(player => player.is_winner === true);

    winners.forEach((winner, index) => {
      winnerInfo.push({ name: users[winner.id].name, score: winner.score })
    });

    return winnerInfo;
  }


  function renderPlayInfo() {
    const chosenDateViewData = [
      {
        iconName: 'calendar-o',
        iconColor: '#bdbdbd',
        textInfo: formatDateWithTime(play.date),
      },
      {
        iconName: 'star-o',
        iconColor: '#bdbdbd',
        textInfo: `Winners: ${getWinners(play.playsUsers).map(winner => winner.name).join(', ')}`,
      }
    ];
    return (
      <IconBar iconsData={chosenDateViewData} horizontal={false} padding={10} />
    )
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.flexParent}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
        />
      </View>
      <View style={styles.iconBar}>
        <IconBar
          iconsData={iconBarItems}
          horizontal={true}
        />
      </View>
      <View style={styles.textContainer}>
        {renderPlayInfo()}
      </View>
    </ScrollView>
  );
}

SinglePlayScreen.navigationOptions = {
  title: 'Play Details',
};



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 30,
    overflow: 'hidden',
    marginVertical: 10
  },
  iconBar: {
    marginVertical: 6,
    borderTopColor: '#DDD',
    borderBottomColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 6
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-around'
  },
  flexParent: {
    flexDirection: "row",
    backgroundColor: '#EEE'
  }
});
