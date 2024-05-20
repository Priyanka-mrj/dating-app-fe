import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../common/Colors';
import { SCREEN_WIDTH } from '../common/Constants';

const DDropDown = props => {
  const {
    onChange,
    labelField,
    valueField,
    placeholder,
    value,
    data,
    isFocus = false,
    onFocus = ()=> {},
    onBlur = () => {},
    additionalDrowdownStyle = {},
    additionalselectedTextStyle = {},
    iconColor = COLORS.GRAY_5C,
    maxHeight = 400,
    dropdownPosition='auto',
    listContainerStyle = {},
    itemContainerStyle = {},
  } = props;

  const _onChnage = (item) => {
    onChange(item)
  }

  return (
    <View style={styles.container}>
      <Dropdown
        //activeColor
        containerStyle={listContainerStyle}
        style={[styles.dropdown, additionalDrowdownStyle, isFocus && {borderColor: COLORS.BLACK}]}
        activeColor={COLORS.APP_THEME}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, additionalselectedTextStyle]}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={_onChnage}
        itemTextStyle={[styles.itemTextStyle, ]}
        iconColor={iconColor}
        dropdownPosition={dropdownPosition}
        itemContainerStyle={itemContainerStyle}
       // style = {{color: 'white'}} //for changed text color
        baseColor="rgba(255, 255, 255, 1)" //for initial text color
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
   // flex: 1,
   // paddingHorizontal: 20,
   
  },
  dropdown: {
    height: 45,
    borderColor: COLORS.YELLOW_FF,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.BLACK
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  itemTextStyle:{
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default DDropDown;
