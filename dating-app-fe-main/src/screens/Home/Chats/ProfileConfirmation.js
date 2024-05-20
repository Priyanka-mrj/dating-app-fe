import React, {useEffect, useState, useCallback, useRef, memo} from 'react';
import {StyleSheet, Text, View, FlatList } from 'react-native';
import {Avatar} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {COLORS} from '../../../common/Colors';
import CloseSvg from '../../../assets/cross1.5X.svg';
import DButton from '../../../components/DButton';
import {clockify, getTotalSecondsUntilFutureDate, showToast} from '../../../common/CommonUtils';
import { useFocusEffect } from '@react-navigation/native'
import STYLES from '../../../common/CommonStyles';
import OtpInputs from '../../../components/OtpInputs';
import chatService from '../../../services/ChatService';
import { DATING_TIME, TOAST_TYPE } from '../../../common/Constants';
import DDropDown from '../../../components/DDropDown';
import {Icon} from 'react-native-elements'

const ProfileConfirmation = props => {
  const { access_token, fetchChatList } = props;

  const [userDateChatList, setUserDateChatList] = useState([]);

  const onPressStart = useCallback((rowId) => {
    
    // setPorfileList(prevItems =>
    //   prevItems.map((item, index) => {
    //     return item.id === rowId ? {...item, isTimerStarted: true} : item;
    //   }),
    // );
  }, []);

  const fetchUserDateChatList = async () => {
    const response = await chatService.getUserDateChatList(access_token) || [];
    setUserDateChatList(response);
  }

  useFocusEffect(
    useCallback(() => {
        fetchUserDateChatList();
    }, []),
  );


  const _keyExtractor = item => Math.random().toString();

  const _renderItem = ({item, index}) => {
    return (
      <>
      <RowItem
        datingChatItem={item}
        onPressStart={onPressStart}
        access_token={access_token}
        fetchChatList={fetchChatList}
        fetchUserDateChatList={fetchUserDateChatList}
      />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={userDateChatList}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={<View style={styles.gapHorizontal} />}
      />
    </View>
  );
};

const RowItem = memo((props) => {
  const {
    onPressStart,
    access_token,
    datingChatItem,
    fetchChatList,
    fetchUserDateChatList
  } = props;
  const rowId = datingChatItem?.id;
  const initialTime = getTotalSecondsUntilFutureDate(datingChatItem?.date_start_time);

  const [time, setTime] = useState(initialTime);
  const [showOtpModalId, setShowOtpModalId] = useState(null);
  const [showExtendModalId, setShowExtendModalId] = useState(null);

  let intervalId = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if(datingChatItem?.is_date_started && (initialTime > 0)) {
        startTimer();
      }
      return () => {
        clearInterval(intervalId?.current)
      };
    }, []),
  );

  const startTimer = () => {
    intervalId.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
  }

  const onPressConfirmOtp = async (otp) => {
    const params = {
        date_id: datingChatItem?.id, 
        otp: otp
    }
    const isOtpVerified = await chatService.verifyMeetingViaOtp(params, access_token);
    if(isOtpVerified){
        startTimer();
        fetchChatList();
        fetchUserDateChatList();
    }
  }
  
  const _onPressStart = () => {
    setShowOtpModalId(rowId);
  };
 

  const hideOtpModal = () => {
    setShowOtpModalId(null);
  };

  const onPressCancelOrConfirm = (otp, isCancel) => {
    if(isCancel) {
        hideOtpModal();
    }
    else {
        onPressConfirmOtp(otp);
        hideOtpModal();
    }
  }

  const extendDateDuration = async (selectedDateChoice) => {
    const params = {
        time: parseInt(selectedDateChoice?.time),
        date_id: rowId,
        date_choice_id: selectedDateChoice?.id
    }
    const res = await chatService.extendDate(params, access_token);
    if(!!res){
        showToast("",res?.message, {type: TOAST_TYPE.SUCESS});
        fetchUserDateChatList();
    }
  }

  const onCancelOrSubmitExtendNow = (selectedDateChoice, isCancel) => {
    if(!selectedDateChoice && !isCancel) {
        showToast("", "Please select time first!");
        return;
    }
    if(isCancel) {
        hideExtendModal();
    }
    else {
        extendDateDuration(selectedDateChoice)
        hideExtendModal();
    }
  }

  const _onPressExtend = () => {
    setShowExtendModalId(rowId)
  }

  const hideExtendModal = () => {
    setShowExtendModalId(null);
  };

  return (
    <View style={styles.rowItem}>
      <RenderAvatar uri={datingChatItem?.user_profile_pic} />
      <Timer
        isDateStarted={datingChatItem?.is_date_started}
        secondsLeft={time}
        onPressStart={_onPressStart}
        _onPressExtend={_onPressExtend}
        otpToShare={datingChatItem?.otp}
      />
      { showOtpModalId === rowId ? <OtpModal onPressCancelOrConfirm={onPressCancelOrConfirm}/> : null }
      { showExtendModalId === rowId ? <ExtendModal date_choices={datingChatItem?.date_choices} onCancelOrSubmitExtendNow={onCancelOrSubmitExtendNow}/> : null }

    </View>
  );
})

