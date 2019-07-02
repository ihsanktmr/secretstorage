import {Text, View, StyleSheet, Dimensions} from "react-native"
import React from "react"
let windowWidth = Dimensions.get('window').width;

const Or = () => {
    return(
        <View style={styles.orMainViewStyle}>
            <View style={styles.lineViewStyle}/>
            <Text style={styles.orLineTextStyle}> or </Text>
            <View style={styles.lineViewStyle}/>
        </View>
    )
};

const styles = StyleSheet.create({
    orMainViewStyle: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        margin:10,
        marginHorizontal:15
    },
    lineViewStyle: {
        height:0.5,
        width:130,
        backgroundColor: '#6B6A6A'
    },
    orLineTextStyle: {
        color:'#6B6A6A'
    }
});

export default Or;