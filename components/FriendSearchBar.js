import React, { useState } from 'react';
import { Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';



export default function FriendSearchBar(props) {
  return (
    <SearchBar
      placeholder={"Search For Friends..."}
      onChangeText={props.updateSearch}
      value={props.search}
    />
  );
}