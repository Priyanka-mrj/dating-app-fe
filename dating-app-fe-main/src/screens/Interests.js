import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView, 
  TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import { removeElementFromArray } from "../common/CommonUtils";
import { LayoutWrapper } from "../components/layoutWrapper/LayoutWrapper";
import ScreenContainer from "../components/ScreenContainer";
import { COLORS } from "../common/Colors";
import { getInterests } from "../services/RegisterService";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate, setParams } from "../navigation/NavigationService";
import DButton from "../components/DButton";

const SelectInterestsScreen = (props) => {
  const {isEdit, preferedInterest, previousRoute} = props?.route?.params || {
    isEdit: false,
    preferedInterest: {},
    previousRoute: {},
  };

  const dispatch = useDispatch();
  const [selectedInterests, setSelectedInterest] = useState(JSON.parse(JSON.stringify(preferedInterest)));
  const [interestData, setinteretsData] = useState([]);
  const [isLoading, setLoading] = useState(false); 

  const getInterestsData = async () => {
    setLoading(true);
    const res = await getInterests();
    setinteretsData(res);
    setLoading(false);
  }

  useEffect(() => {
    getInterestsData();
  }, []);

  const handleItemClick = (interest, interestType) => {
    let clonedSelectedInterests = {...selectedInterests};
    if(clonedSelectedInterests[interestType.id]) {
      if (clonedSelectedInterests[interestType.id].includes(interest.id)) {
        clonedSelectedInterests[interestType.id] = removeElementFromArray(clonedSelectedInterests[interestType.id], interest.id);
      } else {
        clonedSelectedInterests[interestType.id].push(interest.id);
      }
    }
    else {
      clonedSelectedInterests[interestType.id] = [];
      clonedSelectedInterests[interestType.id].push(interest.id);
    }
    setSelectedInterest(clonedSelectedInterests);
  };

  const onPressNextButton = () => {
    if (selectedInterests && Object.keys(selectedInterests).length) {
      let preferedInterest = [];
      Object.keys(selectedInterests).forEach((interestTypeId) => {
        preferedInterest.push({[interestTypeId]: selectedInterests[interestTypeId]});
      });
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.interest, value: preferedInterest}));
      navigate(SCREENS_NAME.IMAGESSCREEN);
    }
    else {
      alert("Please choose intrest !!")
    }
  };

  const onPressSave = () => {
    const myInterests = [];
    Object.keys(interestData).map((interestType) => {
      interestData[interestType].sub_interest.forEach(item => {
        if(selectedInterests[interestData[interestType]?.id]?.includes(item.id)){
          myInterests.push({
            ...item,
            interest:{ id: interestData[interestType]?.id, name: interestType, }
          })
        }
      })
    });
    setParams(previousRoute.key, {savedInterests: myInterests});
    goBack();
  };

  const InterestsList = ({ interests, selectedInterests, handleSelection }) => {
    return (
      <ScrollView>
        {Object.keys(interests)?.map((interestType) => (
          <View key={interestType}>
            <Text style={styles.interestHeading}>{interestType}</Text>
            <View style={styles.container1}>
              {interests[interestType].sub_interest.map((subinterest) => {
                const isSelected = selectedInterests[interests[interestType].id]?.includes(subinterest.id);
  
                return (
                  <TouchableOpacity key={subinterest.id} onPress={() => handleSelection(subinterest, interests[interestType])}>
                    <View style={isSelected ? styles.selectInterestBoxView : styles.nonSelectInterestBoxView}>
                      <Text style={styles.text}>
                        {subinterest.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };
  

  return (
    <LayoutWrapper loading={isLoading}>
      <ScreenContainer
        onPressBack={goBack}
        isShowStepperCount={isEdit ? false : true}
        totalCount={RESGISTER_TOTAL__COUNT}
        selectedCount={7}
        onPressNext={onPressNextButton}>
        <View style={styles.container}>
          <Text style={styles.text2}>{'Interests'}</Text>
          <InterestsList
            interests={interestData}
            handleSelection={handleItemClick}
            selectedInterests={selectedInterests}
          />
        </View>
        {isEdit ? <DButton label={'Save'} additionalStyle={{margin: 20}} onPress={onPressSave}/> : null }
      </ScreenContainer>
    </LayoutWrapper>
  );
}

const interestBoxStyle = {
  minWidth: '30%',
  borderRadius: 15,
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
    paddingHorizontal: 20,
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
  container1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  interestHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: COLORS.BLACK
  }, 
  text2: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  }
});

export default SelectInterestsScreen;
