import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator'
import { navigationRef } from './NavigationService';

const Route = (props) =>{
    return (
        <NavigationContainer ref={navigationRef}>
            {props.isLoggedIn ? <AppNavigator {...props}/> : <AuthNavigator />}
        </NavigationContainer>
    )
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn,
        //isLoggedIn: false
    };
};

export const AppRoute = connect(mapStateToProps, null)(Route);