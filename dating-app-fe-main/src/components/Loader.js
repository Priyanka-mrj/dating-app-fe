import * as React from 'react';
import { View, StyleSheet, Modal} from 'react-native';
import { COLORS } from '../common/Colors';
import LottieView from 'lottie-react-native';

export const Loader = ({isLoading = true}) => {
  return (
    <Modal transparent visible={isLoading} onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={{height: 100, width: 100}}>
          <LottieView
            style={{flex: 1}}
            source={require('../assets/loaderLottie.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.BG_MODAL
    },
})

export default styles
