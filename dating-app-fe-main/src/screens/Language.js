import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import BoxOption from "../components/RectangleTextBox";
import { removeElementFromArray } from "../common/CommonUtils";
import ScreenContainer from "../components/ScreenContainer";
import { COLORS } from "../common/Colors";
import { LayoutWrapper } from "../components/layoutWrapper/LayoutWrapper";
import { getLanguage } from "../services/RegisterService";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate, setParams } from "../navigation/NavigationService";
import DButton from "../components/DButton";


const SelectLanguageScreen = (props) => {
  const {isEdit, preferedLanguage, previousRoute} = props?.route?.params || {
    isEdit: false,
    preferedLanguage: [],
    previousRoute: {},
  };

  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState(JSON.parse(JSON.stringify(preferedLanguage)));
  const [languageData, setLanguageData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getLanguageData = async () => {
    setLoading(true);
    const res = await getLanguage();
    setLanguageData(res);
    setLoading(false);
  }

  useEffect(() => {
    getLanguageData();
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <BoxOption
        key={index}
        onPress={() => handleLanguageClick(item)}
        label={item.name}
        isClicked={selectedLanguage.includes(item?.id)}
        style={{marginTop: 10}}
      />
    );
  };

  const _keyExtractor = item => Math.random().toString();

  const handleLanguageClick = (language) => {
    let languages = [...selectedLanguage];
    if(languages.includes(language.id)){
      languages = removeElementFromArray(languages, language.id);
    }
    else{
      languages.push(language.id);
    }
    setSelectedLanguage(languages);
  };

  const onPressNextButton = () => {
    if (selectedLanguage.length) {
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.language, value: selectedLanguage}));
      navigate(SCREENS_NAME.RELIGIONPAGE);
    }
    else {
      alert("Please select at least one language");
    }
  };

  const onPressSave = () => {
    const myLanguage = languageData.filter(item => selectedLanguage.includes(item.id));
    setParams(previousRoute.key, {savedLanguage: myLanguage});
    goBack();
  };


  return (
    <LayoutWrapper loading={isLoading}>
      <ScreenContainer
        onPressBack={goBack}
        isShowStepperCount={isEdit ? false : true}
        totalCount={RESGISTER_TOTAL__COUNT}
        selectedCount={5}
        onPressNext={onPressNextButton}>
        <View style={styles.container}>
          <Text style={styles.text2}>{'What’s your language you speak'}</Text>
          <FlatList
            data={languageData}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            style={{marginTop: 20}}
          />
        </View>
        {isEdit ? <DButton label={'Save'} additionalStyle={{margin: 20}} onPress={onPressSave}/> : null }
      </ScreenContainer>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 50,
  },
  text2: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  }
});


export default SelectLanguageScreen;