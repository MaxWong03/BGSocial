import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import useFriendsData from '../hooks/useFriendsData';
import useGamesData from '../hooks/useGamesData';

export default function PlayScreen() {
  const { navigate } = useNavigation();
  const { state: userFriends } = useFriendsData();
  const { state: userGames } = useGamesData();
  return (

    <View style={styles.iconBox}>
      <Icon
        size={20}
        name='playlist-add'
        type='material'
        color='blue'
        onPress={() => navigate('CreatePlay', {
          userFriends,
          userGames
        })}

        iconStyle={styles.icon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    color: 'white'
  },
  iconBox: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0e92cf',
    borderRadius: 1000,
    // opacity: 0.8,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignContent: 'center'

  }
});
