import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

export default function PerfilScreen({ navigation }) {

  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u?.photoURL) setPhoto(u.photoURL);
    });

    return unsub;
  }, []);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão negada');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);

      await updateProfile(auth.currentUser, {
        photoURL: uri
      });
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão da câmera negada');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);

      await updateProfile(auth.currentUser, {
        photoURL: uri
      });
    }
  }

  return (
    <ScrollView style={styles.container}>

    
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

    
      <View style={styles.card}>

        <Image
          source={{ uri: photo || 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user?.displayName || 'Usuário'}
        </Text>

        <Text style={styles.email}>
          {user?.email || 'sem email'}
        </Text>

      </View>


      <View style={styles.options}>


        <TouchableOpacity style={styles.option} onPress={pickImage}>
          <AntDesign name="picture" size={20} color="#2F6FDB" />
          <Text style={styles.optionText}>Alterar Foto</Text>
        </TouchableOpacity>

   
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AlterarSenhaScreen')}
        >
          <AntDesign name="lock" size={20} color="#2F6FDB" />
          <Text style={styles.optionText}>Alterar Senha</Text>
        </TouchableOpacity>

        
       

      </View>

    </ScrollView>
  );
}

/* ===================== */
/*        CSS            */
/* ===================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },

  header: {
    backgroundColor: '#2F6FDB',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  email: {
    color: 'gray',
    marginTop: 4,
  },

  options: {
    marginHorizontal: 20,
    marginTop: 10,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  optionText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },

});