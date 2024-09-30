import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from './navigation';
import Logo from './assets/LogoInverted';
import store from './store/store'; // Asegúrate de ajustar la ruta
import { name as appName } from './app.json'; // Asegúrate de que este archivo existe y tiene el nombre correcto

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(async () => {
        await SplashScreen.hideAsync();
      });
    }
  }, [appIsReady]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Logo style={styles.logo} />
        </Animated.View>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

// Registra el componente principal de la aplicación
AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 100, // Ajusta el tamaño del logo según sea necesario
    height: 100,
  },
});

export default App;