import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS_NAME } from './ScreensName';
import Login from '../screens/Login'
import LoginPhNumber from '../screens/LoginPhNumber';
import ScreenOtp from '../screens/ScreenOtp';
import Location from "../screens/Location";
import UserName from "../screens/UserName";
import SelectGender from "../screens/SelectGender";
import SelectDob from "../screens/SelectDob";
import SelectHeight from "../screens/SelectHeight";
import Language from "../screens/Language";
import Interests from "../screens/Interests";
import Religion from "../screens/Religion";
import HandleImages from "../screens/UploadImages";
import CongratsPage from "../screens/Congratspage";
import CoffeeDating from '../screens/CoffeeDating'
import MovieDating from '../screens/MovieDating';
import RestaurantDating from '../screens/RestaurantDating';
import LunchDating from '../screens/LunchDating';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            // initialRouteName={SCREENS_NAME.LOGIN}
            screenOptions={{
                headerShown: false,
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name={SCREENS_NAME.LOGIN} component={Login} />
            <Stack.Screen
                name={SCREENS_NAME.LOGINPAGE}
                component={LoginPhNumber}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.OTPPAGE}
                component={ScreenOtp}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.LOCATION}
                component={Location}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.USERNAME}
                component={UserName}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.GENDERPAGE}
                component={SelectGender}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.DOBPAGE}
                component={SelectDob}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.HEIGHTPAGE}
                component={SelectHeight}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.LANGUAGEPAGE}
                component={Language}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.INTERESTSPAGE}
                component={Interests}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.RELIGIONPAGE}
                component={Religion}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.IMAGESSCREEN}
                component={HandleImages}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.CONGRATSPAGE}
                component={CongratsPage}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.COFFEE_DATING}
                component={CoffeeDating}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.MOVIE_DATING}
                component={MovieDating}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
             <Stack.Screen
                name={SCREENS_NAME.RESTAURANT_DATING}
                component={RestaurantDating}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name={SCREENS_NAME.LUNCH_DATING}
                component={LunchDating}
                options={{
                    title: "",
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    )
};
//MovieDating

export default AuthNavigator