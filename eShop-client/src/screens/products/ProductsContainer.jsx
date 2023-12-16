import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
const data = require("../../../assets/products.json");
const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data);
    return () => {
      setProducts([]);
    };
  }, []);
  return (
    <View>
      <Text>Product Container</Text>
      <View style={{ marginTop: 10 }}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductList key={item.id} item={item} />}
          keyExtractor={(item) => item?.name}
        />
      </View>
    </View>
  );
};

export default ProductsContainer;

const styles = StyleSheet.create({});
