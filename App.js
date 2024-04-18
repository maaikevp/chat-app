// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

// import Firestore
import { getFirestore } from "firebase/firestore";
import { initializeApp, firebaseConfig } from 'firebase/app';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"])

LogBox.ignoreAllLogs();


const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAs8ICmZ_JP-5QWwzcCx3_DibNEdFHIwss",
    authDomain: "chat-app-2347c.firebaseapp.com",
    projectId: "chat-app-2347c",
    storageBucket: "chat-app-2347c.appspot.com",
    messagingSenderId: "811477904906",
    appId: "1:811477904906:web:3db246b7cdcfefbfc6b9f3"
  };

  // const firebaseConfig = {
  //   apiKey: process.env.EXPO_PUBLIC_API_KEY,
  //   authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  //   projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  //   storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  //   messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  //   appId: process.env.EXPO_PUBLIC_APP_ID,
  // };

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
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


