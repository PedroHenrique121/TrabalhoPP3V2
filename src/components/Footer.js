import { View, TouchableOpacity, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Footer({ navigation, current }) {

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        backgroundColor: '#fff',
        height: 70,

        borderTopWidth: 1,
        borderTopColor: '#ddd',

        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >

      {/* HOME */}
     <TouchableOpacity
  onPress={() => navigation.navigate('ConversaoScreen')}
  style={{ alignItems: 'center' }}
>
        <AntDesign
          name="home"
          size={24}
          color={current === 'Home' ? '#2F6FDB' : '#777'}
        />

        <Text
          style={{
            color: current === 'Home' ? '#2F6FDB' : '#777'
          }}
        >
          Início
        </Text>
      </TouchableOpacity>

      {/* FAVORITOS */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Favoritos')}
        style={{ alignItems: 'center' }}
      >
        <AntDesign
          name="heart"
          size={24}
          color={current === 'Favoritos' ? '#2F6FDB' : '#777'}
        />

        <Text
          style={{
            color: current === 'Favoritos' ? '#2F6FDB' : '#777'
          }}
        >
          Favoritos
        </Text>
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Perfil')}
        style={{ alignItems: 'center' }}
      >
        <AntDesign
          name="user"
          size={24}
          color={current === 'Perfil' ? '#2F6FDB' : '#777'}
        />

        <Text
          style={{
            color: current === 'Perfil' ? '#2F6FDB' : '#777'
          }}
        >
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}