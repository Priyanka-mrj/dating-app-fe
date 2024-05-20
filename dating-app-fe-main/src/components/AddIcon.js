import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const AddIcon = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Image source={require('../assets/plus-icon.png')} style={[style, { width: 20, height: 20 }]} />
            </View>
        </TouchableOpacity>
    );
};
export default AddIcon;
