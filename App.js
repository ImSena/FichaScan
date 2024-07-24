import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View, Modal, Image} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  const [isLoading, setIsloading] = useState(false);
  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [open, setOpen] = useState(false)

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }


  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleBackToHome = () => {
    setShowCamera(false);
  };

  const takePicture = async()=>{
    if(camRef){
      setIsloading(true);
      try{
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri)
        setOpen(true);
        console.log(data.uri);
      }catch(error){
        console.error(error);
      }finally{
        setIsloading(false);
      }
      
    }
  }

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
           {
                isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size={'large'} color={"#fff"}/>
                  </View>
                )
              }
          <CameraView style={[styles.camera, styles.containerPhoto]} ref={camRef}>
          </CameraView>
           
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBackToHome}>
                <Text style={styles.text}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonTake]} onPress={takePicture}>
                <Text style={styles.text}>Take a picture</Text>
              </TouchableOpacity>
            </View>
          
        </View>
      )}

      {
        capturedPhoto && (
          <Modal 
            animationType='fade'
            transparent={false}
            visible={open}
          >

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>

              <TouchableOpacity onPress={()=>setOpen(false)} style={styles.backButton}>
                <Text>Fechar</Text>
              </TouchableOpacity>

              <Image style={{width: '100%', height: 300}} source={{uri: capturedPhoto}} />

            </View>

          </Modal>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    zIndex: 2
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPhoto: {
    width: '85%',
    height: '60%',
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center'
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
  buttonTake:{
    backgroundColor: '#04bd6c',
  },
});
