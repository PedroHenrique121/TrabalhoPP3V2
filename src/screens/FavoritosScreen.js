import AntDesign from '@expo/vector-icons/AntDesign';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function FavoritosScreen({ route, navigation }) {

  const favorites = route.params?.favorites || [];
  const setFavorites = route.params?.setFavorites;

  function openCountry(country) {
    navigation.navigate('Details', {
      country,
      favorites,
      setFavorites
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6FB' }}>

      {/* HEADER */}
      <View
        style={{
          backgroundColor: '#2F6FDB',
          padding: 20,
          paddingTop: 50,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>

        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 26,
              fontWeight: 'bold'
            }}
          >
            Favoritos
          </Text>

          <Text
            style={{
              color: '#DDE7FF',
              marginTop: 5
            }}
          >
            Seus países favoritos
          </Text>
        </View>

      </View>

      {/* LISTA */}
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100
        }}
      >

        {favorites.length === 0 ? (

          <View
            style={{
              alignItems: 'center',
              marginTop: 80
            }}
          >

            <AntDesign
              name="hearto"
              size={70}
              color="#B0B0B0"
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 18,
                color: '#666'
              }}
            >
              Nenhum favorito ainda
            </Text>

          </View>

        ) : (

          favorites.map((item, index) => (

            <TouchableOpacity
              key={index}
              onPress={() => openCountry(item)}
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                padding: 15,
                marginBottom: 12,
                borderRadius: 18,
                alignItems: 'center'
              }}
            >

              <Image
                source={{ uri: item.flags?.png }}
                style={{
                  width: 60,
                  height: 40,
                  borderRadius: 8
                }}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: 12
                }}
              >

                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold'
                  }}
                >
                  {item.name.common}
                </Text>

                <Text style={{ color: 'gray' }}>
                  Capital: {item.capital?.[0] || 'N/A'}
                </Text>

              </View>

              <AntDesign
                name="heart"
                size={22}
                color="red"
              />

            </TouchableOpacity>

          ))
        )}

      </ScrollView>

    </View>
  );
}