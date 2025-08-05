import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (email) {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://placehold.co/200x200/2e7d32/white?text=Ортопед' }} 
        style={styles.logo} 
      />
      <Title style={styles.title}>Ортопед: Вход в систему</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button 
        mode="contained" 
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Войти
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#2e7d32',
  },
  buttonLabel: {
    fontSize: 18,
  },
});