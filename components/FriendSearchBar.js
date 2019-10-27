import React, { useState } from 'react';
import { Text } from 'react-native';
import { SearchBar } from 'react-native-elements';



export default function FriendSearchBar() {
  const [search, setSearch] = useState('');
  const updateSearch = (userInput) => {
    setSearch(userInput);
  };
  return (
    <SearchBar
      placeholder={"Search For Friends..."}
      onChangeText={updateSearch}
      value={search}
    />
  );
}