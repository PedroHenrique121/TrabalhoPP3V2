import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';



export default function InitialScreen({ navigation }) {

  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {

    try {

      setLoading(true);

      const res = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages,currencies,region,subregion,timezones'
      );

      const data = res.data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountries(data);
      setFiltered(data);

    } catch (error) {

      console.log('Erro API:', error);

    } finally {

      setLoading(false);

    }
  }

  function searchCountry(text) {

    setSearch(text);

    const result = countries.filter(item =>
      item.name.common.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(result);
  }

  function toggleFav(country) {

    const exists = favorites.find(
      item => item.name.common === country.name.common
    );

    if (exists) {

      setFavorites(
        favorites.filter(
          item => item.name.common !== country.name.common
        )
      );

    } else {

      setFavorites([...favorites, country]);

    }
  }

  function openCountry(country) {

    navigation.navigate('Details', {
      country,
      favorites,
      setFavorites
    });

  }

  function openFavorites() {

    navigation.navigate('Favoritos', {
      favorites,
      setFavorites
    });

  }

  const isFav = (name) =>
    favorites.some(item => item.name.common === name);

  return (

    <View style={{ flex: 1, backgroundColor: '#F4F6FB' }}>

      {/* HEADER */}
      <View
        style={{
          backgroundColor: '#2F6FDB',
          padding: 20,
          paddingTop: 50,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25
        }}
      >

        <Text
          style={{
            color: '#fff',
            fontSize: 26,
            fontWeight: 'bold'
          }}
        >
          Países
        </Text>

     
        <TouchableOpacity
          onPress={openFavorites}
          style={{
            position: 'absolute',
            right: 20,
            top: 50
          }}
        >

          <AntDesign
            name="heart"
            size={26}
            color="#fff"
          />

        </TouchableOpacity>



  <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
    <AntDesign name="user" size={26} color="#fff" />
  </TouchableOpacity>

    
        <View
          style={{
            backgroundColor: '#fff',
            marginTop: 15,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >

          <AntDesign
            name="search1"
            size={18}
            color="gray"
          />

          <TextInput
            placeholder="Pesquisar país..."
            value={search}
            onChangeText={searchCountry}
            style={{
              flex: 1,
              marginLeft: 10,
              height: 45
            }}
          />

        </View>

      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100
        }}
      >

        {loading ? (

          <ActivityIndicator
            size="large"
            color="#2F6FDB"
            style={{ marginTop: 30 }}
          />

        ) : (

          filtered.map((item, index) => (

            <TouchableOpacity
              key={index}
              onPress={() => openCountry(item)}
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                padding: 15,
                marginBottom: 12,
                borderRadius: 18,
                alignItems: 'center',
                elevation: 2
              }}
            >

              <Image
                source={{ uri: item.flags?.png }}
                style={{
                  width: 55,
                  height: 38,
                  borderRadius: 6
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
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}
                >
                  {item.name.common}
                </Text>

                <Text style={{ color: 'gray' }}>
                  Capital: {item.capital?.[0] || 'N/A'}
                </Text>

              </View>

              {/* FAVORITE BUTTON */}
              <TouchableOpacity
                onPress={() => toggleFav(item)}
              >

                <AntDesign
                  name={
                    isFav(item.name.common)
                      ? 'heart'
                      : 'hearto'
                  }
                  size={22}
                  color={
                    isFav(item.name.common)
                      ? 'red'
                      : 'gray'
                  }
                />

              </TouchableOpacity>

            </TouchableOpacity>

          ))
        )}

      </ScrollView>

    
    </View>
  );
}