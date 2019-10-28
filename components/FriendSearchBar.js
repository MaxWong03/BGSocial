import React from 'react';
import { SearchBar } from 'react-native-elements';

export default function FriendSearchBar(props) {
  return (
    <SearchBar
      placeholder={"Search For Friends..."}
      onChangeText={props.updateSearch}
      value={props.search}
    />
  );
}