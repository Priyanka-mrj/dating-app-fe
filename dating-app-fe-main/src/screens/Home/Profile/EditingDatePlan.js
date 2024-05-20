import {StyleSheet, Text, View, Image, Pressable, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import { getDatingLabel, getDatingLabelAndImage } from '../../../common/CommonUtils';
import { COLORS } from '../../../common/Colors';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import STYLES from '../../../common/CommonStyles';
import DPressable from '../../../components/DPressable';
import { DATING_TIME } from '../../../common/Constants';
import DButton from '../../../components/DButton';
import DIconPressable from '../../../components/DIconPressable';
import EditSvg from '../../../assets/editIcon.svg';
import { updateDateChoice } from '../../../services/DatingService';
import { setLoggedInProfileDetailSaga } from '../../../redux/saga/SagaActions';

const EditingDatePlan = () => {

  const dispatch = useDispatch();
  const {loggedInUserProfile, userData, isLoggedInUserProfileLoading} = useSelector(state => state.loginReducer);

  const [isLoading, setLoading] = useState(false);
  const [isShowEditPlanDialog, setShowEditPlanDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selecteDateChoice, setSelectedDateChoice] = useState(null);

  const onChangeTime = item => {
    setSelectedTime(item);
  };

  const onChangeCoin = (text) => {
    setSelectedCoin(text);
  }

  const toggleEditPlanModal = (isVisible, dateChoice = null) => {
    setShowEditPlanDialog(isVisible);
    setSelectedDateChoice(dateChoice);
    setSelectedTime(DATING_TIME.find(item => item.value == dateChoice?.time));
    setSelectedCoin(dateChoice?.coins);
  };

  const onPressSubmit = async () => {
    setLoading(true);
    const data = {
        date_type: selecteDateChoice?.date_type,
        id: selecteDateChoice?.id,
        time: selectedTime?.value,
        coins: `${parseInt(selectedCoin)}`,
    };
    const res = await updateDateChoice(data, userData?.access_token);
    if(res) {
        setLoading(false);
        dispatch(setLoggedInProfileDetailSaga(userData?.access_token));
        toggleEditPlanModal(false);
    }
    else {
        setLoading(false);
    }
  }

  const _renderContent = () => {
    return (
      <View style={styles.rowContainer}>
        {loggedInUserProfile?.date_choice?.map(item => {
          return (
            <DatingCard
              key={item.id}
              datingDetail={item}
              toggleEditPlanModal={toggleEditPlanModal}
              selectedTime={selectedTime}
            />
          );
        })}
        <EditDatePlanDialog
          selecteDateChoice={selecteDateChoice}
          isShowEditPlanDialog={isShowEditPlanDialog}
          toggleEditPlanModal={toggleEditPlanModal}
          onChangeTime={onChangeTime}
          selectedTime={selectedTime}
          selectedCoin={selectedCoin}
          onChangeCoin={onChangeCoin}
          onPressSubmit={onPressSubmit}
        />
      </View>
    );
  }

  return (
    <LayoutWrapper
      isHeader
      loading={isLoading || isLoggedInUserProfileLoading}
      headerScreenName={'Edit dating plan'}>
      <View style={styles.container}>{_renderContent()}</View>
    </LayoutWrapper>
  );
};

const DatingCard = props => {
    const { datingDetail, toggleEditPlanModal } = props;

    const _onPress = () => {
        toggleEditPlanModal(true, datingDetail)
    }
  
    const datingLabelAndImage = getDatingLabelAndImage(datingDetail?.date_type);
    return (
      <View style={styles.cardContainer} key={datingDetail.id}>
        <View style={styles.rectangle}>
          <Image source={datingLabelAndImage?.datingImage} style={styles.image} />
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.text}>{datingLabelAndImage?.datingLabel}</Text>
          <DIconPressable onPress={_onPress}>
           <EditSvg/>
          </DIconPressable>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.text1}>{`${datingDetail?.time}`}</Text>
          <Text style={styles.text1}>{`${datingDetail?.coins}rs`}</Text>
        </View>
      </View>
    );
  };

  const EditDatePlanDialog = props => {
    const {
      isShowEditPlanDialog,
      toggleEditPlanModal,
      onChangeTime,
      selectedTime,
      selecteDateChoice,
      selectedCoin,
      onChangeCoin,
      onPressSubmit
    } = props;

    const _onPressCancel = () => toggleEditPlanModal(false);

    const isEnabled = () => {
        return selectedCoin && selectedCoin?.trim()?.length && selectedTime?.time;
    }

    return (
      <Modal
        isVisible={isShowEditPlanDialog}
        animationType="fade"
        useNativeDriver={true}
        backdropColor={'rgba(0, 0, 0, .5)'}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onBackdropPress={() => toggleEditPlanModal(false)}>
        <View style={styles.editPlandModal}>
          <Text style={styles.modalTitle}>
            {getDatingLabel(selecteDateChoice?.date_type)?.datingLabel}
          </Text>
          <DatingTimeView
            onChangeTime={onChangeTime}
            selectedTime={selectedTime}
          />
          <DatingCoinView 
            selectedCoin={selectedCoin}
            onChangeCoin={onChangeCoin}
          />
          <View style={styles.btnContainer}>
            <DButton
              label={'Cancel'}
              isTransparent
              additionalStyle={styles.btnStyle}
              onPress={_onPressCancel}
            />
            <DButton
              onPress={onPressSubmit}
              label={'Save'}
              additionalStyle={styles.btnStyle}
              isEnable={isEnabled()}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const DatingTimeView = (props) => {
    const {
        onChangeTime,
        selectedTime,
      } = props;
    let flatListRef = useRef();

    useEffect(() => {
        scrollToItem();
    }, []);

    const getItemLayout = (data, index) => {
        return { length: 50, offset: 50 * index, index }
    }

    const scrollToItem = () => {
      const itemIndex = DATING_TIME.findIndex(
        item => item?.id === selectedTime?.id,
      );
      flatListRef?.current?.scrollToIndex({animated: true, index: itemIndex});
    };
  
    const _keyExtractor = item => Math.random().toString();

    const _renderItem = ({item}) => {
      const isSelected = selectedTime?.id === item?.id;
      const _onPress = () => onChangeTime(item);

      return (
        <DPressable style={styles.timeRow} onPress={_onPress}>
          <Text style={isSelected ? styles.selectedTimeText : styles.normalTextGray}>{parseInt(item.value)}</Text>
          <Text style={isSelected ? styles.selectedTimeText : styles.normalTextGray}>{'min'}</Text>
        </DPressable>
      );
    };

    return (
        <>
        <Text style={styles.textBlack}>{'Time'}</Text>
          <View style={styles.timeContainer}>
            <FlatList
              style={{ flex: 1 }}
              ref={flatListRef}
              getItemLayout={getItemLayout}
              initialNumToRender={3}
              data={DATING_TIME}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
            />
          </View>
        </>
    )
  }

  const DatingCoinView = (props) => {
    const {
        onChangeCoin,
        selectedCoin,
      } = props;

    return (
      <>
        <Text style={[styles.textBlack, {marginTop: 20}]}>{'Coins'}</Text>
        <View style={styles.coinContainer}>
          <TextInput
            placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
            style={styles.textInput}
            value={selectedCoin}
            placeholder="Enter coin amount"
            maxLength={50}
            keyboardType="number-pad"
            onChangeText={onChangeCoin}
          />
        </View>
      </>
    );
  }

const styles = StyleSheet.create({
    alignCenter: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE
      },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap',
      },
      cardContainer: {
        width: '48%',
        minHeight: 200,
        backgroundColor: COLORS.APP_THEME,
        borderRadius: 10,
        marginTop: 40,
        position: 'relative'
      },
      rectangle: {
        height: 128,
        borderRadius: 10,
      },
      text: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '700',
      },
      textBlack: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '700',
      },
      modalTitle: {
        fontSize: 18,
        color: COLORS.BLACK,
        fontWeight: '700',
        textAlign: 'center'
      },
      normalTextGray: {
        fontSize: 14,
        color: COLORS.PLACEHOLDER_TEXT,
        fontWeight: '400',
      },
      selectedTimeText: {
        fontSize: 14,
        color: COLORS.APP_THEME,
        fontWeight: '600',
      },
      text1: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '600',
      },
      rowInfo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
        alignItems: 'center'
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      editPlandModal: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.GRAY_E8,
        width: '80%',
        padding: 20,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
      },
      dropDown: {
        borderColor: COLORS.APP_THEME,
        backgroundColor: COLORS.APP_THEME, 
        height:40,
      },
      timeRow: {
        flexDirection: 'row', 
        width: 100, 
        justifyContent: 'space-between', 
        alignSelf: 'center', 
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4
      },
      btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
      },
      btnStyle: {
        paddingVertical: 5 
      },
      timeContainer:{
        ...STYLES.shadow,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        //alignItems: 'center',
        marginTop: 10,
        height: 100,
      },
      coinContainer:{
        ...STYLES.shadow,
        borderRadius: 8,
        paddingLeft: 15,
        marginTop: 10,
        backgroundColor: COLORS.APP_THEME
      },
      textInput: {
        color: COLORS.APP_THEME,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        backgroundColor: COLORS.WHITE,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
      },
});

export default EditingDatePlan;