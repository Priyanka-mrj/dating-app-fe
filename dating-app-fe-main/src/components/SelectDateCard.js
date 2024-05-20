import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from '../common/Colors';
import DCheckBox from './DCheckBox';
import { getDatingLabelAndImage } from '../common/CommonUtils';

const SelectDateCard = props => {
  const {onPressCheckBox, isSelected, datingDetail} = props;

  const onClickCheckBox = () => {
    onPressCheckBox(datingDetail?.date_type);
  }

  const datingLabelAndImage = getDatingLabelAndImage(datingDetail?.date_type);
  return (
    <View style={styles.cardContainer} key={datingDetail.id}>
      <View style={styles.rectangle}>
        <Image source={datingLabelAndImage?.datingImage} style={styles.image} />
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.text}>{datingLabelAndImage?.datingLabel}</Text>
        <DCheckBox
          isChecked={isSelected}
          onPressCheckBox={onClickCheckBox}
        />
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.text1}>{`${datingDetail?.time}`}</Text>
        <Text style={styles.text1}>{`${datingDetail?.coins}rs`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 320,
    marginRight: 90,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContainer: {
    width: '48%',
    minHeight: 200,
    backgroundColor: COLORS.APP_THEME,
    borderRadius: 10,
    marginTop: 40
  },
  rectangle: {
    height: 128,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  text: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  text1: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  checkbox: {
    width: 12,
    height: 12,
    marginTop: -38,
    marginLeft: 120,
  },
  cardMargin: {
    marginRight: 20,
  },
  rowInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    alignItems: 'center'
  },
});

export default SelectDateCard;
