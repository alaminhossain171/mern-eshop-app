import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { clearCart } from '../../redux/cartSlice/cartSlice';
import { useDispatch } from 'react-redux'
const Cart = ({ route, navigation }) => {
  const { cartItem } = useSelector((state) => state?.cart);
  const dispatch=useDispatch()

  // Calculate total price
  const totalPrice = cartItem.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <View style={styles.container}>
      {cartItem.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          {cartItem.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              <Image source={{ uri: item?.image }} style={styles.thumbnail} resizeMode="contain" />
              <View style={styles.itemDetails}>
                <Text style={styles.name}>{item?.name || 'N/A'}</Text>
                <Text style={styles.price}>Price: ${item?.price || 'N/A'}</Text>
              </View>
            </View>
          ))}
          
          <View style={styles.footer}>
            <Text style={styles.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>
            <View style={styles.footerButtons}>
              <Button title="Clear" onPress={() => dispatch(clearCart())} />
              <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  cartItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Cart;
