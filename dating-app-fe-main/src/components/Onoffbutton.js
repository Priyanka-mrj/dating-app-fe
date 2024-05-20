import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { COLORS } from '../common/Colors';

const SwitchIcon = ({isSwitchOn, toggleSwitch}) => {
    return (
        <View style={{marginLeft: 15}}>
            <Switch
                trackColor={{ false: COLORS.GRAY_67, true: COLORS.APP_THEME }}
                thumbColor={'#FFFFFF'}
                onValueChange={toggleSwitch}
                value={isSwitchOn}
                style={styles.switch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Reset the scale
        width: 50,
        height: 30,
    },
});

export default SwitchIcon;

