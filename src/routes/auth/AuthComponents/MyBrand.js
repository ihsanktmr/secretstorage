import {Image, View, StyleSheet, Dimensions} from "react-native"
import React from "react"
let windowWidth = Dimensions.get('window').width;

const MyBrand = props => {
    return (
       <Image source={require('./secretstorage.png')}
              style={{width: windowWidth/1.2, height: 50}}>

       </Image>
    )
};


export default MyBrand;