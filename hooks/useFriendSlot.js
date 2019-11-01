import React, { useState } from 'react';

export default function useFriendSlot(presetFriends) {
  const [friendSlots, setFriendSlots] = useState(presetFriends || []);

  const changeFriendSlot = (EventFriendListID) => {
    setFriendSlots(EventFriendListID);
  }

  return {
    friendSlots,
    changeFriendSlot
  }
}