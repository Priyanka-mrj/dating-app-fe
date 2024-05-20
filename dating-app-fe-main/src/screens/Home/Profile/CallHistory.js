import React, {useCallback, useEffect, useState, memo} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../../common/Colors';
import {goBack, navigate} from '../../../navigation/NavigationService';
import STYLES from '../../../common/CommonStyles';
import {Avatar} from 'react-native-elements';
import {PROFILE_DATA} from '../../../common/DummyData';
import CallSvg from '../../../assets/CallGreen.svg';
import MoreSvg from '../../../assets/More.svg';
import IncomingCallSvg from '../../../assets/incomingCall.svg';
import OutgoingCallSvg from '../../../assets/outgoingCall.svg';
import DeleteSvg from '../../../assets/Delete.svg';
import {Header} from '../../../components/Header';
import DIconPressable from '../../../components/DIconPressable';
import Modal from 'react-native-modal';

const CallHistory = props => {
  const dispatch = useDispatch();

  const {userData} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const [isLoading, setLoading] = useState(false);
  const [callHistoryList, setCallHistoryList] = useState(PROFILE_DATA);
  const [isShowClearHistory, setShowClearHistory] = useState(false);

  const onPressRowItem = userDetail => {
    //navigate(SCREENS_NAME.PERSONALCHAT, {userDetail});
    console.log('userDetail ============> ', userDetail);
  };

  const onPressCall = () => {
    //navigate(SCREENS_NAME.CALL_SCREEN, {userDetail});
  };

  const hideClearHistory = useCallback(() => {
    setShowClearHistory(false);
  }, [setShowClearHistory]);

  const showClearHistory = useCallback(() => {
    setShowClearHistory(true);
  }, [setShowClearHistory]);

  const onPressMore = useCallback(() => {
    showClearHistory();
  }, [showClearHistory]);

  const onPressClearHistory = useCallback(() => {
    hideClearHistory();
  }, [hideClearHistory]);

  const _renderItem = ({item}) => {
    return <RowCard userDetail={item} onPressCall={onPressCall} />;
  };

  const _keyExtractor = item => Math.random().toString();

  const _renderContent = () => {
    return (
      <>
        <Header screenName={'Call History'} onClickBack={goBack}>
          <DIconPressable onPress={onPressMore}>
            <MoreSvg />
          </DIconPressable>
        </Header>
        <ClearHistory
            isShowClearHistory={isShowClearHistory}
            onPressClearHistory={onPressClearHistory}
            hideClearHistory={hideClearHistory}
        />
        <FlatList
          data={callHistoryList}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </>
    );
  };
  return (
    <LayoutWrapper
      loading={isLoading}>
      <View style={styles.container}>{_renderContent()}</View>
    </LayoutWrapper>
  );
};

const RowCard = memo(({userDetail, onPressCall}) => {
  const isIncomingCall = userDetail?.id % 2 === 0;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowCenter}>
        <Avatar
          rounded
          source={{uri: userDetail?.profile_pic_1}}
          activeOpacity={0.8}
          size="medium"
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.name}>{userDetail?.name}</Text>
          <View style={styles.rowCenter}>
            {isIncomingCall ? <IncomingCallSvg /> : <OutgoingCallSvg />}
            <Text style={styles.subText}>{'17 May, 8:20 PM'}</Text>
          </View>
        </View>
      </View>
      <DIconPressable onPress={onPressCall}>
        <CallSvg />
      </DIconPressable>
    </View>
  );
})

const ClearHistory = memo(props => {
  const {onPressClearHistory, isShowClearHistory, hideClearHistory} = props;
  return (
    <Modal
      isVisible={isShowClearHistory}
      style={{margin: 0}}
      useNativeDriver={true}
      backdropColor={'transparent'}
      onBackdropPress={hideClearHistory}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      >
      <View style={styles.clearContainer}>
        <DIconPressable onPress={onPressClearHistory}>
          <DeleteSvg />
        </DIconPressable>
        <Text
          style={[
            styles.subText,
            {color: COLORS.BLACK, fontSize: 16, paddingLeft: 10},
          ]}>
          {'Clear Call History'}
        </Text>
      </View>
    </Modal>
  );
});

export default CallHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    //position: 'relative'
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  msgLabel: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: COLORS.BLACK,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subText: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
    color: COLORS.GRAY_67,
  },
  icon: {
    paddingHorizontal: 5,
  },
  clearContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.GRAY_E8,
    //zIndex: 99,
    flexDirection: 'row',
    width: 200,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    right: 20,
    position: 'absolute',
    top: 10
  },
});
