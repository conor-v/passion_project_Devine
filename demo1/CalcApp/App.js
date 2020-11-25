import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  NativeModules,
  View,
  Text,
  StatusBar,
} from 'react-native';

const ObjciveCClass = NativeModules.Calc;

export default class App extends Component{
  constructor(props) {  
    super(props);  
    this.state = { 
      number: 0,
    };  
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text style={styles.welcome}>
            {ObjciveCClass.welcome}
          </Text>

          <TextInput style={styles.input} onChangeText={(text) => this.squareMe(parseInt(text))}/>

          <Text style={styles.result}>
            {this.state.number}
          </Text>
        </SafeAreaView>
      </View>
    );
  };
  squareMe(num) {
    if (num == '' || isNaN(num) ) {
      this.setState({number: 0});
      return;
    }
    ObjciveCClass.squareMe(num, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({number: response});
      }
    })
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  welcome: {
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    width: 150,
    height: 40,
    borderColor: "lightblue",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 30,
  },
  result: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 35,
    color: "red",
  },
});
