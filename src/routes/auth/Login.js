import React, { Component } from 'react';
import { Text,ImageBackground,ActivityIndicator,KeyboardAvoidingView,Dimensions,StyleSheet,View } from 'react-native';
import {Actions} from 'react-native-router-flux';
import MyBrand from "./AuthComponents/MyBrand";
import MyText from "../../common-components/MyText";
import MyTextInput from "../../common-components/MyTextInput";
import MyButton from "../../common-components/MyButton";
let windowWidth = Dimensions.get('window').width;

export default class Login extends Component<Props> {
    state = {
        emailState: '',
        passwordState: '',
        yeniHesapState: true,
        yeniHesapVeGiris: false,
        sirketMailVeAccessCode: true,
        yeniHesapBgColorControl: '#C2C2C2',
        girisBgColorControl: '#C2C2C2',
        loading:false,
        errorLoging: false,
    };

    loginCheck = () => {
        const url = `http://secretstorage-v1.us-east-2.elasticbeanstalk.com/users/checkemail`;
        this.setState({loading: true});
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": this.state.emailState,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({loading: false});
                if(res.IsEmail){
                    Actions.Calculator({
                        emailState: this.state.emailState
                    })
                }

            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error);
            });
    };

    onChangeUser = text => {
        this.setState({
            emailState: text
        });
    };

    onChangePassword = text => {
        this.setState({
            passwordState: text
        });
    };

    renderGirisButtonIndicator() {
        if (this.state.loading) {
            return <View>
                <ActivityIndicator/>
            </View>
        } else {
            return (
                <View>
                    <MyButton myButtonText={"Enter"}
                              buttonBackgroundColor={'#169BFC'}
                              buttonTextColor={'white'}
                              myButtonWidth={windowWidth / 1.2}
                              myButtonHeight={35}
                              myButtonMargin={2.5}
                              myButtonBorderColor={'#0091FA'}
                              myButtonBorderWidth={1}
                              myButtonBorderRadius={5}
                              myButtonAlignItems={"center"}
                              onClickMyButton={this.loginCheck}
                              willThereIcon={false}/>
                </View>
            );
        }
    }

    renderGiris() {
        return <View style={{
            flex: 7,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
        }}>
            <View>
                <MyTextInput myInputHint={'email@address.com'}
                             myInputIcon={'ios-mail'}
                             myInputValue={this.state.emailState}
                             myOnChangeText={this.onChangeUser.bind(this)}
                />
            </View>
            <Text style={styles.loginFailed}>{this.state.errorLoging}</Text>
            {this.renderGirisButtonIndicator()}

        </View>
    }

    render() {
        let backgroundImage = require("./AuthComponents/background.jpg");
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 80
                }}  behavior="padding" enabled >

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        width:windowWidth,
                        backgroundColor: 'transparent'
                    }}>
                        {

                            this.renderGiris()
                        }
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative'
    },
    loginFailed: {
        color:'grey',
        fontSize: 12,
        margin:5
    }
});

