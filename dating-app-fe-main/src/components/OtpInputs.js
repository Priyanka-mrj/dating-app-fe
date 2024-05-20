import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { COLORS } from '../common/Colors';


const OtpInputs = ({ getOtp }) => {
    const [otp, setOtp] = useState(Array(4).fill(''));
    const otpTextInput = useRef([]);

    useEffect(() => {
        setTimeout(() => {
          otpTextInput.current[0].focus();
        }, 100)
    }, []);

    const focusPrevious = (key, index) => {
        if (key === 'Backspace' && index !== 0)
            otpTextInput.current[index - 1].focus();
    };

    const focusNext = (index, value) => {
        if (index < otpTextInput.current.length - 1 && value) {
            otpTextInput.current[index + 1].focus();
        }
        if (index === otpTextInput.current.length - 1) {
            otpTextInput.current[index].blur();
        }
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        getOtp(updatedOtp.join(''));
    };

    const renderInputs = () => {
      return (
        <View style={styles.otpContainer}>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <TextInput
                key={index}
                style={styles.otpDigit}
                keyboardType="numeric"
                onChangeText={value => focusNext(index, value)}
                onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
                ref={ref => (otpTextInput.current[index] = ref)}
              />
            ))}
        </View>
      );
    };

   return renderInputs();
};

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
      },
      otpDigit: {
        fontWeight: "500",
        fontSize: 10,
        color: COLORS.BLACK,
        borderWidth: 1,
        borderColor: COLORS.GRAY_DD,
        borderRadius: 4,
        textAlign: 'center',
        justifyContent: 'center',
        height: 20,
        width: 20,
        padding: 0,
        marginTop: 10,
      },
});

export default OtpInputs;
