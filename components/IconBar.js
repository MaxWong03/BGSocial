
import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconVerticalWithLabel from './IconVerticalWithLabel'
import IconHorizontalWithLabel from './IconHorizontalWithLabel'


export default function IconBar({ iconsData, horizontal, padding }) {
  const flexDirection = horizontal ? 'row' : 'column';

  return (
    <View style={{...styles.iconBar, flexDirection}}>
      {iconsData.map(({ iconName, iconType, iconColor, textInfo, onPress }, index) => {
        if (horizontal) {
          return (
            <IconVerticalWithLabel
              key={index}
              iconName={iconName}
              padding={padding}
              iconType={iconType}
              iconColor={iconColor}
              textInfo={textInfo}
              onPress={onPress}
            />
          );
        }
        return (
          <IconHorizontalWithLabel
            key={index}
            iconName={iconName}
            padding={padding}
            iconType={iconType}
            iconColor={iconColor}
            textInfo={textInfo}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  iconBar: {
    justifyContent: 'space-around'
  },
});