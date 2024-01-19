import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const methods = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
];

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
        Choose your payment method
      </Text>

      {methods.map((item) => (
        <View
          key={item.name}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <Text>{item.name}</Text>
          <Button
            title="Select"
            onPress={() => setSelected(item.value)}
            disabled={selected === item.value}
          />
        </View>
      ))}

      {selected === 3 && (
        <Picker
          selectedValue={card}
          onValueChange={(value) => setCard(value)}
          style={{ marginBottom: 20 }}
        >
          {paymentCards.map((c) => (
            <Picker.Item key={c.name} label={c.name} value={c.name} />
          ))}
        </Picker>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title="Confirm"
          onPress={() => props.navigation.navigate('Confirm', { order })}
        />
      </View>
    </View>
  );
};

export default Payment;
