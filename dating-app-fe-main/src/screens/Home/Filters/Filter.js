import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import CrossSvg from '../../../assets/cross.svg';
import Modal from 'react-native-modal';
import {COLORS} from '../../../common/Colors';
import DDropDown from '../../../components/DDropDown';
import DButton from '../../../components/DButton';
import DSlider from '../../../components/DSlider';
import { FILTER_PROPERTIES, INTRESTED_IN_MAP } from '../../../common/Constants';


const Filter = props => {
  const {isVisible, hideFilterModal, loggedInUserProfile, onChangeFilterProperties, onPressApplyFilter, filteProperties} = props;
  const [selectedInterstedIn, setInterstedIn] = useState(filteProperties?.intrestedIn);
  const [selectedLanguage, setLanguage] = useState(filteProperties?.language);
  const [age, setAge] = useState(filteProperties?.age);
  const [distance, setDistanceValue] = useState(null);

  const onChangeSelectedIntrestedIn = useCallback(
    intrestedIn => {
      setInterstedIn(intrestedIn);
      onChangeFilterProperties(intrestedIn, FILTER_PROPERTIES.interestedIn.key)
    },
    [selectedInterstedIn, setInterstedIn],
  );

  const onChangeLanguage = useCallback(
    language => {
      setLanguage(language);
      onChangeFilterProperties(language.name, FILTER_PROPERTIES.language.key)
    },
    [selectedLanguage, setLanguage],
  );

  const onSlidingCompleteAge = (value) => {
    onChangeFilterProperties(parseInt(value), FILTER_PROPERTIES.age.key)
  }

  const onValueChangeAge = (value) => {
    setAge(parseInt(value));
  }

  const onSlidingCompleteDistance = (value) => {
    onChangeFilterProperties(parseInt(value), FILTER_PROPERTIES.distance.key)
  }

  const onValueChangeDistance = (value) => {
    setDistanceValue(parseInt(value))
    
  }

  return (
    <Modal
      isVisible={isVisible}
      style={{margin: 0}}
      useNativeDriver={true}
      animationInTiming={400}
      animationOutTiming={400}>
      <View style={styles.container}>
        <ScrollView style={{paddingHorizontal: 20, marginTop: 20}} showsHorizontalScrollIndicator={false}>
          <View style={styles.flexRow}>
            <TouchableOpacity onPress={hideFilterModal}>
              <CrossSvg />
            </TouchableOpacity>
            <Text style={styles.filterText}>{'Filter'}</Text>
          </View>

          <Text style={styles.rowHeadingLabel}>{'Intrested In'}</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 15,
            }}>
            <DButton
              isTransparent={!(INTRESTED_IN_MAP.MEN.type === selectedInterstedIn)}
              label={INTRESTED_IN_MAP.MEN.label}
              onPress={() => onChangeSelectedIntrestedIn(INTRESTED_IN_MAP.MEN.type)}
            />
            <View style={{paddingRight: 40}} />
            <DButton
              isTransparent={!(INTRESTED_IN_MAP.WOMEN.type === selectedInterstedIn)}
              label={INTRESTED_IN_MAP.WOMEN.label}
              onPress={() => onChangeSelectedIntrestedIn(INTRESTED_IN_MAP.WOMEN.type)}
            />
          </View>

          <Text style={[styles.rowHeadingLabel, {paddingBottom: 15}]}>
            {'Location'}
          </Text>
          <DDropDown
            onChange={() => {}}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Location'}
            value={''}
            data={[]}
          />

          <DSlider
            sliderLabel={'Age Preference'}
            selectedHintLabel={'18-40+'}
            sliderValue={age}
            minimumValue={18}
            maximumValue={80}
            onSlidingComplete={onSlidingCompleteAge}
            onValueChange={onValueChangeAge}
          />

          <DSlider
            sliderLabel={'Distance'}
            selectedHintLabel={'100+ Km'}
            sliderValue={distance}
            minimumValue={1}
            maximumValue={200}
            onSlidingComplete={onSlidingCompleteDistance}
            onValueChange={onValueChangeDistance}
          />

          <Text style={[styles.rowHeadingLabel, {paddingBottom: 15}]}>
            {'Languages'}
          </Text>
          <DDropDown
            onChange={onChangeLanguage}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Language'}
            value={selectedLanguage?.id}
            data={loggedInUserProfile?.language}
          />

          {/* <Text style={[styles.rowHeadingLabel, {paddingBottom: 15}]}>
            {'Advance Filters'}
          </Text>
          <DDropDown
            onChange={() => {}}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Set Advance Filter'}
            value={''}
            data={[]}
          /> */}
        </ScrollView>
        <View style={{padding: 20}}>
          <DButton
            onPress={onPressApplyFilter}
            label={'Apply'}
            isTransparent={false}
            additionalTextStyle={{fontSize: 16}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: COLORS.BLACK,
    paddingLeft: 30,
  },
  rowHeadingLabel: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.BLACK,
    marginTop: 20,
  },
  normalLabelBlack: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  normalLabelWhite: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.WHITE,
  },
});

export default Filter;
