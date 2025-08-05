import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Client } from '../types';
import DataService from '../services/DataService';

type ClientDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClientDetail'>;

type Props = {
  navigation: ClientDetailScreenNavigationProp;
  route: {
    params: {
      clientId?: string;
    };
  };
};

const ClientDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const [client, setClient] = useState<Client>({
    id: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    managerId: ''
  });

  useEffect(() => {
    if (route.params.clientId) {
      loadClient(route.params.clientId);
    }
  }, [route.params.clientId]);

  const loadClient = async (clientId: string) => {
    const clients = await DataService.getClients('');
    const foundClient = clients.find(c => c.id === clientId);
    if (foundClient) {
      setClient(foundClient);
    }
  };

  const handleSave = async () => {
    await DataService.saveClient(client);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {client.id ? 'Редактирование клиента' : 'Новый клиент'}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="ФИО"
        value={client.name}
        onChangeText={text => setClient({...client, name: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        value={client.phone}
        onChangeText={text => setClient({...client, phone: text})}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={client.email}
        onChangeText={text => setClient({...client, email: text})}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Город"
        value={client.city}
        onChangeText={text => setClient({...client, city: text})}
      />
      
      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default ClientDetailScreen;
