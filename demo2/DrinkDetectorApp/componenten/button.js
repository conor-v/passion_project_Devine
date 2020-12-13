import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text} from 'react-native';

export default function FlatButton({ text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: "#474747",
    borderWidth: 1,
    width: 200
  },
  buttonText: {
    color: "#474747",
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
  },
})