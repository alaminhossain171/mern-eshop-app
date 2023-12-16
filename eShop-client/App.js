import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LogBox } from "react-native";
import { ProductsContainer } from "./src/screens";
import Header from "./src/components/Header/Header";
import { SafeAreaProvider, Box } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <NativeBaseProvider>
      <Header />
      <ProductsContainer />
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
