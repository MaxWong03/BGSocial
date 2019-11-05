import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay, Button, Icon, ListItem } from 'react-native-elements';
import EmptyList from '../components/EmptyList';
import useVisibility from '../hooks/useVisibility';
import RecordGameModal from '../components/RecordGameModal';
import useList from '../hooks/useList';

export default function RecordGame({ userGames, setGameRecord, presetGame }) {
  const { visible, showModal, closeModal } = useVisibility(false);

  console.log(presetGame);

  userGames = userGames.map(game => {
    return { ...game, 'selected': false }
  })

  if (presetGame) {
    userGames = userGames.map(game => {
      if (game.id === presetGame)
        return { ...game, 'selected': true };
      else return game;
    })
  }

  console.log(userGames);

  const { list: gameSelectList, onSelectRecordGame: onSelect } = useList(userGames);

  const filterSelectedGames = () => {
    return gameSelectList.filter((game) => game.selected)
  };

  const selectRecordGame = filterSelectedGames();

  const deleteEventGame = (gameID) => {
    const gameList = onSelect(gameID)
      .filter(game => game['selected'])
      .map(game => game['id']);

    setGameRecord(gameList)
  }

  return (
    <>
      <Button
        onPress={showModal}
        title={'Create Game Record'}
        icon={
          <Icon
            name='videogame-asset'
            type='material-icons'
            color='white'
          />
        }
      />
      <Overlay
        isVisible={visible}
        children={
          <RecordGameModal
            closeModal={closeModal}
            gameSelectList={gameSelectList}
            onSelect={onSelect}
            setGameRecord={setGameRecord}
          />
        }
      />
      {
        selectRecordGame.length === 0 ?
          <EmptyList title={'Click to Create Record for A Game'} />
          :
          selectRecordGame.map((game, index) => (
            <ListItem
              key={index}
              leftAvatar={{ source: { uri: game.thumbnail } }}
              title={game.name}
              bottomDivider
              rightElement={
                <Button
                  icon={
                    <Icon
                      name='delete-forever'
                      type='material'
                      color='white'
                    />
                  }
                  buttonStyle={styles.deleteButton}
                  onPress={() => deleteEventGame(game['id'])}
                />
              }
            />
          ))
      }
    </>
  )
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginRight: 5
  }
});