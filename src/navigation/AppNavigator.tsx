import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ClientsScreen from '../screens/ClientsScreen';
import NewDealScreen from '../screens/NewDealScreen';
import ClientDetailScreen from '../screens/ClientDetailScreen';
import DealsScreen from '../screens/DealsScreen';

// Создаем тип для параметров каждого экрана
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Clients: undefined;
  NewDeal: undefined;
  ClientDetail: { clientId?: string };
  Deals: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Экран входа - без заголовка */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      
      {/* Главный экран */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Главная' }} 
      />
      
      {/* Клиенты */}
      <Stack.Screen 
        name="Clients" 
        component={ClientsScreen} 
        options={{ title: 'Клиенты' }} 
      />
      
      {/* Новая сделка */}
      <Stack.Screen 
        name="NewDeal" 
        component={NewDealScreen} 
        options={{ title: 'Новая сделка' }} 
      />
      
      {/* Детали клиента */}
      <Stack.Screen 
        name="ClientDetail" 
        component={ClientDetailScreen} 
        options={{ title: 'Карточка клиента' }} 
      />
      
      {/* Сделки */}
      <Stack.Screen 
        name="Deals" 
        component={DealsScreen} 
        options={{ title: 'Сделки' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
