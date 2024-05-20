import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Styles from '../common/CommonStyles';

const Button = ({ onPress, text, style, textStyle }) => {
    return (
        <TouchableOpacity style={[Styles.loginButton, style]} onPress={onPress}>
            <Text style={[Styles.buttonText, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
