import React from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { formatDateWithTime, formatTime } from './../utils';
import IconBar from '../components/IconBar';
import { api } from './../api';
import { Text, ListItem } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

export default function SinglePlayScreen({ navigation }) {
  const play = navigation.getParam('play');
  const game = navigation.getParam('game');
  const users = navigation.getParam('users');
  const { navigate } = useNavigation();

  const iconBarItems = [
    {
      iconName: 'edit', textInfo: 'Edit Play',
      onPress: () => navigate('EditPlay')
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

    winners.forEach((winner) => {
      winnerInfo.push({ name: users[winner.user_id].name, score: winner.score })
    });

    return winnerInfo;
  }


  function renderPlayInfo() {
    const chosenDateViewData = [
      {
        iconName: 'calendar-o',
        textInfo: formatDateWithTime(play.date) || 'No Date',
      },
      {
        iconName: 'star-o',
        textInfo: `Winners: ${getWinners(play.playsUsers).map(winner => winner.name).join(', ') || 'None'}`,
      },
      {
        iconName: 'clock-o',
        textInfo: `Duration: ${formatTime(play.duration) || 'None'}`,
      }
    ];
    return (
      <IconBar iconsData={chosenDateViewData} horizontal={false} padding={2} />
    )
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <ListItem
        leftAvatar={{ size: 120, rounded: false, source: { uri: game.image } }}
        title={game.name}
        containerStyle={{ padding: 10 }}
        pad={10}
        titleStyle={{ paddingLeft: 8, paddingBottom: 10, fontSize: 18 }}
        subtitle={
          <View>
            {renderPlayInfo()}
          </View>
        }
      />
      <View style={styles.iconBar}>
        <IconBar
          iconsData={iconBarItems}
          horizontal={true}
        />
      </View>
      <ListItem
        title="Player's Score"
        bottomDivider
      />
      {
        play.playsUsers.map((player) => (
          <ListItem
            key={player.id}
            leftIcon={{ name: 'star-o', type: 'font-awesome', color: player.is_winner ? 'green' : 'gray' }}
            title={users[player.user_id].name}
            badge={{ value: `Score: ${player.score}`, badgeStyle: { padding: 2 }, textStyle: { color: 'white', fontSize: 12 } }}
            subtitle={
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <Text>{player.is_winner ? "Winner" : ""}</Text>
              </View>
            }
            bottomDivider
          />
        ))
      }
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