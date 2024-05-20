import React, {useCallback, useEffect, useState, memo} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../../common/Colors';
import {goBack, navigate} from '../../../navigation/NavigationService';
import DIconPressable from '../../../components/DIconPressable';
import DButton from '../../../components/DButton';
import ShareSvg from '../../../assets/share.svg'
import ClipboardCopySvg from '../../../assets/clipboard.svg'
import Clipboard from '@react-native-clipboard/clipboard';
import Share, { Social } from 'react-native-share'


const RefernEarn = props => {
  const dispatch = useDispatch();

  const {userData} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};
  
  const [isLoading, setLoading] = useState(false);
  const [referCode, setReferCode] = useState("DA6C4R04");

  const copyToClipboard = () => {
    Clipboard.setString(referCode);
  };


  const onPressRefer = () => {
    const options = {
        title: "Share Via...",
        message: `${'App link'} -  ${referCode}`,
    }
    Share.open(options);
  };

  const _renderContent = () => {
    return (
      <>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.4, width: '100%'}}>
          <Image
            source={require('../../../assets/referEarn.jpg')}
            style={{height: '80%', width: '80%'}}
            resizeMode="contain"
          />
          <Text style={styles.refrerText}>{'Refer your friends and Earn'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <ReferRowInfo
                rowNo={'01'}
                rowLabel={'Invite your friends using your Referral Code.'}
            />
            <ReferRowInfo
                rowNo={'02'}
                rowLabel={'When they sign up on DateMe.'}
                isShowOfferLabel={true}
            />
            <ReferRowInfo
                rowNo={'03'}
                rowLabel={'Every time your friends earn, you get Paid too.'}
                isLearnMore={true}
            />
            <ReferCode referCode={referCode} copyToClipboard={copyToClipboard}/>
          </View>
          <DButton label={"Refer Now"} buttonIcon={<ShareSvg/>} onPress={onPressRefer}/>
        </View>
      </>
    );
  }
 
  return (
    <LayoutWrapper
      isHeader
      loading={isLoading}
      headerScreenName={"Refer & Earn"}
      >
      <View style={styles.container}>{_renderContent()}</View>
    </LayoutWrapper>
  );
};

const ReferRowInfo = props => {
  const {rowNo = null, rowLabel = null, isShowOfferLabel = false, isLearnMore = false} = props;
  return (
    <>
      <View style={styles.referRow}>
        <View style={{flex: 0.1}}>
          <View style={styles.rowNoContainer}>
            <Text style={styles.rowText}>{rowNo}</Text>
          </View>
        </View>
        <View style={styles.rightReferRow}>
          <Text style={styles.rowText}>{rowLabel} { isLearnMore ? <Text style={{color: COLORS.APP_THEME}}>{"Learn More"}</Text> : null }</Text>
          {isShowOfferLabel ? (
            <View style={styles.offerContainer}>
              <OfferLabel label={'You Get ₹75'} />
              <OfferLabel label={'They Get ₹50'} spaceStyle={{marginLeft: 20}}/>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

const OfferLabel = ({label, spaceStyle = null}) => {
    return (
        <View style={[styles.discountLabel, spaceStyle]}>
            <Text style={styles.offerText}>{label}</Text>
        </View>
    )
}

const ReferCode = ({referCode, copyToClipboard}) => {
    return (
        <View style={styles.referCodeContainer}>
            <Text style={[styles.offerText, {color: COLORS.BLACK}]}>Refer Code : {referCode}</Text>
            <DIconPressable onPress={copyToClipboard}>
                <ClipboardCopySvg />
            </DIconPressable>
            
        </View>
    )
}


export default RefernEarn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  infoContainer: {
    flex: 0.6,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowOffset: {
        width: 0,
        height: 5,
      },
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 1.5,
    padding: 20,
    justifyContent: 'space-between'
  },
  refrerText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  referRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center'
  },
  rightReferRow: {
    alignItems: 'flex-start',
    flex: 0.9, 
    paddingLeft: 20
  },
  offerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10
},
  rowText: {
    fontSize: 16,
    fontStyle: 'normal',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  rowNoContainer: {
    backgroundColor: COLORS.YELLOW_FF,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    height: 40,
    width: 40
  },
  discountLabel: {
    backgroundColor: COLORS.APP_THEME,
    paddingVertical: 5,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  offerText: {
    fontSize: 14,
    fontStyle: 'normal',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  referCodeContainer: {
    borderWidth: 1, 
    borderColor: COLORS.APP_THEME, 
    paddingVertical: 10, 
    borderRadius: 4, 
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10
    }
});
