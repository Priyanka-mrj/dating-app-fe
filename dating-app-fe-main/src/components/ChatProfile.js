import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../common/CommonStyles';

const ChatsProfile = ({ chatdetails, onPress, save, call,
    bottom, chats, handleClick }) => {
    return (
        <View style={{ right: -140, width: 400, marginTop: 300, }}>
            {chatdetails.map((chat, index) => {
                const currentTime = new Date();
                let hours = currentTime.getHours();
                const minutes = currentTime.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;

                return (
                    <View key={index} style={{ marginBottom: bottom ? bottom : -40, marginRight: -65 }}>
                        {chats ? (
                            <TouchableOpacity onPress={() => onPress(chat)}>
                                <View style={styles.viewimage}>
                                    <Image
                                        source={require('../assets/profileImage.jpeg')}
                                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                    />
                                </View>
                                <Text style={styles.text3}>{chat.name}</Text>
                                <Text style={styles.text4}>{chat.message}</Text>
                                <>
                                    <Text style={styles.text5}>{`${hours}:${minutes} ${ampm}`}</Text>
                                    <View style={styles.view2}>
                                        <Text style={styles.text6}>{chat.notexts}</Text>
                                    </View>
                                </>
                            </TouchableOpacity>
                        ) : (
                            <>
                                <View style={styles.viewimage}>
                                    <Image
                                        source={require('../assets/profileImage.jpeg')}
                                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                    />
                                </View>
                                <Text style={styles.text3}>{chat.name}</Text>
                                <Text style={styles.text4}>{chat.message}</Text>
                                {save ? (
                                    <TouchableOpacity onPress={handleClick}>
                                        <View style={styles.logoutButton}>
                                            <Text style={styles.buttonText1}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={{ bottom: 270, left: 180 }}>
                                        <TouchableOpacity onPress={handleClick}>
                                            <Image
                                                source={require('../assets/Call.png')}
                                                style={{ width: 20, height: 20, resizeMode: 'cover' }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

export default ChatsProfile;

