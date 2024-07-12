import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleBackToHome = () => {
    setShowCamera(false);
  };

  return (
    <View style={styles.container}>
      {!showCamera ? (
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity style={[styles.button, styles.readButton, ]} onPress={handleOpenCamera}>
            <Text style={styles.text}>Ler os</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.readButton]} onPress={() => alert('Sair')}>
            <Text style={styles.text}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBackToHome}>
                <Text style={styles.text}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e44ad', // Cor de fundo roxa
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db', // Cor de fundo azul
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  readButton: {
    marginTop: 50,
  },
  exitButton: {
    marginBottom: 50,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  backButton: {
    backgroundColor: '#e74c3c', // Cor de fundo vermelha para botão de voltar
  },
});
