import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../common/Colors';
import DButton from './DButton';

export const NoDataFound = ({ onPressRetry = () => {}, hideRetry = false}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{'No data found !!!'}</Text>
        {hideRetry ? null : <DButton label={'Retry'} onPress={onPressRetry} />}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: COLORS.BLACK,
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 40
    }
})

export default NoDataFound
