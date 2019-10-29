import React from 'react';
import { SearchBar } from 'react-native-elements';

export default function GameSearchBar({updateSearch, search}) {
  return (
    <SearchBar 
      platform={"ios"}
      placeholder={"Search For Games..."}
      onChangeText={updateSearch}
      value={search}
    />
  );
}