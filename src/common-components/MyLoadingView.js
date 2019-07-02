import {Text, View, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native"
import React from "react"

const MyLoadingView = props => {
    return (
        <View style={{
            width:'100%',
            height:'100%',
            justifyContent: 'center',
            alignItems:'center',
            position: 'absolute',
            backgroundColor: 'rgba(52, 52, 52, 0.25)'}}>

            <ActivityIndicator color="black" size="large"/>

        </View>
    )
};


export default MyLoadingView;