import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import BackSvg from '../assets/back.svg';
import YellowAndPinkSvg from '../assets/yellowAndPink.svg';
import NextButtonSvg from '../assets/nextButton.svg';
import {COLORS} from '../common/Colors';

const ScreenContainer = props => {
  const {
    totalCount = 1, 
    selectedCount = 0, 
    isShowStepperCount = false, 
    onPressNext = () => {},
    onPressBack = () => {}
} = props;

  const redBarFlex = parseFloat(Math.abs((selectedCount / totalCount).toFixed(2)));
  const yellowBarFlex = parseFloat((1 - redBarFlex).toFixed(2));
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <YellowAndPinkSvg />
        <TouchableOpacity style={{zIndex: 99, top: -65, left: 20}} onPress={onPressBack}>
          <BackSvg />
        </TouchableOpacity>
        {props.children}
      </View>
      {isShowStepperCount ? (
        <View style={{marginHorizontal: 40, marginBottom: 20}}>
          <View style={styles.countAndNextContainer}>
            <Text style={styles.textCount}>
                <Text style={{color: COLORS.APP_THEME}}>{selectedCount}</Text>
                {`/${totalCount}`}
            </Text>
            <TouchableOpacity onPress={onPressNext}>
                <NextButtonSvg />
            </TouchableOpacity>
         </View>
          <View style={styles.barContainer}>
            <View style={[styles.redBar,{ flex: redBarFlex }]}/>
            <View style={[styles.yellowBar,{ flex: yellowBarFlex }]}/>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE
  },
  redBar: {
    height: 4,
    backgroundColor: COLORS.APP_THEME,
    borderRadius: 4,
    zIndex: 99,
  },
  yellowBar: {
    height: 4,
    backgroundColor: COLORS.YELLOW_FF,
    borderRadius: 4,
    marginLeft: -5
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textCount: {
    fontWeight: 'bold', 
    fontSize: 20, color:
     COLORS.YELLOW_FF
  },
  countAndNextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center'
  }
});

export default ScreenContainer;
