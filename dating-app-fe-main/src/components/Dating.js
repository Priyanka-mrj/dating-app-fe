import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import {COLORS} from '../common/Colors';
import { DATING_TIME, SCREEN_HEIGHT, SCREEN_WIDTH } from '../common/Constants';
import DDropDown from './DDropDown';

const Dating = props => {
  const {headingLabel, subHeading, image, onChangeTime, onChangeCoin, selectedTime, coin} = props;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headingText}>{headingLabel}</Text>
      <Text style={styles.subHeadingText}>{subHeading}</Text>
      <Image source={image} style={styles.image} />
      <View style={styles.rowView}>
        <Text style={styles.text}>{'Time'}</Text>
        <View style={{width: 160}}>
          <DDropDown
            onChange={onChangeTime}
            labelField={'value'}
            valueField={'id'}
            placeholder={'Select Time'}
            value={selectedTime.id}
            data={DATING_TIME}
            additionalDrowdownStyle={styles.dropDown}
            additionalselectedTextStyle={{
              color: COLORS.WHITE,
              textAlign: 'center',
            }}
            iconColor={COLORS.WHITE}
            dropdownPosition={'top'}
            listContainerStyle={{borderRadius: 5, bottom: 60}}
            itemContainerStyle={{borderRadius: 5}}
          />
        </View>
      </View>
      <View style={[styles.rowView, {marginBottom: 20}]}>
        <Text style={styles.text}>{'Coins'}</Text>
        <TextInput
          placeholderTextColor={COLORS.WHITE}
          style={styles.textInput}
          value={coin}
          placeholder="Enter"
          maxLength={50}
          keyboardType="number-pad"
          onChangeText={onChangeCoin}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
  subHeadingText: {
    color: COLORS.BLACK,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20
  },
  image: {
    width: (SCREEN_WIDTH - 40),
    height: 400,
    borderRadius: 5,
  },
  rowView: {
    borderWidth: 1, 
    borderColor: COLORS.GRAY_67, 
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  text: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 30
  },
  textInput: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: COLORS.APP_THEME,
    borderRadius: 10,
    width: 160,
    height:40
  },
  dropDown: {
    borderColor: COLORS.APP_THEME,
    backgroundColor: COLORS.APP_THEME, 
    height:40,
  }
});

export default Dating;
