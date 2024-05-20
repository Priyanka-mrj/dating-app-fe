import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import {COLORS} from '../../../common/Colors';
import {Avatar} from 'react-native-elements';
import STYLES from '../../../common/CommonStyles';
import DButton from '../../../components/DButton';
import moment from 'moment';
import { SCREENS_NAME } from '../../../navigation/ScreensName';
import { navigate } from '../../../navigation/NavigationService';
import {Toast} from "react-native-toast-notifications";
import { showToast } from '../../../common/CommonUtils';


const DateRequestCard = props => {
  const {
    requestDetail, 
    showPreviewId, 
    onPressPreview, 
    onPressOutsidePreview,
    navigation,
    deleteDateRequest,
    confirmDateRequest,
    loggedInUserProfile
} = props;

  const createTwoButtonAlert = (rightButtonName, onPressRightButton, alertMsg) => {
    Alert.alert('Alert', alertMsg , [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: rightButtonName, onPress: onPressRightButton},
    ]);
  };

  const onPressConfirmAlertButton = () => {
    confirmDateRequest(requestDetail);
  };

  const onPressDeleteAlertButton = () => {
    deleteDateRequest(requestDetail);
  }

  const onPressConfirm = () => {
    createTwoButtonAlert("confirm", onPressConfirmAlertButton, 'Are you sure want to confirm request ?')
  };

  const onPressDelete = () => {
    createTwoButtonAlert("Delete", onPressDeleteAlertButton, 'Are you sure want to delete request ?')
  };

  const onPressEditRequest = () => {
    navigate(SCREENS_NAME.DATING_DETAILS, {datingDetails: requestDetail, isEditCall: true})

  };

  const onPressProfile = () => {
    const profileId = 
    loggedInUserProfile?.id == requestDetail?.requested_user?.id 
    ? requestDetail?.user?.id 
    : requestDetail?.requested_user?.id 
    navigation.navigate(SCREENS_NAME.PROFILE_DETAIL, {profileId: profileId})
  }

  const _onPressPreview = () => {
    onPressPreview(requestDetail.id);
  }

  const isAccepted = requestDetail?.user?.id === loggedInUserProfile?.id;

  return (
    <TouchableWithoutFeedback onPress={onPressOutsidePreview}>
      <View style={styles.cardContainer}>
        <View style={styles.profileInfo}>
          <Avatar
            rounded
            source={{
              uri: isAccepted
                ? requestDetail?.requested_user?.profile_pic_1
                : requestDetail?.user?.profile_pic_1,
            }}
            onPress={onPressProfile}
            activeOpacity={0.8}
            size="medium"
          />
          <View style={{marginLeft: 15}}>
            <Text style={styles.name}>
              {isAccepted
                ? requestDetail?.requested_user?.name
                : requestDetail?.user?.name}
            </Text>
            <Text style={styles.requestText}>
              {isAccepted
                ? 'has accepted your request'
                : 'requested to date you.'}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsView}>
          <DButton
            label={'Preview'}
            isTransparent={false}
            onPress={_onPressPreview}
            additionalStyle={isAccepted ? {width: '100%'} : {}}
          />
          {isAccepted ? null : (
            <>
              <DButton
                label={'Confirm'}
                isTransparent={true}
                onPress={onPressConfirm}
                isEnable={!requestDetail?.is_confirm}
              />
              <DButton
                label={'Delete'}
                isTransparent={true}
                onPress={onPressDelete}
                isEnable={!requestDetail?.is_confirm}
              />
            </>
          )}
        </View>

        {showPreviewId === requestDetail.id ? (
          <View style={styles.previewContainer}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.previewText}>
                Date -{' '}
                {moment(requestDetail.requested_date).format('DD MMM YYYY')}
              </Text>
              <Text style={styles.previewText}>
                Time - {requestDetail?.requested_time.toUpperCase()}
              </Text>
              <Text style={styles.previewText}>
                Location - {requestDetail?.venue?.venue_name}
              </Text>
            </View>
            {isAccepted ? null : (
              <DButton
                label={'Edit'}
                isTransparent={false}
                onPress={onPressEditRequest}
                additionalStyle={{marginTop: 10, width: 180}}
                //isEnable={!requestDetail?.is_confirm}
              />
            )}
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...STYLES.shadow,
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  requestText: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewContainer: {
    ...STYLES.shadow,
    borderWidth: 1,
    borderColor: COLORS.GRAY_DD,
    width: '75%',
    padding: 15,
    position: 'absolute',
    right: 0,
    zIndex: 99,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    //top: 10
  },
  previewText: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
});

export default DateRequestCard;
