import { useEffect, useReducer } from "react";
import { api } from '../api';
import reducer, { SET_FRIENDS, ADD_FRIEND } from "../reducers/friends";

export default function useFriendsData() {
  const [state, dispatchState] = useReducer(reducer, []);

  async function loadFriends() {
    const friends = await api.get("/users/friends"); // an array
    dispatchState({ type: SET_FRIENDS, value: friends.data });
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return {
    state,
    dispatchState,
    SET_FRIENDS,
    ADD_FRIEND
  }
}