import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, Input, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../components/Banner/Banner";
import data from "../../../assets/products.json";
import productCategories from "../../../assets/categories.json";
import CategoryFilter from "./CategoryFilter";

const { height, width } = Dimensions.get("window");

const ProductsContainer = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCateories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductFilter(data);
    setCateories(productCategories);
    setActive(-1);
    setInitialState(data);
    setProductsCtg(data);
  }, []);

  const searchProduct = (text) => {
    setProductFilter(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category.$oid === ctg?.$oid),
              setActive(true)
            ),
          ];
    }
  };

  const renderContent = () => {
    if (focus) {
      return <SearchedProduct productFilter={productFilter} />;
    } else {
      return (
        <ScrollView>
          <Banner />
          <View>
            <CategoryFilter
              categories={categories}
              categoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
          {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {productsCtg.map((item) => {
                return <ProductList key={item.name} item={item}   navigation={navigation} />;
              })}
            </View>
          ) : (
            <View style={[styles.center, { height: height / 2 }]}>
              <Text>No products found</Text>
            </View>
          )}
        </ScrollView>
      );
    }
  };

  return (
    <>
      <VStack my={3} space={5} w="100%" maxW={width - 10} alignSelf={"center"}>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={(text) => searchProduct(text)}
            placeholder="Search"
            variant="filled"
            width="100%"
            borderRadius="10"
            py="1"
            px="2"
            InputRightElement={
              <Icon
                mx="2"
                size="4"
                color="gray.400"
                as={<Ionicons onPress={onBlur} name="close" />}
              />
            }
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
          />
        </VStack>
      </VStack>
      {renderContent()}
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
