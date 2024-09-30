import React, { useState, useEffect } from "react";
import { Camera, CameraView } from "expo-camera";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Overlay from "./Overlay"; // Importa correctamente el Overlay

const QrScannerScreen = () => {
  const [scannedData, setScannedData] = useState(null);

  const handleBarcodeScanned = ({ data }) => {
    setScannedData(data); // Guardar los datos escaneados en el estado
  };

  useEffect(() => {
    if (scannedData) {
      // Aquí puedes realizar acciones adicionales si es necesario
      console.log("Datos escaneados:", scannedData);
    }
  }, [scannedData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={styles.camera} // Asegúrate de que la cámara ocupe el espacio completo
        cameraType={'back'}
        onBarcodeScanned={handleBarcodeScanned} // Manejo de datos escaneados
        FocusMode={'off'}
      />
      <Overlay />
      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Datos escaneados: {scannedData}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Asegúrate de que SafeAreaView ocupe todo el espacio
  },
  camera: {
    flex: 1, // Asegúrate de que la cámara ocupe el espacio completo
  },
  resultContainer: {
    position: 'absolute',
    bottom: 50, // Espaciado desde la parte inferior
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  resultText: {
    color: 'white', // Color del texto
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semi-transparente
    padding: 10,
    borderRadius: 5,
  },
});

export default QrScannerScreen;