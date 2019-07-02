import React, {Component} from 'react';
import {
    Text,
    FlatList,
    Image,
    Dimensions,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator
} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import {RNS3} from 'react-native-aws3';
import {aws} from '../keys';
import {Actions} from "react-native-router-flux";
import MyLoadingView from "../common-components/MyLoadingView";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width / 3.4;
let deviceHeight = Dimensions.get('window').height / 3.2;

const options = {
    title: 'Choose picture',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
// Prepare Blob support
//const Blob = RNFetchBlob.polyfill.Blob;
//const fs = RNFetchBlob.fs;
//window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
//window.Blob = Blob;


export default class Storage extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.getPhotos()
    }

    state = {
        _id: '',
        baslik: 'My Storage',
        imagePost: '',
        imageLoading: false,
        isImageSelected: false,
        photos: []
    };


    getPhotos = () => {
        const url = `http://secretstorage-v1.us-east-2.elasticbeanstalk.com/users/storage`;
        this.setState({loading: true});
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "_id": this.props._id,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({photos: res.photos,loading: false})
            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error);
            });
    };

    addPhoto = (photo) => {
        const url = `http://secretstorage-v1.us-east-2.elasticbeanstalk.com/users/add/${this.props._id}`;
        this.setState({loading: true});
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "photo": photo,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    photos: res.photos
                });
                this.forceUpdate();
            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error);
            });
    };

    imagePickerFunc() {       //don't forget to add permit to info.plist
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePickerd Error: ', response.error);
            } else {
                this.setState({
                    loading: true
                });
                // let source = {uri: response.uri};
                //console.log(source)
                const file = {
                    uri: response.uri,
                    name: response.fileName,
                    type: 'image/png',
                };
                const config = {
                    keyPrefix: 's3/',
                    bucket: 'secretstorage-v1',
                    region: 'us-east-1',  //us east 1 is N.Virginia
                    accessKey: 'AKIAIEX2CP3ECVB3NDSA',
                    secretKey: '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',
                    successActionStatus: 201

                };
                RNS3.put(file, config).then((response) => {
                    console.log(response.body.postResponse.location);
                    this.addPhoto(response.body.postResponse.location);
                })
            }
        });
    }

    render() {

        const {elements} = this.state;
        return (

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 6}}>
                    <FlatList
                        extraData={elements}
                        data={this.state.photos}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <TouchableWithoutFeedback onPress={() => console.log('picture itself')}>
                                <View style={styles.viewContainerGridIos}>
                                    <ImageBackground

                                        style={styles.imagebackground}
                                    >
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                        }}>

                                            <Image style={styles.gridImage}
                                                   source={{uri: item}}
                                            />
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                        numColumns={3}
                        
                    />
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={{
                            borderColor: 'black',
                            padding: 10,
                            borderWidth: 5,
                            borderRadius: 30,
                            left: 100,
                            bottom: 30
                        }}
                        onPress={() => this.imagePickerFunc()}
                    >
                        <View>
                            <Icon name={"plus"} size={25} color={'#000000'}/>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.loading
                    ? <MyLoadingView/> : null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flatview: {
        justifyContent: 'center',
        borderRadius: 2,
    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 18
    },
    viewContainerGridIos: {
        height: 150,
        width: windowWidth / 3.5,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 10,
        borderWidth: 0,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    imagebackground: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white'
    },
    gridImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

});