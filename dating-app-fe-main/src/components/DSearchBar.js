import React from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { COLORS } from '../common/Colors';

const DSearchBar = (props) => {
    const {
        onChangeText = () => {},
        value,
        placeholder = "Search",
        additionalInputContainerStyle = {}
    } = props;
  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      containerStyle={styles.container}
      inputContainerStyle={[styles.inputContainerStyle, additionalInputContainerStyle]}
      inputStyle={styles.inputStyle}
    />
  );
};

export default DSearchBar;

const styles = StyleSheet.create({
    inputContainerStyle: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 1.5,
        borderRadius: 8,
        borderBottomWidth: 1.5,
        borderColor: COLORS.YELLOW_FF,
        marginHorizontal: 10,
        marginBottom: 20,
        borderBottomColor: COLORS.YELLOW_FF,
    },
    container: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 0, //no effect
        shadowColor: COLORS.WHITE, //no effect
        borderBottomColor: COLORS.TRANSPARENT,
        borderTopColor: COLORS.TRANSPARENT,

      },
      inputStyle: {
        color: COLORS.BLACK,
        fontSize: 16
      }
})
