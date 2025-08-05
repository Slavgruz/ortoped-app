import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

// Импортируем все экраны
import LoginScreen from './src/screens/LoginScreen';
import NewDealScreen from './src/screens/NewDealScreen';
import ClientsScreen from './src/screens/ClientsScreen'; // Импорт реального компонента

// Временные заглушки для других экранов
function HomeScreen() { 
  return null; 
}

function StatsScreen() { 
  return null; 
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Главная') {
            iconName = 'home';
          } else if (route.name === 'Клиенты') {
            iconName = 'account-group';
          } else if (route.name === 'Новая сделка') {
            iconName = 'plus-circle';
          } else if (route.name === 'Статистика') {
            iconName = 'chart-bar';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3f51b5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Клиенты" component={ClientsScreen} /> {/* Подключение реального компонента */}
      <Tab.Screen name="Новая сделка" component={NewDealScreen} />
      <Tab.Screen name="Статистика" component={StatsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Main" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}