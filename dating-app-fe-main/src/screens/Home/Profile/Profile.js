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

const SaveProfile = () => {
    const [name, setName] = useState("");

    const navigation = useNavigation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setProfileName(name));
    }, [dispatch, name]);

    const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {
        console.log('Search:', text);
        setSearchText(text);
    };

    const chatdetails = [
        {
            name: "Varsha Kapoor Ray",
            message: '10Km away',
        },
        {
            name: "Shresta Kapoor",
            message: '10Km away',
        },
        {
            name: "John Doe",
            message: '10Km away',
        },
        {
            name: "Varsha Kapoor Ray",
            message: '10Km away',
        },
        {
            name: "Shresta Kapoor",
            message: '10Km away',
        },
        {
            name: "John Doe",
            message: '10Km away',
        },
    ];
    const [selectedChat, setSelectedChat] = useState(null);

    const handleClick = () => {
        alert('Saved');
    };
    return (
        <View style={styles.container1}>
            <View
                style={styles.texts1}
            >
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
                    style={styles.texts2}
                >
                    Save Profile
                </Text>
            </View>
            <View style={styles.searchContainer1}>
                <Image
                    source={require('../../../assets/Search.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={handleSearch}
                    value={searchText}
                />
            </View>
            <ScrollView style={{ width: "100%", height: '100%' }}>
                <ChatsProfile
                    chatdetails={chatdetails}
                    onPress={handleClick}
                    save={true}
                />
            </ScrollView>
        </View>

    );
}



export default SaveProfile;
