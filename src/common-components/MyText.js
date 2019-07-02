import {Text, View,TouchableOpacity, StyleSheet} from "react-native"
import React from "react"

const MyText = props => {
    return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center',alignItems:'center',}}
                          onPress={props.onClickText}>
            <Text style={{ //text align vertical sadece android'de varmış
                color: props.myTextColor,
                textAlign: 'center',
                fontWeight: props.myTextFontWeight,
                fontSize: props.myTextFontSize,
                marginLeft: props.myTextMarginLeft,
                marginRight: props.myTextMarginRight,
                marginTop: props.myTextMarginTop,
            }}>
                {props.myText}
            </Text>
        </TouchableOpacity>
    )
};


export default MyText;