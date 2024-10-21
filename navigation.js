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
import HomeScreen from './screens/Home/HomeScreen'; 
import BolsaScreen from './screens/Home/BolsaScreen';
import DonacionesScreen from './screens/Home/DonacionesScreen';
import NotificacionesScreen from './screens/Home/NotificacionesScreen';
import ProfileIndex from './screens/Profile/ProfileIndex';
import ProfileScreen from './screens/Profile/ProfileScreen';
import AuthenticationScreen from './screens/Profile/AuthenticationScreen';
import DeseadosScreen from './screens/Home/DeseadosScreen';
import ProductoScreen from './screens/Home/ProductoScreen';
import SearchScreen from './screens/Home/SearchScreen';
import DonateScreen from './screens/Home/DonateScreen'
import RequestScreen from './screens/Home/RequestScreen';
import QRScannerScreen from './screens/Start/QrScannerScreen';
import QrHome from './screens/Start/QrHome';
import SolicitarScreen from './screens/Home/SolicitarScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }}
      >
        {/* LOGIN ROUTES */}
        <Stack.Screen name="Start" component={StartScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterName" component={RegisterNameScreen} />
        <Stack.Screen name="RegisterPassword" component={RegisterPasswordScreen} />
        <Stack.Screen name="RegisterDNI" component={RegisterDNIScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Codigo" component={QRScannerScreen} />
        <Stack.Screen name="QrHome" component={QrHome}/>

        {/* NAVBAR ROUTES */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ gestureEnabled: false, animationEnabled: false }} 
        />
        <Stack.Screen name="Deseados" component={DeseadosScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="Donate" component={DonateScreen}/>
        <Stack.Screen 
          name="Bolsa" 
          component={BolsaScreen} 
          options={{ gestureEnabled: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="Donaciones" 
          component={DonacionesScreen} 
          options={{ gestureEnabled: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="Notificaciones" 
          component={NotificacionesScreen} 
          options={{ gestureEnabled: false, animationEnabled: false }} 
        />
        <Stack.Screen name="Producto" component={ProductoScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="Solicitar" component={SolicitarScreen} />

        {/* SETTINGS ROUTES */}
        <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;