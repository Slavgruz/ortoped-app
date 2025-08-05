import React from 'react';
import { View, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>Приложение Ортопед успешно запущено!</Text>
      </View>
    </PaperProvider>
  );
}