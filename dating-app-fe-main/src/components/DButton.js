import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View
}
from 'react-native'
import { COLORS } from '../common/Colors';

const DButton = props => {
    const {label, onPress = () => {}, isTransparent, additionalStyle = {}, additionalTextStyle = {}, yellowButton = false, isEnable = true, buttonIcon = null} = props;
    const _onPress = () => {
      onPress(label)
    }
    return (
      <TouchableOpacity
        disabled={!isEnable}
        activeOpacity={0.7}
        style={[
            isTransparent 
            ? styles.intrestButtonUnselected
            : styles.intrestButtonSelected ,
            {backgroundColor: isTransparent ? COLORS.WHITE : yellowButton ? COLORS.YELLOW_FF : COLORS.APP_THEME},
            {opacity: isEnable ? 1 : 0.5},
            additionalStyle
        ]}
        onPress={_onPress}>
         {buttonIcon ? <View style={{paddingRight: 20}}>{buttonIcon}</View> : null}
        <Text style={[isTransparent || yellowButton ? styles.normalLabelBlack : styles.normalLabelWhite, additionalTextStyle ]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  export default DButton;

  const intrestButton = {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection: 'row'
}
const styles = StyleSheet.create({
  intrestButtonUnselected: {
    ...intrestButton,
    borderWidth: 1,
    borderColor: COLORS.YELLOW_FF,
    backgroundColor: COLORS.WHITE,
  },
  intrestButtonSelected: {
    ...intrestButton,
    backgroundColor: COLORS.APP_THEME,
  },
  normalLabelBlack: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  normalLabelWhite: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.WHITE,
  }
});