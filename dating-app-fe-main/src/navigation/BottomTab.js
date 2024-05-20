import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CheerSVG from '../assets/cheers.svg';
import {COLORS} from '../common/Colors';

export const BottomTabComponent = ({data, wrapperStyle}) => {
  const Tab = createBottomTabNavigator();
  const tabs = data.map(item => {
    const options = {
      // tabBarIcon: ({ focused }) => {
      //     // const Unselected = item.unselectedTabIcon;
      //     // const Selected = item.selectedTabIcon;
      //     return focused ? item.selectedTabIcon : item.unselectedTabIcon;
      // },
      headerShown: false,
      selectedTabIcon: item.selectedTabIcon,
      unselectedTabIcon: item.unselectedTabIcon,
    };
    return (
      <Tab.Screen
        name={item.title}
        component={item.PageComponent}
        key={item.name}
        options={options}
      />
    );
  });

  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      {tabs}
    </Tab.Navigator>
  );
};

function MyTabBar(props) {
  const {state, descriptors, navigation} = props;
  return (
    //   <View style={styles.tabContainer}>
    <View style={styles.subTabcontainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={Math.random().toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            //onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            {isFocused ? options.selectedTabIcon : options.unselectedTabIcon}
            <Text
              style={{
                color: isFocused
                  ? COLORS.SELECTED_TAB_COLOR
                  : COLORS.UNSELECTED_TAB_COLOR,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    marginBottom: '5%',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  tabBarIconStyle: {
    marginTop: '5%',
  },
  subTabcontainer: {
    backgroundColor: COLORS.WHITE,
    //borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 15,
    // height: 50,
    // marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  tabContainer: {
    backgroundColor: COLORS.WHITE,
  },
});
