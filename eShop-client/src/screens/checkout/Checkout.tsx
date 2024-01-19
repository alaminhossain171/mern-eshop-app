import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView } from 'react-native';

// Dummy countries
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
];

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    setOrderItems(props.cartItems);

    // Assume user is logged in for simplicity
    setUser('exampleUserId');
  }, []);

  const checkOut = () => {
    console.log('Orders', orderItems);

    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      user,
      zip,
    };

    console.log('Order:', order);
    // Simulate navigation to the Payment screen
    props.navigation.navigate('Payment', { order });
  };

  return (
    <ScrollView style={{ margin: 20 }}>
      <TextInput
        placeholder="Phone"
        value={phone}
        keyboardType="numeric"
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Shipping Address 1"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Shipping Address 2"
        value={address2}
        onChangeText={(text) => setAddress2(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Zip Code"
        value={zip}
        keyboardType="numeric"
        onChangeText={(text) => setZip(text)}
        style={styles.input}
      />
      <Picker
        selectedValue={country}
        onValueChange={(value) => setCountry(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select your country" value="" />
        {countries.map((c) => (
          <Picker.Item key={c.code} label={c.name} value={c.name} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={checkOut} />
      </View>
    </ScrollView>
  );
};

const styles = {
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  picker: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
};

export default Checkout;
