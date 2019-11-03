import React from 'react';
import { Overlay, Button, Icon, ListItem } from 'react-native-elements';
import EmptyList from '../components/EmptyList';
import useVisibility from '../hooks/useVisibility';
import RecordGameModal from '../components/RecordGameModal';
import useList from '../hooks/useList';

export default function RecordGame({ userGames }) {
  const { visible, showModal, closeModal } = useVisibility(false);
  userGames = userGames.map(game => {
    return { ...game, 'selected': false }
  })
  const { list: gameSelectList, onSelectRecordGame: onSelect } = useList(userGames);

  const filterSelectedGames = () => {
    return gameSelectList.filter((game) => game.selected)
  };

  const selectRecordGame = filterSelectedGames();

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
            />
          ))
      }
    </>
  )
}