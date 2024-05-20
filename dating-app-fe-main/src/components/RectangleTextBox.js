import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Styles from '../common/CommonStyles';

const BoxOption = ({ label, onPress, isClicked, style, additionalTextStyle = {} }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={[
                    Styles.viewsButton, {
                        backgroundColor: isClicked ? "#FFD401" : "transparent",
                        borderColor: isClicked ? "#FFD401" : "#676767",

                    }, style]}
            >
                <Text style={[Styles.textCenter, additionalTextStyle]}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BoxOption;
