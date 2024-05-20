import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {COLORS} from '../common/Colors';

const DSlider = props => {
  const {
    onSlidingStart = () => {},
    onSlidingComplete = () => {},
    onValueChange = () => {},
    sliderLabel,
    sliderValue,
    selectedHintLabel,
    minimumValue = 1,
    maximumValue = 100
  } = props;

  return (
    <>
      <View style={styles.sliderLabelContainer}>
        <Text style={styles.rowHeadingLabel}>{sliderLabel}: <Text style={styles.selectedHintText}>{sliderValue}</Text></Text>
        <View style={styles.selectedHintLabelContainer}>
          <Text style={styles.selectedHintText}>{selectedHintLabel}</Text>
        </View>
      </View>
      <View style={styles.slderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          minimumTrackTintColor={COLORS.APP_THEME}
          maximumTrackTintColor={COLORS.YELLOW_FF}
          value={sliderValue}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          onValueChange={onValueChange}
          thumbTintColor={COLORS.APP_THEME}
        />
      </View>
    </>
  );
};

export default DSlider;

const styles = StyleSheet.create({
  container: {},
  slderContainer: {
    marginLeft: -10,
    marginRight: -10,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  rowHeadingLabel: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  selectedHintLabelContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.APP_THEME,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  selectedHintText: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
