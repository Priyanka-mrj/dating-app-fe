import React, { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import BackIcon from '../../../components/BackIcon';
import Styles from "../../../common/CommonStyles";
import { SCREENS_NAME } from "../../../navigation/ScreensName";
import { setProfileName } from '../../../redux/saga/SagaActions';
import styles from './style'
import ChatsProfile from '../../../components/ChatProfile';
import HomeBar from '../../../components/HomeBar';

const Premium = () => {
    const [name, setName] = useState("");

    const navigation = useNavigation();
    // const onPress = () => {
    //     navigation.navigate(SCREENS_NAME.PERSONALCHAT);
    // };
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setProfileName(name));
    }, [dispatch, name]);

    const handleButtonNavigation = () => {
        navigation.navigate(SCREENS_NAME.SELECTDATES);
    };
    const profilepageNavigation = () => {
        navigation.navigate(SCREENS_NAME.PROFILEPAGEE);
    };
    const chatspageNavigation = () => {
        navigation.navigate(SCREENS_NAME.CHATSPAGE);
    };
    const datespageNavigation = () => {
        navigation.navigate(SCREENS_NAME.SELECTDATES);
    };

    const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {

        console.log('Search:', text);
        setSearchText(text);
    };

    const chatdetails = [
        {
            name: "Varsha Kapoor Ray",
            message: 'lets meet',
            time: '2:10 pm',
            notexts: '3'
        },
        {
            name: "Shresta Kapoor",
            message: 'lets meet',
            time: '2:10 pm',
            notexts: '3'
        },
        {
            name: "John Doe",
            message: 'lets meet',
            time: '2:10 pm',
            notexts: '3',
            source: '../../../assets/profileImage.jpeg'
        },
        {
            name: "Varsha Kapoor Ray",
            message: 'lets meet',
            time: '2:10 pm',
            notexts: '3',
            source: '../../../assets/profileImage.jpeg'
        },
        {
            name: "Shresta Kapoor",
            message: 'lets meet',
            time: '2:10 pm',
            notexts: '3',
            source: '../../../assets/profileImage.jpeg'
        },
        {
            name: "John Doe",
            message: 'lets meet',
            time: '2:10 pm',
            notexts: '3',
            source: '../../../assets/profileImage.jpeg'
        },
    ];
    const [selectedChat, setSelectedChat] = useState(null);

    const onPress = (chat) => {
        setSelectedChat(chat);
        navigation.navigate(SCREENS_NAME.PERSONALCHAT, { selectedChat: chat });
    };
    return (
        <View style={[styles.container, { backgroundColor: "#fff", }]}>
            <View style={[Styles.circle, {
                position: "absolute",
                right: 340,
                top: 120,
            }]}>
                <BackIcon
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Text
                style={styles.text2}
            >
                Premium
            </Text>
        </View>

    );
}


export default Premium;
