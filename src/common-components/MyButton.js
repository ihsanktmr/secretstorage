import {TouchableOpacity, Text, StyleSheet, Dimensions, View} from "react-native"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyButton = props => {
    return (
        <View style={{opacity: props.myButtonOpacity}}>
            <TouchableOpacity onPress={props.onClickMyButton}
                              style={{
                                  alignItems: props.myButtonAlignItems,
                                  justifyContent: 'center',
                                  backgroundColor: props.buttonBackgroundColor,
                                  flex: props.myButtonFlex,
                                  width: props.myButtonWidth,
                                  height: props.myButtonHeight,
                                  borderColor: props.myButtonBorderColor,
                                  borderWidth: props.myButtonBorderWidth,
                                  borderRadius: props.myButtonBorderRadius,
                                  margin: props.myButtonMargin,
                                  paddingHorizontal: props.myButtonPadHorizontal,
                              }}
                              disabled={props.isMyButtonDisabled}>
                {props.willThereIcon
                    ?
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 17.51}}>
                            <Ionicons name={props.myButtonIconName} size={20} color={props.myButtonIconColor}/>
                        </View>
                        <Text style={{color: props.buttonTextColor, marginLeft: 5}}> {props.myButtonText} </Text>
                    </View>
                    :
                    <Text style={{
                        color: props.buttonTextColor,
                        fontSize: props.buttonTextFontSize
                    }}> {props.myButtonText} </Text>
                }

            </TouchableOpacity>
        </View>
    )
};

export default MyButton;