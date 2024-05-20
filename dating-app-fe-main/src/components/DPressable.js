import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import { COLORS } from '../common/Colors';

const DPressable = props => {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        props?.style,
        {
          backgroundColor: pressed ? COLORS.GRAY_E8 : props?.style.backgroundColor || COLORS.WHITE,
        },
      ]}>
      {props.children}
    </Pressable>
  );
};

export default DPressable;
