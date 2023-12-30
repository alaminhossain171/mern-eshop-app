import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LogBox } from "react-native";
import { ProductsContainer } from "./src/screens";
import Header from "./src/components/Header/Header";
import { SafeAreaProvider, Box } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import RootNavigation from "./src/Navigation/RootNavigation";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
   <View style={styles.container}>
     <NativeBaseProvider>
      <Header />
      <RootNavigation />
    </NativeBaseProvider>
   </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
