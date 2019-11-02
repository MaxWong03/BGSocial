import React from 'react';
import { Icon } from 'react-native-elements';
import { getUserInfo } from '../hooks/sessionContext';

export default function PlayScreen() {
  return (
    
    <Icon
      size={50}
      name='qq'
      type='font-awesome'
      color='blue'
      onPress={() => navigation.navigate('CreatePlay')}
    />
  )
}
