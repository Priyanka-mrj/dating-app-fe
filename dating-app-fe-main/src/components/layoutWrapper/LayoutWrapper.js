
import React from 'react';
import { SafeAreaView, StatusBar, Modal, View } from 'react-native';
import styles from './LayoutWrapperStyles';
import { Loader } from '../Loader';
import {COLORS} from "../../common/Colors";
import { Header } from '../Header';
import LottieView from 'lottie-react-native';
import { goBack } from '../../navigation/NavigationService';

export const LayoutWrapper = props => {
    const {
        children,
        loading = false,
        headerScreenName,
        isHeader,
        isBackHide,
        onPressBack,
    } = props;

    const _onPressBack = () => {
      onPressBack ? onPressBack() : goBack();
    }

    return (
      <SafeAreaView style={styles.rootView}>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle={'dark-content'} />
        {isHeader && (
          <Header
            screenName={headerScreenName}
            onClickBack={_onPressBack}
            isBackHide={isBackHide}
          />
        )}
        {children}
        {loading && (
         <Loader />
        )}
      </SafeAreaView>
    );
};
