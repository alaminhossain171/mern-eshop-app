import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image, Text, Box, VStack } from 'native-base';

const { width, height } = Dimensions.get('window');

const SearchedProduct = (props) => {
  const { productFilter } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VStack space={2} p={2} width={width}>
        {productFilter.length > 0 ? (
          productFilter.map((item,index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Handle product click or navigation
              }}
              style={styles.productItem}
            >
              <Image
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
                alt={item.name}
                resizeMode="cover"
                size="md"
                borderRadius={8}
              />

              <VStack space={2} flexShrink={1} ml={2}>
                <Text fontSize="md" fontWeight="bold">
                  {item.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {item.description}
                </Text>
              </VStack>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.center}>
            <Text style={{ alignSelf: 'center' }}>
              No products match the selected criteria
            </Text>
          </View>
        )}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 100,
  },
});

export default SearchedProduct;

