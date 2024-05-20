import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { COLORS } from '../common/Colors';

const DTextInput = (props) => {
  const {
    onChangeText = () => {},
    value,
    placeholder = "",
    maxLength = 50,
    keyboardType = 'default'
  } = props;
  return (
    <View style={[styles.container, {borderWidth: value?.length ? 0 : 1}]}>
      <TextInput
        placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
        style={value?.length ? styles.filledTextInput : styles.textInput}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default DTextInput;

const styles = StyleSheet.create({
  container: {
    borderColor: '#676767',
    borderRadius: 10,
  },
  textInput: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  filledTextInput: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: COLORS.YELLOW_FF,
    borderRadius: 10,
  }
});