const RenderAvatar = memo(({uri}) => {
  const isShowCircle = true;
  const isShowCloseIcon = true;
  return (
    <View style={styles.profileBar}>
      <Progress.Circle
        size={100}
        progress={isShowCircle ? 100 : 0}
        color={COLORS.APP_THEME}
        thickness={3}
        direction={'counter-clockwise'}
        borderWidth={0}
      />

      <View style={styles.avatar}>
        <Avatar
          size={95}
          rounded
          source={{uri: uri}}
          activeOpacity={0.8}
        />
        {/* {isShowCloseIcon ? (
          <TouchableOpacity style={styles.close} activeOpacity={0.6}>
            <CloseSvg />
          </TouchableOpacity>
        ) : null} */}
      </View>
    </View>
  );
});

const Timer = ({isDateStarted = false, secondsLeft = null, onPressStart, otpToShare = null, _onPressExtend}) => {

  if(otpToShare && !isDateStarted) {
    return (
        <View style={styles.shareOtp}>
        <Text style={{color: COLORS.BLACK, fontWeight: 'bold'}}>
          OTP {otpToShare}
        </Text>
      </View>
    )
  }
  else if (secondsLeft && isDateStarted) {
    const timeCount = clockify(secondsLeft);
    if(secondsLeft < 0) {
        return (
          <DButton
            label={'Extend Now'}
            additionalStyle={{
              paddingVertical: 5,
              borderRadius: 20,
              marginTop: 10,
              minWidth: 30,
            }}
            additionalTextStyle={{fontSize: 12}}
            onPress={_onPressExtend}
          />
        );
    }
    return (
      <View style={styles.timerCounter}>
        <Text style={{color: COLORS.BLACK}}>
          {timeCount?.displayHours}.{timeCount?.displayMins}.{timeCount?.displaySecs}
        </Text>
      </View>
    );
  }
  else {
    return (
        <DButton
          label={'Start'}
          additionalStyle={{
            paddingVertical: 5,
            borderRadius: 20,
            marginTop: 10,
            minWidth: 30,
          }}
          additionalTextStyle={{fontSize: 14}}
          onPress={onPressStart}
        />
      );
  }
  
};

const OtpModal = memo(({onPressCancelOrConfirm}) => {
  const [otp, setOtp] = useState("");

  const onGetOtp = (otp) => {
    setOtp(otp);
  };

  const _onPress = () => {
    otp?.length === 4 ? onPressCancelOrConfirm(otp, false) : onPressCancelOrConfirm(otp, true);
  };

  return (
    <View style={styles.otpModalContainer}>
      <Text style={styles.otpText}>OTP</Text>
      <OtpInputs getOtp={onGetOtp}/>
      <DButton
        label={otp?.length === 4 ? 'Confirm' : 'Cancel'}
        additionalStyle={styles.btnStyle}
        additionalTextStyle={{fontSize: 12}}
        onPress={_onPress}
        isTransparent={!(otp?.length === 4)}
      />
    </View>
  );
})

