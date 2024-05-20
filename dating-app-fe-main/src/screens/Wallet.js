import React, {useState, useCallback, memo, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {LayoutWrapper} from '../components/layoutWrapper/LayoutWrapper';
import { COLORS } from '../common/Colors';
import DTextInput from '../components/DTextInput';
import DButton from '../components/DButton';
import { Avatar, Icon } from 'react-native-elements';
import RazorpayCheckout from 'react-native-razorpay';
import { useSelector, useDispatch } from 'react-redux';
import {RAZORPAY_KEY_ID} from '@env';
import { showToast } from '../common/CommonUtils';
import { TOAST_TYPE, TRACKING_TYPE, TRANSACTION_TYPE } from '../common/Constants';
import walletServices from '../services/WalletService';
import { setLoggedInProfileDetailSaga } from '../redux/saga/SagaActions';
import moment from 'moment';

const DEAULT_COIN_AMOUT = ['500', '800', '1000', '1500'];

const TRANSACTION_DATA = [
  {
    id: '101',
    venue: 'Barbeque Nation',
    amount: 1000,
    date: 'May 22, 2023',
    time: '6:12 PM'
  },
  {
    id: '102',
    venue: 'PVR Cinemas',
    amount: 800,
    date: 'May 20, 2023',
    time: '7:45 PM'
  },
  {
    id: '103',
    venue: 'Cafe Coffee Day',
    amount: 500,
    date: 'Jan 10, 2024',
    time: '03:00 PM'
  },
  {
    id: '104',
    venue: 'Star Buck',
    amount: 1500,
    date: 'Dec 25, 2023',
    time: '9:00 PM'
  },
  {
    id: '105',
    venue: 'Moti Mahal Delux',
    amount: 1200,
    date: 'Jan 15, 2024',
    time: '04:00 PM'
  },
  {
    id: '106',
    venue: 'Food Count',
    amount: 1500,
    date: 'Nov 15, 2023',
    time: '10:00 PM'
  }
]

const Wallet = () => {

  const dispatch = useDispatch();
  const {loggedInUserProfile, userData, isLoggedInUserProfileLoading} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const [coinAmountToAdd, setCoinAmountToAdd ] = useState('');
  const [transactionHistoryList, setTransactionHistoryList] = useState([])

  const fetchTransactionHistory = async () => {
    const data = await walletServices.getTransactionList(access_token);
    setTransactionHistoryList(data);
  }

  useEffect(() => {
    fetchTransactionHistory();
    dispatch(setLoggedInProfileDetailSaga(access_token));
  },[]);

  const onChangeTextCoin = useCallback((text) => {
    setCoinAmountToAdd(text);
  }, [setCoinAmountToAdd, coinAmountToAdd]);

  const addCoins = async (amt, data) => {
    const params = {
      points: amt
    };
    const res = await walletServices.addFunds(params, access_token);
    if(res){
      showToast("", `Added Successfully\nTrn.Id: ${data.razorpay_payment_id}`, {type: TOAST_TYPE.SUCESS});
      setCoinAmountToAdd('');
      dispatch(setLoggedInProfileDetailSaga(access_token));
      fetchTransactionHistory()
    }
    else {

    }
    // showToast(error.code, erDesc, {type: TOAST_TYPE.DANGER});
     
  }

  const onPressAdd = useCallback(() => {
    const amt = coinAmountToAdd?.trim()?.length ? parseInt(coinAmountToAdd?.trim()) * 100 : 0;
    let options = {
      description: 'Adding coin',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: RAZORPAY_KEY_ID,
      amount: amt,
      name: loggedInUserProfile?.name,
      prefill: {
        email: 'void@razorpay.com',
        contact: loggedInUserProfile?.mobile_no,
        name: 'Razorpay Software'
      },
      theme: {color: COLORS.APP_THEME}
    }

    RazorpayCheckout.open(options).then((data) => {
      // handle success
      //console.log("data =====> ", data);
      addCoins(parseInt(coinAmountToAdd?.trim()), data);
    }).catch((error) => {
      // handle failure
      //console.log("error =====> ", error);
      const erDesc = error?.error ? error?.error.description : error.description;
      showToast(error.code, erDesc, {type: TOAST_TYPE.DANGER});
    });
   
  }, [coinAmountToAdd])


  return (
    <LayoutWrapper isHeader headerScreenName={'My Wallet'} loading={isLoggedInUserProfileLoading}>
      <View style={styles.container}>
        <CoinInfo coin={loggedInUserProfile?.total_points}/>
        <AddMoney 
          onChangeTextCoin={onChangeTextCoin}
          coinAmountToAdd={coinAmountToAdd}
          onPressAdd={onPressAdd}
        />
        <TransactionHitory 
          transactionHistoryList={transactionHistoryList}
        />
      </View>
    </LayoutWrapper>
  );
};

const CoinInfo = memo((props) => {
    const { 
        coin = 0
    } = props;
    return (
        <View style={styles.coinInfoContainer}>
            <Text style={styles.coinText}>{"Your Coins"}</Text>
            <Text style={[styles.coinText, {paddingTop: 10}]}>{parseFloat(coin).toFixed(3)}</Text>
        </View>
    )
});

const AddMoney = memo((props) => {
  const {
    onChangeTextCoin,
    coinAmountToAdd,
    onPressAdd
  } = props;
  return (
    <View style={styles.addMoneyContainer}>
      <Text style={styles.headingText}>{'Add Money'}</Text>
      <View style={styles.addMoneySubContainer}>
        <DTextInput
          onChangeText={onChangeTextCoin}
          value={coinAmountToAdd}
          keyboardType={'numeric'}
          placeholder={'Enter coin amount'}
        />
        <DefaultCoinAmoutList
          onChangeTextCoin={onChangeTextCoin}
          coinAmountToAdd={coinAmountToAdd} 
        />
        <DButton 
          label={'Add'} 
          onPress={onPressAdd}
          isEnable={coinAmountToAdd?.trim()?.length} 
        />
      </View>
    </View>
  );
})

const DefaultCoinAmoutList = memo((props) => {
  const {
    coinAmountToAdd,
    onChangeTextCoin
  } = props;

  return (
    <View style={styles.defaultCoinAmountContainer}>
      { DEAULT_COIN_AMOUT.map(value => {
        const isSelected = value == coinAmountToAdd;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={value}
            onPress={() =>
              onChangeTextCoin(value)
            }
            >
            <View
              style={
                isSelected
                  ? styles.selectInterestBoxView
                  : styles.nonSelectInterestBoxView
              }>
              <Text style={styles.text}>{'₹'+value}</Text>
            </View>
          </TouchableOpacity>
        );
      })
      }
    </View>
  );
});

