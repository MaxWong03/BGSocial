import React, { useState } from 'react';

export default function useFriendSlot () {
  const [friendSlots, setFriendSlots] = useState([]);

  const changeFriendSlot = (EventFriendListID) => {
    setFriendSlots(EventFriendListID);
  } 

  return {
    friendSlots,
    changeFriendSlot
  }
}