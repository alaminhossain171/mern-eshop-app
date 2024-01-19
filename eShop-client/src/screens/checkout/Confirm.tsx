import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Image } from 'react-native';

const Confirm = (props) => {
  const finalOrder = props.route.params;
  const [productUpdate, setProductUpdate] = useState([]);

  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }

    return () => {
      setProductUpdate([]);
    };
  }, [props]);

  const getProducts = (x) => {
    const order = x?.order?.order;
    const products = [
      { name: 'Product 1', image: 'https://example.com/product1.jpg', price: 20 },
      { name: 'Product 2', image: 'https://example.com/product2.jpg', price: 30 },
    ];
    setProductUpdate(products);
  };

  const confirmOrder = () => {
    setTimeout(() => {
      props.navigation.navigate('Cart');
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm Order</Text>
      {finalOrder?.order ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Shipping to:</Text>
          <View style={styles.addressContainer}>
            <Text>Address: {finalOrder.order.shippingAddress1}</Text>
            <Text>Address2: {finalOrder.order.shippingAddress2}</Text>
            <Text>City: {finalOrder.order.city}</Text>
            <Text>Zip Code: {finalOrder.order.zip}</Text>
            <Text>Country: {finalOrder.order.country}</Text>
          </View>

          <Text style={styles.subtitle}>Items:</Text>
          {productUpdate.map((x) => (
            <View style={styles.itemContainer} key={x.name}>
              <Image source={{ uri: x.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.itemName}>{x.name}</Text>
                <Text style={styles.itemPrice}>$ {x.price}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button title="Place order" onPress={confirmOrder} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    alignSelf: 'center',
  },
  detailsContainer: {
    borderRadius: 8,
    marginBottom: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: 'orange',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 8,
  },
  addressContainer: {
    padding: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default Confirm;
