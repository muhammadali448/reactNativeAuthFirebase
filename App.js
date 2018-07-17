import React from 'react';
import { AppRegistry, View } from 'react-native';
import HeaderTour from './src/components/header';
import LoginForm from './src/components/loginForm';
import firebase from 'firebase';
import Button from './src/components/Button';
import Spinner from './src/components/Spinner';

export default class App extends React.Component {

  state = {
    isLoggedIn: null
  }


  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCd3tUUqfI0DS53mXdnJP_uWO2p7nEOWGc",
      authDomain: "touristapp-21817.firebaseapp.com",
      databaseURL: "https://touristapp-21817.firebaseio.com",
      projectId: "touristapp-21817",
      storageBucket: "touristapp-21817.appspot.com",
      messagingSenderId: "12089657674"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true })
      }
      else {
        this.setState({ isLoggedIn: false })
      }
    })
  }

  renderContent() {

    switch (this.state.isLoggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}
          >Logout</Button>
        );
      case false:
        return <LoginForm />
      default:
      return (
        <View style={styles.container}>
          <Spinner />
        </View>
        )
    }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderTour headerText={'Tourist Guide'} />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  }
}

AppRegistry.registerComponent('touristappfirebase', () => App);