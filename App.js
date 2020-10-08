import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const App: () => React$Node = () => {
  const [avatar, setAvatar] = useState();

  function callback(data) {
    if(data.didCancel) {
      return;
    }

    if(data.error) {
      return;
    }

    if(!data.uri) {
      return;
    }

    setAvatar(data)
  }

  async function upload() {
    const data = new FormData();

    data.append('avatar', {
      fileName: avatar.fileName,
      uri: avatar.uri,
      type: avatar.type
    });

    await axios.post('http://localhost:3333/files', data);
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ 
          uri: avatar ? avatar.uri : 'https://image.shutterstock.com/image-vector/user-avatar-icon-sign-profile-260nw-1145752283.jpg'
        }} 
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.button} onPress={() => ImagePicker.launchImageLibrary({}, callback)}>
        <Text style={styles.buttonText}>
          Escolher imagem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => upload()}>
        <Text style={styles.buttonText}>
          Enviar imagem
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7159c1',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  }, 
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});
export default App;
