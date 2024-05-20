import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styles from '../common/CommonStyles';

const HomeBar = ({ handleButtonNavigation, datespageNavigation, chatspageNavigation, profilepageNavigation, style }) => {
    return (
        <View style={[styles.rectangleBox1, style]}>
            <TouchableOpacity onPress={handleButtonNavigation}>
                <View>
                    <Image
                        source={require("../assets/cheersicon.png")}
                        style={{ width: 22, height: 22, marginRight: 250, marginTop: 13 }}
                    />
                    <Text style={{ marginLeft: 3, fontWeight: 500, fontSize: 6, color: '#ED2552' }}
                    >
                        Home
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={datespageNavigation}>
                <View>
                    <Image
                        source={require("../assets/datesicon.png")}
                        style={{ width: 22, height: 22, marginRight: 90, marginTop: -30, tintColor: '#000000' }}
                    />
                    <Text style={{ marginLeft: 3, marginBottom: -10, fontWeight: 500, fontSize: 6, color: '#000000' }}
                    >
                        Dates
                    </Text>
                    <View style={styles.circle2}>
                        <Text style={{ fontWeight: 500, fontSize: 6, color: '#FFFFFF' }}
                        >
                            2
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={chatspageNavigation}>
                <View>
                    <Image
                        source={require("../assets/ChatIcon.png")}
                        style={{ width: 22, height: 22, marginLeft: 80, marginTop: -30, tintColor: '#000000' }}
                    />
                    <Text style={{ marginLeft: 82, marginBottom: -10, fontWeight: 500, fontSize: 6, color: '#000000' }}
                    >
                        Chat
                    </Text>
                    <View style={styles.circle}>
                        <Text style={{ fontWeight: 500, fontSize: 6, color: '#FFFFFF' }}
                        >
                            2
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={profilepageNavigation}>
                <View>
                    <Image
                        source={require("../assets/about.png")}
                        style={{ width: 20, height: 22, marginLeft: 240, marginTop: -30, tintColor: '#000000' }}
                    />
                    <Text style={{ marginLeft: 241, marginBottom: -10, fontWeight: 500, fontSize: 6, color: '#000000' }}
                    >
                        Profile
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default HomeBar;