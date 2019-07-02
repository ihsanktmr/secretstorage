import React from 'react';
import {View, StatusBar, Dimensions, TouchableOpacity, StyleSheet, Text} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const Header = props => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content"/>
            {
                props.headerLeftButtonExist
                    ?
                    <TouchableOpacity style={{}} onPress={props.headerLeftButtonClick}>
                        <View>
                            <Icon name={props.headerLeftIconName} size={props.headerLeftIconSize} color={'#fff'}/>
                        </View>
                    </TouchableOpacity>
                    :
                    null
            }
            <Text style={{
                marginLeft:25,
                flex: 1,
                color: 'white',
                textAlign: 'center',
            }}> {props.headerBaslik} </Text>
            {
                props.headerRightButtonExist
                    ?
                    <TouchableOpacity style={{}} onPress={props.headerRightButtonClick}>
                        <View>
                            <Ionicons name={props.headerRightIconName} size={props.headerRightIconSize} color={'#fff'}/>
                        </View>
                    </TouchableOpacity>
                    :
                    null
            }

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth,
        height: 56.5,
        backgroundColor: '#04A5F5',
    }
});