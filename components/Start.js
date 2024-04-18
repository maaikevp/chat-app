import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";


const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const image = require('../images/Background-image.png');

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { name: name, background: background, userID: result.user.uid });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImage} resizeMode="cover">
        <Text style={styles.appTitle}>Welcome to Chat!</Text>
        <View style={styles.box}>
          {/* Type username here */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
            accessible={true}
            accessibilityLabel="Type username"
            accessibilityHint="Input username needed"
          />
          {/* Choose backgroundcolor from 4 options */}
          <Text style={styles.chooseBackgroundColor}>Choose a background color:</Text>
          <View style={styles.colorButtonsBox}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorButton, { backgroundColor: color }, background === color && styles.selected]}
                onPress={() => setBackground(color)}
                accessible={true}
                accessibilityLabel="Choose background color"
                accessibilityHint="Input background color needed"
              />
            ))}
          </View>
          {/* Button to confirm username and move over to chatscreen */}
          <TouchableOpacity style={styles.button} onPress={signInUser}
            accessible={true}
            accessibilityLabel="Button to enter chat-app"
            accessibilityHint="Enter the chat-app">
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
    margin: 20
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 10,
    width: '88%',
    height: '44%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    width: '88%',
    opacity: 50,
    padding: 15,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#757083'
  },
  chooseBackgroundColor: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorButtonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5
  },
  selected: {
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#757083',
    width: '88%',
    padding: 5,
    margin: 3
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff'
  }
});

export default Start;