import * as React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Back from '../assets/back.svg';
import STYLES from '../common/CommonStyles';
import { COLORS } from '../common/Colors';

export const Header = props => {
    const {screenName, onClickBack, isBackHide = false, additionalStyle, additionalHeaderTextStyle} = props;
    return (
        <View style={isBackHide ? [styles.container, additionalStyle] : [styles.container1, additionalStyle]}>
            {!isBackHide && (
                <TouchableOpacity
                    onPress={onClickBack}
                    style={styles.backIconContainer}>
                    <Back />
                </TouchableOpacity>
            )}
            { !!screenName && (
                <View style={styles.screenNameView}>
                    <Text style={isBackHide ? [styles.screenNameText, additionalHeaderTextStyle] : styles.screenNameTextGreen}>
                        {screenName}
                    </Text>
                </View>
            )}
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center'
    },
    container1: {
        ...STYLES.shadow,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE,
        alignItems: 'center'
    },
    backIconContainer: {
        paddingRight: 3,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    screenNameView: {
        flex: 1,
        justifyContent: 'center',
    },
    screenNameText: {
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 'bold',
        letterSpacing: 0.3,
        textAlign: 'center',
        color: COLORS.BLACK,
    },
    screenNameTextGreen: {
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 'bold',
        letterSpacing: 0.3,
        textAlign: 'left',
        color: COLORS.BLACK,
        marginLeft: 10
    },
});

