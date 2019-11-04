import React from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon({name, focused, type}) {
  if (type === 'FontAwesome5') {
    return (
      <FontAwesome5
        name={name}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  }
  
  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
