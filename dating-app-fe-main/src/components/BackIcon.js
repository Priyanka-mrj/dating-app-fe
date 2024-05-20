import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import BackSvg from '../assets/back.svg'

const BackIcon = ({ onPress, containerStyle = {}}) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <BackSvg />
        </TouchableOpacity>
    );
};
export default BackIcon;
