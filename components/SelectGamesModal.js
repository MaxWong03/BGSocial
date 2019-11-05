import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, RefreshControl } from 'react-native'
import { Button, Header, Icon } from 'react-native-elements';
import GameSearchBar from './GameSearchBar';
import GameListItem from './GameListItem';
import useList from '../hooks/useList';

export default function SelectGameModal({ goBack, gameSelectList, onSelect, chooseGameAction }) {
  const [search, setSearch] = useState('');

  //Changes the search bar value
  const updateSearch = (userInput) => setSearch(userInput);

  // refreshing attempt
  const fetchData = async() => {
    const { state: userGames, loadGames } = useGamesData();
    const { list: gameSelectList, onSelectGame: onSelect } = useList(userGames);
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(()=>{
        setRefreshing(false)
    })
  }, [refreshing]);



  return (
    <>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          color="black"
          type='font-awesome'
          onPress={goBack}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Select Games</Text>
      </View>
      <GameSearchBar
        updateSearch={updateSearch}
        search={search}
      />
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }
        style={styles.gameListContainer}
      >
        {
          gameSelectList.map((game, index) => (
            game['name'].includes(search) &&
            <GameListItem
              key={index}
              game={game}
              onSelect={onSelect}
            />
          ))
        }
      </ScrollView>
      <Button
        onPress={chooseGameAction}
        title={"Select"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: '30%',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    width: '70%'
  },
  gameListContainer: {
    height: '75%'
  }
})
