import React from 'react';
import {CheckBox} from 'react-native-elements';
import {COLORS} from '../common/Colors';

const DCheckBox = props => {
  const {isChecked, onPressCheckBox} = props;

  return (
    <CheckBox
      checked={isChecked}
      onPress={onPressCheckBox}
      iconType="material-community"
      checkedIcon={'checkbox-marked'}
      uncheckedIcon="checkbox-blank-outline"
      checkedColor={COLORS.YELLOW_FF}
      uncheckedColor={COLORS.YELLOW_FF}
      containerStyle={{padding: 0, margin: 0, marginRight: 0}}
    />
  );
};

export default DCheckBox;
