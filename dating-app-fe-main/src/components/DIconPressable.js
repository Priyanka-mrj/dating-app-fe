import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import { COLORS } from '../common/Colors';

const DIconPressable = props => {
  const {onPress = () => {}} = props;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        props?.style,
        {
          backgroundColor: pressed ? COLORS.GRAY_E8 : props?.style?.backgroundColor || COLORS.WHITE,
        },
      ]}>
      {props.children}
    </Pressable>
  );
};

export default DIconPressable;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
  },
});
