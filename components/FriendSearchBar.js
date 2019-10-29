import React from 'react';
import { SearchBar } from 'react-native-elements';

export default function FriendSearchBar({updateSearch, search}) {
  return (
    <SearchBar
      platform={"ios"}
      placeholder={"Search For Friends..."}
      onChangeText={updateSearch}
      value={search}
    />
  );
}