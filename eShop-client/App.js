import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LogBox } from "react-native";
import { ProductsContainer } from './src/screens';
import { SafeAreaView } from 'react-native-safe-area-context';
LogBox.ignoreAllLogs(true);
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
     <ProductsContainer />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor: 'gainsboro',
   alignItems: 'center',
   justifyContent: 'center'
 }
})