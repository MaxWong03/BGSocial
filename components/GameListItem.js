import React from 'react';
import { ListItem, CheckBox } from 'react-native-elements';

export default function GameListItem({ game, onSelect }) {
  return (
    <ListItem
      leftAvatar={{ source: { uri: game['thumbnail'] } }}
      title={game['name']}
      subtitle={`Rating: ${Math.round(game['average_bgg_rating'] * 100) / 100}`}
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