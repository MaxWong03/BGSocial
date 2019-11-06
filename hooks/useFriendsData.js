import { useEffect, useReducer } from "react";
import { api } from '../api';
import reducer, { SET_FRIENDS, ADD_FRIEND, REMOVE_FRIEND } from "../reducers/friends";

export default function useFriendsData() {
  const [state, dispatchFriends] = useReducer(reducer, []);

  async function loadAllFriends() {
    const friends = await api.get("/users/friends"); // an array
    dispatchFriends({ type: SET_FRIENDS, value: friends.data });
  };

  useEffect(() => {
    loadAllFriends();
  }, []);

  return {
    state,
    dispatchFriends,
    SET_FRIENDS,
    ADD_FRIEND,
    REMOVE_FRIEND,
    loadAllFriends
  }
}