// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

import { useState, useEffect } from 'react';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet, Text, View, Alert } from 'react-native';

// import Firestore
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { initializeApp, firebaseConfig } from 'firebase/app';

// Netinfo 
import { useNetInfo } from "@react-native-community/netinfo";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"])
LogBox.ignoreAllLogs();



const App = () => {

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  const firebaseConfig = {
    apiKey: "AIzaSyAs8ICmZ_JP-5QWwzcCx3_DibNEdFHIwss",
    authDomain: "chat-app-2347c.firebaseapp.com",
    projectId: "chat-app-2347c",
    storageBucket: "chat-app-2347c.appspot.com",
    messagingSenderId: "811477904906",
    appId: "1:811477904906:web:3db246b7cdcfefbfc6b9f3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app)

  // Create the navigator
  const Stack = createNativeStackNavigator();



  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


