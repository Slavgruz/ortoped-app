import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Deal } from '../types';
import DataService from '../services/DataService';

type DealsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Deals'>;

type Props = {
  navigation: DealsScreenNavigationProp;
};

const DealsScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    const data = await DataService.getDeals(user?.role === 'accountant' ? null : user?.id);
    setDeals(data);
  };

  const renderItem = ({ item }: { item: Deal }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.clientName}</Text>
      <Text>Программа: {item.programName}</Text>
      <Text>Сумма: {item.amount} ₽</Text>
      <Text>Комиссия: {item.commission} ₽</Text>
      <Text>Статус: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Добавить сделку" 
        onPress={() => navigation.navigate('NewDeal')} 
      />
      
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: 'bold' }
});

export default DealsScreen;