const TransactionHitory = memo((props) => {
  const {
    transactionHistoryList = [],
  } = props;

  const _renderItem = ({item, index}) => {
    const bgColor = index % 2 === 0 ? COLORS.APP_THEME : COLORS.YELLOW_FF;
    const title = item.other_username ? item.other_username : item.user;
    const isCredit = item.transaction_type === TRANSACTION_TYPE.CREDIT;
    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionCardLeft}>
          <Avatar
            size="small"
            rounded
            title={title?.slice(0,1)}
            containerStyle={{backgroundColor: bgColor}}
          />
          <View style={{marginLeft: 15}}>
            <Text style={styles.venueText}>{title}</Text>
            <Text style={styles.dateTimeText}>{`${moment(item?.created_at).format("MMM MM, YYYY")} at ${moment(item?.created_at).format("hh:mm a")}`}</Text>
          </View>
        </View>
        <View style={styles.transactionCardLeft}>
          { isCredit ?
            <Icon name="call-received" type="material" color={COLORS.SUCESS_COLOR} size={15}/> :
            <Icon name="call-made" type="material" color={COLORS.FAILED_COLOR} size={15}/>
          }
          <Text style={[styles.venueText, {color: isCredit ? COLORS.SUCESS_COLOR : COLORS.BLACK}]}>{'₹' + item.amount}</Text>
        </View>
      </View>
    );
  };

  const _keyExtractor = item => Math.random().toString();

  return(
    <View style={{flex: 1}}>
      <Text style={[styles.headingText, {paddingBottom: 15, paddingTop: 40}]}>{'Transaction History'}</Text>
      <FlatList
            data={transactionHistoryList}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            showsVerticalScrollIndicator={false}
          />
    </View>
  )
})

export default Wallet;

const interestBoxStyle = {
  minWidth: '20%',
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#676767',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 20
  },
  coinInfoContainer: {
    backgroundColor: COLORS.APP_THEME,
    padding: 10,
    borderRadius: 5,
   // height: 150,
    padding: 20
  },
  coinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.WHITE
  },
  addMoneyContainer:{
    marginTop: 40
  },
  addMoneySubContainer: {
    borderWidth: 1,
    borderColor: COLORS.APP_THEME,
    borderRadius: 10,
    padding: 20,
    marginTop: 15
  },
  headingText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK
  },
  defaultCoinAmountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  selectInterestBoxView: {
    ...interestBoxStyle,
    borderColor: COLORS.YELLOW_FF,
    backgroundColor: COLORS.YELLOW_FF,
   },
   nonSelectInterestBoxView : {
     ...interestBoxStyle,
     borderColor: COLORS.GRAY_67,
     backgroundColor: COLORS.WHITE
   },
   text: {
    color: COLORS.BLACK,
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 3,
    paddingRight: 3,
  },
  transactionCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  transactionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  venueText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '500',
  },
  dateTimeText: {
    color: COLORS.GRAY_67,
    fontSize: 12,
    fontWeight: '400',
  }
});
