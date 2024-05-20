
import React, {useState} from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    View,
    FlatList,
    Image,
} from 'react-native';

export const NewsList = (props) => {
    const {
        newsList,
        onPressLike
    } = props;


    const _renderItem = ({item}) => {
        return (
            <ListItem 
            item={item}
            onPressLike={onPressLike}
             />
        )
    }

    const _keyExtractor = (item, index) => item.uniqueId;

    return (
        <View>
            <FlatList
                data={newsList}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        </View>
    )
};

const ListItem = ({item, onPressLike}) => {
    return (
        <View style={[styles.card, styles.row]}>
            <Image source={{uri: item.urlToImage}} style={styles.image}/>
            <View style={{flex: 1}}>
                <Text style={styles.description}>{item.title}</Text>
                <View style={[styles.bottom, styles.row]}>
                    <View>
                        <Text style={styles.grayText}>{item.author}</Text>
                        <Text style={styles.grayText}>{new Date(item.publishedAt).toDateString()}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPressLike(item)} style={{paddingHorizontal: 15, }}>
                        { item.isFavourite ?
                            <Image source={require('../assets/Like1.png')} style={{height: 25, width: 25}}/>
                            :
                            <Image source={require('../assets/Like0.png')} style={{height: 25, width: 25}}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const Loader = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
    </View>
);

const styles = StyleSheet.create({
    card: {
        borderColor: '#ccc',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 6,
        backgroundColor:'#fff',
        borderRadius: 8,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    button: {
        padding: 20,
        backgroundColor: '#ddd'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    grayText: {
        color: "#444",
        fontSize: 12,
        fontStyle: 'normal',
    },
    description: {
        color: "#000",
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        marginTop: 10,
    },
    image: {
        height: '100%',
        width: '30%',
        borderRadius: 5,
        marginRight: 10
    },
    row: {
        flexDirection: 'row',
         justifyContent: 'space-between'
    },
    bottom: {
        paddingTop: 15,
        alignItems: 'center'
    },
    bulletText: {
        color: "#333",
        fontSize: 5,
        fontStyle: 'normal',
    }
});
