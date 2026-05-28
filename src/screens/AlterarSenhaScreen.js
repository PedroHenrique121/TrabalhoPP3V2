import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';

import { getAuth, updatePassword, onAuthStateChanged } from 'firebase/auth';

export default function AlterarSenhaScreen() {

  const auth = getAuth();

  const [novaSenha, setNovaSenha] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return unsub;
  }, []);

  async function alterarSenha() {
    try {

      if (!auth.currentUser) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      if (!novaSenha || novaSenha.length < 6) {
        Alert.alert('Erro', 'Senha deve ter no mínimo 6 caracteres');
        return;
      }

      await updatePassword(auth.currentUser, novaSenha);

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setNovaSenha('');

    } catch (error) {
      console.log(error);

      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Sessão expirada',
          'Faça login novamente para alterar a senha.'
        );
      } else {
        Alert.alert('Erro', error.message);
      }
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2F6FDB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      {/* FOTO */}
      <Image
        style={styles.image}
        source={{
          uri: user?.photoURL || 'https://i.pravatar.cc/300'
        }}
      />

      {/* NOME */}
      <Text style={styles.title}>
        {user?.displayName || 'Usuário'}
      </Text>

      {/* EMAIL */}
      <Text style={styles.title2}>
        {user?.email || ''}
      </Text>

      {/* INPUT SENHA */}
      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.button}
        onPress={alterarSenha}
      >
        <Text style={styles.buttonText}>
          Alterar senha
        </Text>
      </TouchableOpacity>

    </View>
  );
}

/* ===================== */
/*         CSS           */
/* ===================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 65
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#09245c'
  },

  title2: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#091c5c'
  },

  input: {
    backgroundColor: '#dedede',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#171f35',
    borderWidth: 1,
  },

  button: {
    backgroundColor: '#2F6FDB',
    padding: 12,
    marginTop: 30,
    borderRadius: 8
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }

});