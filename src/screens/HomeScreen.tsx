import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать, {user ? user.name : 'менеджер'}!</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Клиенты"
          onPress={() => navigation.navigate('Clients')}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Сделки"
          onPress={() => navigation.navigate('Deals')}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Выйти"
          onPress={logout}
          color="#f44336"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  }
});

export default HomeScreen;
