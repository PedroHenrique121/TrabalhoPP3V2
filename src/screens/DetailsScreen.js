import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
export default function DetailsScreen({ route, navigation }) {

  const { country, favorites, setFavorites } = route.params;

  // PEGANDO DADOS DA API
  const nome = country?.name?.common || 'N/A';
  const nomeOficial = country?.name?.official || 'N/A';
  const capital = country?.capital?.[0] || 'N/A';

  const populacao = country?.population
    ? country.population.toLocaleString('pt-BR')
    : 'N/A';

  const idiomas = country?.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const moeda = country?.currencies
    ? Object.values(country.currencies)[0]?.name
    : 'N/A';

  const regiao = country?.region || 'N/A';
  const subRegiao = country?.subregion || 'N/A';
  const fuso = country?.timezones?.[0] || 'N/A';

  const bandeira =
    country?.flags?.png ||
    'https://via.placeholder.com/300';

function addFavorite() {

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

  return (
    <ScrollView style={styles.container}>

      {}
      <Image
        source={{ uri: bandeira }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.card}>

        {}
        <Text style={styles.title}>
          {nome}
        </Text>

        <Text style={styles.subtitle}>
          {nomeOficial}
        </Text>

        {}
        <InfoItem
          icon="business"
          label="Capital"
          value={capital}
        />

        <InfoItem
          icon="people"
          label="População"
          value={populacao}
        />

        <InfoItem
          icon="language"
          label="Idiomas"
          value={idiomas}
        />

        <InfoItem
          icon="cash"
          label="Moeda"
          value={moeda}
        />

        <InfoItem
          icon="map"
          label="Região"
          value={regiao}
        />

        <InfoItem
          icon="earth"
          label="Sub-região"
          value={subRegiao}
        />

        <InfoItem
          icon="time"
          label="Fuso Horário"
          value={fuso}
        />

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.button}
          onPress={addFavorite}
        >

          <Ionicons
            name="heart"
            size={20}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Adicionar aos Favoritos
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

/* COMPONENTE INFO */
function InfoItem({ icon, label, value }) {

  return (
    <View style={styles.infoContainer}>

      <Ionicons
        name={icon}
        size={22}
        color="#2563eb"
        style={{ marginRight: 12 }}
      />

      <View>

        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>

      </View>

    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  image: {
    width: '90%',
    height: 180,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  },

  card: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    color: '#666',
    marginBottom: 20,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  infoLabel: {
    fontSize: 13,
    color: '#777',
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },

});