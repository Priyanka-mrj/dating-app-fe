import React from 'react';
import {
View,
Text,
StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../common/Colors';
import { TOAST_TYPE } from '../common/Constants';
import { ToastProvider } from 'react-native-toast-notifications';
import STYLES from '../common/CommonStyles';

const DToastProvider = props => {
  return (
    <ToastProvider
      successIcon={
        <Icon name="check-circle" type="material" color={COLORS.WHITE} />
      }
      dangerIcon={<Icon name="error" type="material" color={COLORS.WHITE} />}
      renderToast={tostOptions => <CustomToast tostOptions={tostOptions} />}>
      {props.children}
    </ToastProvider>
  );
};

const CustomToast = ({tostOptions}) => {
    if(tostOptions?.type === TOAST_TYPE.SUCESS) {
        return <SucessToast tostOptions={tostOptions} />
    }
    else if(tostOptions?.type === TOAST_TYPE.DANGER) {
       return <DangerToast tostOptions={tostOptions} />
    }
    return (
        <View style={styles.toastContainer}>
            <Icon name="error" type="material" color="#E4A11B" />
            <Text style={styles.text}>{tostOptions.message}</Text>
        </View>
    )
}

const SucessToast = ({tostOptions}) => {
    return (
      <View style={styles.sucessToastContainer}>
        {tostOptions?.successIcon}
        <Text style={styles.text}>{tostOptions.message}</Text>
      </View>
    );
};

const DangerToast = ({tostOptions}) => {
    return (
      <View style={styles.dangerToastContainer}>
        {tostOptions?.dangerIcon}
        <Text style={styles.text}>{tostOptions.message}</Text>
      </View>
    );
};

const containerStyle = {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    maxWidth: '90%'
}

const styles = StyleSheet.create({
    toastContainer: {
        ...containerStyle,
        backgroundColor: COLORS.BLACK_33,
    },
    text: {
        color: COLORS.WHITE,
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5
    },
    sucessToastContainer: {
        ...containerStyle,
        backgroundColor: COLORS.SUCESS_COLOR,
        minWidth: '70%',
    },
    dangerToastContainer: {
        ...containerStyle,
        backgroundColor: COLORS.FAILED_COLOR,
        minWidth: '70%',
    }
})

export default DToastProvider;