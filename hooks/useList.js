import { useState } from 'react';

export default function useList(initial) {
  const [list, setList] = useState(initial);
  const onSelectFriend = (friend_id) => {
    console.log("onSelectFriend:", friend_id)
    const updatedList = list.map((friend) => {
      if (friend['id'] === friend_id) {
        return { ...friend, invited: !friend['invited'] };
      } else {
        return friend;
      }
    });
    setList(updatedList);
    return updatedList;
  }
  const onSelectGame = (gameID) => {
    // console.log("onSelectGame:", gameID)
    const updateList = list.map((game) => {
      if (game['id'] === gameID) {
        return { ...game, selected: !game['selected'] }
      } else {
        return game;
      }
    });
    setList(updateList);
    return updateList;
  }

  const onSelectRecord = (friend_id) => {
    console.log("onSelectRecord:", friend_id)
    const updatedList = list.map((friend) => {
      if (friend['id'] === friend_id) {
        return { ...friend, selected: !friend['selected'] };
      } else {
        return friend;
      }
    });
    setList(updatedList);
    return updatedList;
  }

  const selected = () => {
    let count = 0;
    list.forEach(game => {
      if (game.selected) count += 1;
    })
    return count;
  }

  const onSelectRecordGame = (gameID) => {
    let updatedList = [];
    if (!selected()) {
      updatedList = list.map((game) => {
        if (game.id === gameID) {
          return { ...game, selected: true }
        } else return game
      })
    } else {
      updatedList = list.map((game) => {
        if (game.id === gameID) {
          return { ...game, selected: false }
        } else return game
      })
    }
    setList(updatedList);
    return updatedList;
  }

  return {
    list,
    onSelectFriend,
    onSelectGame,
    onSelectRecord,
    onSelectRecordGame
  }
}