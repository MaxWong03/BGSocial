import { useState } from 'react';

export default function useList (initial) {
  const [list, setList] = useState(initial);

  const onSelectFriend = (friend_id) => {
    console.log(friend_id)
    const updatedList = list.map((friend) => {
      if (friend['friend_id'] === friend_id) {
        return { ...friend, invited: !friend['invited'] };
      } else {
        return friend;
      }
    });
    setList(updatedList);
  }

  const onSelectGame = (gameID) => {
    console.log(gameID)
    const updateList = list.map((game) => {
      if (game['id'] === gameID) {
        return { ...game, selected: !game['selected'] }
      } else {
        return game;
      }
    });
    setList(updateList);
  }

  return {
    list,
    onSelectFriend,
    onSelectGame
  }
}