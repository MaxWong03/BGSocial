import React from 'react';
import { Text } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

export default function EditPlayScreen() {
  const users = useNavigationParam('users');
  const play = useNavigationParam('play');
  const game = useNavigationParam('game');
  console.log('users:', users);
  console.log('play:', play);
  console.log('game:', game);
  return (
    <Text>Edit Play Screen</Text>
  )
}