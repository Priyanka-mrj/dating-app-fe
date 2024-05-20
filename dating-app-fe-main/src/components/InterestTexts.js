import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../common/CommonStyles';

const InterestsText = ({ text, selectedItems, handleItemClick, style }) => {
    const isSelected = selectedItems.includes(text);

    return (
        <View
            style={[Styles.interests, style,
            {
                borderColor: isSelected ? '#FFD401' : '#676767',
                backgroundColor: isSelected ? '#FFD401' : 'transparent',
            }]}
        >
            <Text
                style={Styles.interestItem}
                onPress={() => handleItemClick(text)}
            >
                {text}
            </Text>
        </View>
    );
};

export default InterestsText;
