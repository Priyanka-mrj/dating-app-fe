import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const BottomSheet = props => {
    const {isVisible, height = 300, width = 300} = props;
    return (
      <Modal
        isVisible={isVisible}
        deviceWidth={height}
        deviceHeight={width}
        style={{margin: 0, justifyContent:'center', alignItems:'center'}}
        backdropOpacity={1}
        animationInTiming={600}
        animationOutTiming={600}>
        <View style={styles.bottomSheet}>
          {props.children}
        </View>
      </Modal>
    );
  };

  export default BottomSheet;

  const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        //marginTop: 'auto',
        padding: 16,
       // flex:1
       justifyContent:'center', alignItems:'center'
      },
  })