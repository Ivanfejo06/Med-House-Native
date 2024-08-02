import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/Start/StartScreen';
import LoginScreen from './screens/Start/Login/LoginScreen';
import ForgotPasswordScreen from './screens/Start/Login/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/Start/Login/ResetPasswordScreen';
import RegisterNameScreen from './screens/Start/Register/RegisterNameScreen';
import RegisterPasswordScreen from './screens/Start/Register/RegisterPasswordScreen';
import RegisterDNIScreen from './screens/Start/Register/RegisterDNIScreen';
import RegisterPhotoScreen from './screens/Start/Register/RegisterPhotoScreen';
import HomeScreen from './screens/Home/HomeScreen'; // Importa la pantalla Home

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }} // Ocultar el encabezado en todas las pantallas
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="RegisterName" component={RegisterNameScreen} />
        <Stack.Screen name="RegisterPassword" component={RegisterPasswordScreen} />
        <Stack.Screen name="RegisterDNI" component={RegisterDNIScreen} />
        <Stack.Screen name="RegisterPhoto" component={RegisterPhotoScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;