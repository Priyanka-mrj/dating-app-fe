import CheerSVG from '../assets/cheers.svg'
import CalendarSVG from '../assets/Date.svg'
import ChatSvg from '../assets/Chat.svg'
import ProfileSvg from '../assets/about.svg'
import CheerSelectedSVG from '../assets/CheersSelected.svg'
import CalendarSelectedSVG from '../assets/CalendarSelected.svg'
import ChatSelectedSvg from '../assets/ChatSelected.svg'
import ProfileSelectedSvg from '../assets/ProfileSelected.svg'
import React from 'react';
import {
    View,
    Text,
} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {BottomTabComponent} from "./BottomTab";
import {SCREENS_NAME} from './ScreensName';
import Home from '../screens/Home/HomePage';
import ProfilePage from '../screens/Home/Profile/ProfilePage';
import ChatsPage from '../screens/Home/Chats/Chatspage';
import SelectDates from '../screens/Home/SelectDate/SelectDates';
import FilterPage from '../screens/Home/Filters/Filter';
import PersonalChat from '../screens/Home/Chats/PersonalChat';
import CallHistory from '../screens/Home/Profile/CallHistory';
import Premium from '../screens/Home/Profile/Premium';
import RefernEarn from '../screens/Home/Profile/RefernEarn';
import Support from '../screens/Home/Profile/Support';
import Profile from '../screens/Home/Profile/Profile';
import Dates from '../screens/Home/Dates/Dates'
import DatingDetails from '../screens/DatingDetails'
import ProfileDetail from '../screens/ProfileDetail'
import SavedProfile from '../screens/SavedProfile'
import Wallet from '../screens/Wallet'
import EditingDatePlan from '../screens/Home/Profile/EditingDatePlan'
import EditProfile from '../screens/Home/Profile/EditProfile'
import Interests from "../screens/Interests";
import Language from '../screens/Language'
import EditMyBasics from '../screens/Home/Profile/EditMyBasics'
import EditMoreAboutMe from '../screens/Home/Profile/EditMoreAboutMe'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const tabData = [
        {
            title: 'Home',
            name: SCREENS_NAME.HOMEPAGE,
            PageComponent: Home,
            unselectedTabIcon: <CheerSVG />,
            selectedTabIcon: <CheerSelectedSVG />,
        },
        {
            title: 'Dates',
            name: SCREENS_NAME.DATESPAGE,
            PageComponent: Dates,
            unselectedTabIcon: <CalendarSVG />,
            selectedTabIcon: <CalendarSelectedSVG />,
        },
        {
            title: 'Chat',
            name: SCREENS_NAME.CHATSPAGE,
            PageComponent: ChatsPage,
            unselectedTabIcon: <ChatSvg />,
            selectedTabIcon: <ChatSelectedSvg />,
        },
        {
            title: 'Profile',
            name: SCREENS_NAME.PROFILEPAGEE,
            PageComponent: ProfilePage,
            unselectedTabIcon: <ProfileSvg />,
            selectedTabIcon: <ProfileSelectedSvg />,
        },
    ];

    const BottomTabs = () => <BottomTabComponent data={tabData} />;
    return (
        <Stack.Navigator
            initialRouteName={SCREENS_NAME.HOMEPAGE}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={SCREENS_NAME.HOMEPAGE} component={BottomTabs} />
             <Stack.Screen
                name={SCREENS_NAME.FILTER}
                component={FilterPage}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.PERSONALCHAT}
                component={PersonalChat}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.CALLHISTORY}
                component={CallHistory}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.EDITING_DATE_PLAN}
                component={EditingDatePlan}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.PROFILE}
                component={Profile}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.PREMIUM}
                component={Premium}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.REFERNEARN}
                component={RefernEarn}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.SUPPORT}
                component={Support}
                options={{
                    title: "",
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.SELECTDATES}
                component={SelectDates}
                options={{
                    title: "",
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.DATING_DETAILS}
                component={DatingDetails}
                options={{
                    title: "",
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.PROFILE_DETAIL}
                component={ProfileDetail}
                options={{
                    title: "",
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.SAVED_PROFILE}
                component={SavedProfile}
                options={{
                    title: "",
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.WALLET}
                component={Wallet}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.EDIT_PROFILE}
                component={EditProfile}
                options={{
                    title: "",
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.EDIT_INTEREST}
                component={Interests}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.EDIT_LANGUAGE}
                component={Language}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.EDIT_MY_BASICS}
                component={EditMyBasics}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.EDIT_MORE_ABOUT_ME}
                component={EditMoreAboutMe}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    )
};

export default AppNavigator