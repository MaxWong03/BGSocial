import React from 'react';
import { ListItem, CheckBox } from 'react-native-elements';

export default function GameListItem({ game, onSelect }) {
  return (
    <ListItem
      leftAvatar={{ source: { uri: game['thumbnail'] } }}
      title={game['name']}
      subtitle={`Rating: ${game['average_bgg_rating']}`}
      bottomDivider
      rightElement={
        <CheckBox 
          checked={game['selected']}
          onPress={() => onSelect(game['id'])}
        />
      }
    />
  );
}