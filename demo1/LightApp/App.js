import React, {Component} from 'react';
import {StyleSheet, Text, View, NativeModules, Button} from 'react-native';

export default class App extends Component{
  constructor(props) {  
    super(props);  
    this.state = { isOn: false };  
    this.updateStatus();
  }
  
  turnOn = () => {  
    NativeModules.Bulb.turnOn();  
    this.updateStatus()
  }
  
  turnOff = () => {  
    NativeModules.Bulb.turnOff();  
    this.updateStatus()
  }

  updateStatus = () => {  
    NativeModules.Bulb.getStatus( 
      (error, isOn)=>{  
        this.setState({ isOn: isOn});
      }
    )
  }

  render() {
    return (
      <View style={this.state.isOn ? styles.light: styles.dark}>
        <Text style={this.state.isOn ? styles.lightT: styles.darkT}>Welcome to Light App!!</Text>
        <Text style={this.state.isOn ? styles.lightT: styles.darkT}> Bulb is {this.state.isOn ? "ON": "OFF"}</Text>
        {
          !this.state.isOn ? 
          <Button 
            onPress={this.turnOn}
            title="Turn ON "
            color="#FF6347"
          />
          :
          <Button 
            onPress={this.turnOff}
            title="Turn OFF "
            color="#FF6347"
          /> 
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  light: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  dark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  darkT: {
    color: '#F5FCFF',
  },
  lightT: {
    color: '#000',
  },
});