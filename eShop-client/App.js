import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LogBox } from "react-native";
import { ProductsContainer } from "./src/screens";
import Header from "./src/components/Header/Header";
import { SafeAreaProvider, Box } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import RootNavigation from "./src/Navigation/RootNavigation";
import { store } from "./src/redux/store";
import {Provider} from "react-redux";
import Toast from 'react-native-toast-message'
import Auth from "./src/context/store/Auth";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <Auth>
    <Provider store={store}>
      <View style={styles.container}>
        <NativeBaseProvider>
          <Header />
          <RootNavigation />
          <Toast ref={(ref)=>Toast.setRef(ref)}/>
        </NativeBaseProvider>
      </View>
    </Provider>
    </Auth>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
