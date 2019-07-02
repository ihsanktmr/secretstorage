import {Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions} from "react-native"
import React from "react"
import Ionicons from 'react-native-vector-icons/Ionicons';


const MyTextInput = props => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 7.5,
        }}>
            <View style={{marginRight: 15}}>
                <Ionicons name={props.myInputIcon} size={20} color={'#000000'}/>
            </View>
            <TextInput style={{
                backgroundColor: 'transparent',
                color: 'black',
                margin: 2.5,
                padding: 10,
                width: 250,
            }}
                       //onChangeText={(text) => this.setState({text})}
                       value={props.myInputValue}
                       placeholder={props.myInputHint}
                       onChangeText={props.myOnChangeText}
                       autoCorrect={false}
                       secureTextEntry={props.mySecureTextEntry}>
            </TextInput>
        </View>
    )
};
export default MyTextInput;