import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import {
  Container,
  HStack, // Import HStack from native-base
  Icon,
  Input,
  Item,
  Divider,
  Box,
  TextInput,
  VStack,
  Heading,
  Text
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../components/Banner/Banner";

const data = require("../../../assets/products.json");
const { height, width } = Dimensions.get("window");

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [productFilter,setProductFilter]=useState([]);
  const [focus,setFocus]=useState();

  useEffect(() => {
    setProducts(data);
    setProductFilter(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductFilter([]);
      setFocus();
    };
  }, []);

  const searchProduct = (text) => {
    setProductFilter(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };


  return (
    <>
     <VStack my="4" space={5} w="100%" maxW={width-10} alignSelf={"center"} >
      <VStack w="100%" space={5} alignSelf="center">
        <Input
        onFocus={openList}
        onChangeText={(text)=>searchProduct(text)}
        placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
      </VStack>
    </VStack>
    <Text onPress={onBlur}>Close</Text>
    {focus?<SearchedProduct productFilter={productFilter} />: <View>
      <Banner />
    <View style={styles.listContainer}>
   
   <FlatList
     numColumns={2}
     data={products}
     renderItem={({ item }) => <ProductList key={item.id} item={item} />}
     keyExtractor={(item) => item?.name}
   />
 </View>
    </View>   
      
      }
     
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: width,
    height: height,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    flexGrow: 1,
  },
});

export default ProductsContainer;
