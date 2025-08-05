import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Card, Title, DataTable } from 'react-native-paper';

export default function NewDealScreen() {
  const [client, setClient] = useState('');
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [commission, setCommission] = useState(0);

  // Обновленный список продуктов
  const products = [
    { id: '1', name: 'Консультации+курс+стельки', price: 23500, percent: 15 },
    { id: '2', name: 'Курс+2 пары стелек', price: 1925, percent: 15 },
    { id: '3', name: 'Консультации+стельки', price: 15250, percent: 15 },
    { id: '4', name: 'Курс+стельки', price: 12250, percent: 15 },
    { id: '5', name: 'Курс Стельки', price: 9900, percent: 15 },
    { id: '6', name: 'Все Сам', price: 5000, percent: 15 },
    { id: '7', name: 'Индивидуальная Консультация', price: 5000, percent: 15 },
    { id: '8', name: 'Все сам', price: 3750, percent: 15 },
  ];

  const calculateCommission = () => {
    const selectedProduct = products.find(p => p.name === product);
    
    if (selectedProduct) {
      setCommission(selectedProduct.price * selectedProduct.percent / 100);
    } else if (amount) {
      const amountNum = parseFloat(amount);
      setCommission(amountNum * 0.15);
    } else {
      setCommission(0);
    }
  };

  useEffect(() => {
    calculateCommission();
  }, [product, amount]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Новая сделка</Title>
          
          <TextInput
            label="Клиент"
            value={client}
            onChangeText={setClient}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon name="account" />}
          />
          
          <TextInput
            label="Продукт"
            value={product}
            onChangeText={setProduct}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon name="package-variant" />}
          />
          
          <TextInput
            label="Сумма сделки (руб)"
            value={amount}
            onChangeText={setAmount}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            left={<TextInput.Icon name="currency-rub" />}
          />
          
          <View style={styles.commissionContainer}>
            <Title style={{color: '#2e7d32', fontSize: 20}}>Ваша комиссия:</Title>
            <Title style={{fontSize: 24, fontWeight: 'bold'}}>{commission.toLocaleString()} ₽</Title>
          </View>
          
          <Button 
            mode="contained" 
            style={styles.button}
            onPress={() => {}}
          >
            Сохранить сделку
          </Button>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Пакеты услуг</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.productHeader}>Продукт</DataTable.Title>
              <DataTable.Title numeric style={styles.priceHeader}>Цена</DataTable.Title>
            </DataTable.Header>
            
            {products.map((item) => (
              <DataTable.Row key={item.id} onPress={() => {
                setProduct(item.name);
                setAmount(item.price.toString());
              }}>
                <DataTable.Cell style={styles.productCell}>
                  <Title style={styles.productTitle}>{item.name}</Title>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.priceCell}>
                  <Title style={styles.priceTitle}>{item.price.toLocaleString()} ₽</Title>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f2f5',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    marginBottom: 15,
    color: '#2e7d32',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  commissionContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#2e7d32',
  },
  
  // Новые стили для таблицы
  productHeader: {
    flex: 3, // Больше места для названия продукта
  },
  priceHeader: {
    flex: 1, // Меньше места для цены
  },
  productCell: {
    flex: 3, // Соответствует ширине заголовка
    paddingVertical: 12, // Больше вертикального пространства
  },
  priceCell: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 14, // Чуть уменьшенный шрифт
    lineHeight: 18, // Межстрочный интервал
    fontWeight: '500',
  },
  priceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});