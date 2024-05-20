import React from 'react';
import { TextInput, View } from 'react-native';
import Styles from '../common/CommonStyles';

const TextInputBox = ({ inputValue, viewStyle, textStyle, onChangeValue }) => {
    return (
        <View
            style={[Styles.textview, viewStyle]}
        >
            <TextInput
                style={[Styles.textinputbox, textStyle]}
                value={inputValue}
                placeholder="Enter"
                maxLength={10}
                onChangeText={onChangeValue}
            />
        </View>
    );
};

export default TextInputBox;