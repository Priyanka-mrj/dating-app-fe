import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Styles from '../common/CommonStyles';
import { COLORS } from '../common/Colors';
import { getIntrestIcon } from '../common/CommonUtils';

const InterestsIcon = ({ interests }) => {
    return (
        <View style={styles.row}>
            {
            interests?.map((row, rowIndex) => {
                return (
                    <View key={row.id} style={styles.interestItem}>
                        {/* {getIntrestIcon(row.name)} */}
                        <Text style={styles.text}>{row.name}</Text>
                    </View>
                )
            })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1, 
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 8,
    },
    interestItem: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: COLORS.APP_THEME,
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: '30%',
        padding: 5,
    },
    text: {
        color: COLORS.BLACK,
        fontWeight: '400',
        fontSize: 14,
        textAlign:'center'
      }
});

export default InterestsIcon;
