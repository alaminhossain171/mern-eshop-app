import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsContainer } from "../screens";
import SingleProduct from "../screens/products/SingleProducts";
import Login from "../screens/user/Login";
import Register from "../screens/user/Register";
import User from "../screens/user/User";
const AuthStack = createNativeStackNavigator();
const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
        <AuthStack.Screen
        name="User"
        component={User}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthScreens;
