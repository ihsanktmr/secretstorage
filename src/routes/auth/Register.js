import React, { Component } from 'react';
import { Text,ImageBackground,ActivityIndicator,KeyboardAvoidingView,Dimensions,StyleSheet,View } from 'react-native';
import {Actions} from 'react-native-router-flux';
import MyBrand from "./AuthComponents/MyBrand";
import MyText from "../../common-components/MyText";
import MyTextInput from "../../common-components/MyTextInput";
import MyButton from "../../common-components/MyButton";

let windowWidth = Dimensions.get('window').width;

export default class Register extends Component {
    state = {
        emailState: '',
        passwordState: '',
        nameState: '',
        surnameState: '',
        yeniHesapState: true,
        yeniHesapVeGiris: false,
        sirketMailVeAccessCode: true,
        yeniHesapBgColorControl: '#C2C2C2',
        girisBgColorControl: '#C2C2C2',
        loading:false,
        errorLoging: false,
    };
    serializeKey(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }
    componentDidMount() {

    }
    signUp = () => {
        const url = `http://secretstorage-v1.us-east-2.elasticbeanstalk.com/users/signup`;
        this.setState({loading: true});
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": this.state.emailState,
                "password":this.state.passwordState,
                "name":this.state.nameState,
                "surname": this.state.surnameState
            })
        })
            .then(res => res.json())
            .then(res => {
               console.log(res);
               this.setState({loading: false});
               Actions.Login()
            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error);
            });
    };
    onPressForget = () => {
        Actions.Login();
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
    onChangeName = text => {
        this.setState({
           nameState: text
        });
    };
    onChangeSurname = text => {
        this.setState({
            surnameState: text
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
                    <MyButton myButtonText={"Register"}
                              buttonBackgroundColor={'#169BFC'}
                              buttonTextColor={'white'}
                              myButtonWidth={windowWidth / 1.2}
                              myButtonHeight={35}
                              myButtonMargin={2.5}
                              myButtonBorderColor={'#0091FA'}
                              myButtonBorderWidth={1}
                              myButtonBorderRadius={5}
                              myButtonAlignItems={"center"}
                              onClickMyButton={this.signUp}
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
                <MyTextInput myInputHint={'* email@address.com'}
                             myInputIcon={'ios-mail'}
                             myInputValue={this.state.emailState}
                             myOnChangeText={this.onChangeUser.bind(this)}
                />
                <MyTextInput myInputHint={'* password'}
                             myInputIcon={'md-key'}
                             myInputValue={this.state.passwordState}
                             mySecureTextEntry={true}
                             myOnChangeText={this.onChangePassword.bind(this)}/>
                <MyTextInput myInputHint={'name'}
                             myInputIcon={'md-umbrella'}
                             myInputValue={this.state.nameState}
                             myOnChangeText={this.onChangeName.bind(this)}
                />
                <MyTextInput myInputHint={'surname'}
                             myInputIcon={'md-ribbon'}
                             myInputValue={this.state.surnameState}
                             myOnChangeText={this.onChangeSurname.bind(this)}
                />

            </View>
            <Text style={styles.loginFailed}>{this.state.errorLoging}</Text>
            {this.renderGirisButtonIndicator()}
            <MyText myText={"Do you already have account ?"}
                    myTextColor={'#0091FA'}
                    myTextFontSize={12}
                    onClickText={this.onPressForget.bind(this)}/>

        </View>
    }


    renderMyBrand() {
        return <View style={{marginBottom: 50}}>
            <MyBrand/>
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
                    {
                        this.renderMyBrand()
                    }
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 350,
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
