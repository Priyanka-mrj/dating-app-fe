import {StyleSheet, View} from 'react-native';
import React from 'react';
import { COLORS } from '../common/Colors';

const LineSeparator = () => {
  return <View style={styles.line} />;
};

export default LineSeparator;

const styles = StyleSheet.create({
  line: {
    backgroundColor: COLORS.GRAY_B5,
    height: 1,
  },
});