const ExtendModal = ({onCancelOrSubmitExtendNow, date_choices}) => {
  const [selectedDateChoice, setSelectedDateChoice] = useState(null);
  const onPress = dateChoice => {
    setSelectedDateChoice(dateChoice);
  };


  return (
    <View style={styles.extendModalContainer}>
      {date_choices.map((item, index) => {
        return (
          <Text
            key={index}
            style={
                item?.id === selectedDateChoice?.id
                ? styles.selectedExtendTimeItem
                : styles.extendTimeItem
            }
            onPress={() => onPress(item)}>
            {item?.time}
          </Text>
        );
      })}
      <RowIcons onCancelOrSubmitExtendNow={onCancelOrSubmitExtendNow} selectedDateChoice={selectedDateChoice}/>
      {/* <DButton
        label={'Confirm'}
        additionalStyle={styles.btnStyle}
        additionalTextStyle={{fontSize: 12}}
        onPress={() => onCancelOrSubmitExtendNow(selectedDateChoice, false)}
        //isTransparent={!(otp?.length === 4)}
        isEnable={!!selectedDateChoice}
      /> */}
    </View>
  );
};

const RowIcons = ({onCancelOrSubmitExtendNow, selectedDateChoice}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5,
        paddingHorizontal: 10
      }}>
      <Icon
        name="cancel"
        type="material"
        size={20}
        color={COLORS.PLACEHOLDER_TEXT}
        onPress={() => onCancelOrSubmitExtendNow(selectedDateChoice, true)}
      />
      <Icon
        name="check-circle"
        type="material"
        color={COLORS.SUCESS_COLOR}
        onPress={() => onCancelOrSubmitExtendNow(selectedDateChoice, false)}
      />
    </View>
  );
};

export default ProfileConfirmation;

const modalContainer = {
    ...STYLES.shadow,
    borderWidth: 1,
    borderColor: COLORS.GRAY_DD,
    width: 100,
    zIndex: 99,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    alignSelf: 'center',
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    //backgroundColor: 'red'
  },
  rowItem: {
    // paddingLeft: 10
    // position: 'relative'
  },
  gapHorizontal: {
    paddingHorizontal: 10,
  },
  profileBar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    zIndex: 99,
    position: 'absolute',
    alignItems: 'center',
  },
  close: {
    zIndex: 99,
    position: 'absolute',
    right: 0,
  },
  otpModalContainer: {
    ...modalContainer,
    padding: 10,
    marginTop: 1,
    marginBottom: 5,
  },
  extendModalContainer: {
    ...modalContainer,
    // height: 100,
    paddingBottom: 5
  },
  otpText:{
    color: COLORS.BLACK, 
    fontWeight: 'bold', 
    fontSize: 14
  },
  btnStyle: {
    paddingVertical: 5,
    marginTop: 10,
    minWidth: 20,
    borderColor: COLORS.APP_THEME
  },
  timerCounter: {
    backgroundColor: COLORS.GRAY_D9, 
    paddingVertical: 5, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginTop: 10,
  },
  shareOtp: {
    backgroundColor: COLORS.WHITE, 
    paddingVertical: 5, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginTop: 10,
    borderColor: COLORS.APP_THEME,
    borderWidth: 1
},
dropDown: {
    borderColor: COLORS.APP_THEME,
    backgroundColor: COLORS.APP_THEME, 
    height: 30,
    borderRadius: 25
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight:'bold',
    color: COLORS.WHITE
  },
  extendTimeItem: {
    color: COLORS.PLACEHOLDER_TEXT,
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500'
  },
  selectedExtendTimeItem: {
    color: COLORS.APP_THEME,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold'
  }
});
