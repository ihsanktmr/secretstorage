import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class Calculator extends Component<Props> {
    constructor() {
        super();
        this.state = {
            resultText: '',
            calculationText: '',
            delControl: false,
            _id: '',
            passwordState: ''
        }
        this.operations = ['DEL', '+', '-', '*', '/']

    }
    onChangePassword = text => {
        this.setState({
            calculationText: text
        });
    };
    componentDidMount(){
        console.log(this.props.emailState)
    }
    login = () => {
        const url = `http://secretstorage-v1.us-east-2.elasticbeanstalk.com/users/login`;
        this.setState({loading: true});
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": this.props.emailState,
                "password": this.state.passwordState
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({loading: false,
                               _id: res._id,
                                delControl: false });
                if(res._id){
                    Actions.Storage({
                        _id: this.state._id,
                        emailState: this.props.emailState
                    })
                }

            })
            .catch(error => {
                this.setState({error, loading: false});
                console.log(error);
            });
    };

    calculateResult() {
        const text = this.state.resultText;
        console.log(text, eval(text));
        this.setState({
            calculationText: eval(text)
        })
    }

    validate() {
        const text = this.state.resultText;
        switch (text.slice(-1)) {
            case'+':
            case'-':
            case'*':
            case'/':
                return false
        }
        return true;
    }

    buttonPressed(text) {
        // console.log(text)

        if (text === '=') {
            return this.validate() && this.calculateResult()
        }

        this.setState({
            resultText: this.state.resultText + text
        })
    }

    operate(operation) {
        switch (operation) {
            case 'DEL':
                console.log(this.state.resultText);
                let text = this.state.resultText.split('');
                text.pop();
                this.setState({
                    resultText: text.join('')
                });
                if(this.state.resultText.toString()===''){
                   this.setState({delControl: true});
                    }
                if(this.state.delControl===true){
                    this.login();
                }
                break;
            case '+':
                this.setState({
                passwordState: this.state.resultText.toString()
            }); break;
            case '-': 
            case '*':
            case '/':
                const lastChar = this.state.resultText.split('').pop();

                if (this.operations.indexOf(lastChar) > 0) return

                if (this.state.text === '') return
                this.setState({
                    resultText: this.state.resultText + operation
                })
        }
    }

    render() {
        let rows = [];
        let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(<TouchableOpacity
                    key={nums[i][j]} //for yellow warning, every chil must have key prop
                    onPress={() => this.buttonPressed(nums[i][j])}
                    style={styles.btn}>
                    <Text style={styles.btntext}>{nums[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View key={i}   //for yellow warning, every chil must have key prop
                            style={styles.row}>{row}</View>)
        }
        let ops = [];
        for (let i = 0; i < 5; i++) {
            ops.push(<TouchableOpacity
                key={this.operations[i]}
                style={styles.btn}
                onPress={() => this.operate(this.operations[i])}>
                <Text style={[styles.btntext, styles.white]}>{this.operations[i]} </Text>
            </TouchableOpacity>);
        }
        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculations}>
                    <Text style={styles.calculationText}> {this.state.calculationText} </Text>

                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    btntext: {
        fontSize: 30,
        color: 'white'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    white: {
        color: 'white'
    },
    result: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    calculations: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-end'

    },
    calculationText: {
        fontSize: 24,
        color: 'black',
    },
    resultText: {
        fontSize: 30,
        color: 'black',
    },
    buttons: {
        flex: 7,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
        backgroundColor: '#434343',
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#646464',

    },

});
