import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";

import loginScreen from '../screens/loginScreen';
import ConvercaoScreen from '../screens/ConvercaoScreen';
import CadastroScreen from '../screens/CadastroScreen';
import AlterarSenhaScreen from '../screens/AlterarSenhaScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import PerfilScreen from '../screens/PerfilScreen'; // ✅ IMPORT ADICIONADO

const Stack = createNativeStackNavigator();

// 🔥 Firebase fora do componente (CORRETO)
const firebaseConfig = {
  apiKey: "AIzaSyCvO6h7AYDr89-KdD0ryZx7rpPsMP6E6OE",
  authDomain: "projetoviagem-61fe3.firebaseapp.com",
  projectId: "projetoviagem-61fe3",
  storageBucket: "projetoviagem-61fe3.appspot.com",
  messagingSenderId: "870123404968",
  appId: "1:870123404968:web:b53b9fb1a34ad6ec574c9d",
  measurementId: "G-Y47P5PRJZE"
};

initializeApp(firebaseConfig);

function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="login">

        <Stack.Screen
          name="login"
          component={loginScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Convercao"
          component={ConvercaoScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AlterarSenhaScreen"
          component={AlterarSenhaScreen}
          options={{
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: '#283f4e',
            headerStyle: { backgroundColor: '#d9ebff' }
          }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: '#283f4e',
            headerStyle: { backgroundColor: '#d9ebff' }
          }}
        />

        <Stack.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{
            title: 'Favoritos',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2F6FDB'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />

        
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            title: 'Perfil',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2F6FDB'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;