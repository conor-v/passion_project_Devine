import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  NativeModules,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FlatButton from './componenten/button';
//console.disableYellowBox = true;

const App = () => {
  const [label, setLabel] = useState();
  const [image, setimage] = useState();

  const handleOnPress = () => {
    ImagePicker.openPicker({cropping: true}).then(async (image) => {
      const detectedLabel = await NativeModules.Detector.detect(
        image.sourceURL,
      );
      const imagePath = image.path;
      setLabel(detectedLabel);
      setimage(imagePath);
    });
  };

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}> What am I drinking?</Text>
        <Image source={{uri: image}} style={styles.imageContainer} />
        {!label ? (
          <Text style={styles.text}>
            We are sure {'\n'}
            that you are drinking ...
          </Text>
        ) : (
          <Text style={styles.text}>
            We are sure {'\n'}
            that you are drinking {label}
          </Text>
        )}
        <View style={styles.button}>
          <FlatButton text="SELECT A PHOTO" onPress={handleOnPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FDE9C3',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  scroll: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    color: '#474747',
    paddingVertical: 15,
  },
  imageContainer: {
    width: 350,
    height: 350,
    alignSelf: 'center',
    marginBottom: 25,
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    fontSize: 21,
    fontFamily: 'Georgia',
    color: '#474747',
  },
  button: {
    position: 'absolute',
    bottom: -150,
    alignSelf: 'center',
  },
});

export default App;
