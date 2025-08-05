import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Client } from '../types';
import DataService from '../services/DataService';

type ClientsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Clients'>;

type Props = {
  navigation: ClientsScreenNavigationProp;
};

const ClientsScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    if (!user) return;
    
    const data = await DataService.getClients(user.id);
    setClients(data);
  };

  const renderItem = ({ item }: { item: Client }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.city}</Text>
      <Button 
        title="Открыть" 
        onPress={() => navigation.navigate('ClientDetail', { clientId: item.id })} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Добавить клиента" 
        onPress={() => navigation.navigate('ClientDetail', { clientId: null })} 
      />
      
      <FlatList
        data={clients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 16, fontWeight: 'bold' }
});

export default ClientsScreen;
