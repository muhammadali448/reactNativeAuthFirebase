import React, { Component } from 'react';
import Input from './Input';
import Card from './card';
import CardSection from './cardSection';
import firebase from 'firebase';
import Button from './Button';
import { Text } from 'react-native';
import Spinner from './Spinner';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onPressButton() {

        this.setState({ error: '', loading: true });

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(
            email,
            password
        ).then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
                .catch(() => {
                    this.setState({ error: 'Authenticatiion failed', loading: false });
                })
        })
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }
        return (
            <Button onPress={this.onPressButton.bind(this)}
            >Login</Button>
        )
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'johny@email.com'}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        placeholder={'Password'}
                        label={'Password'}
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </CardSection>

                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorText: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    }
}

export default LoginForm;