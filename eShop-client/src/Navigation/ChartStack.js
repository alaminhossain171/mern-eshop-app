import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";

const ChartStack = createNativeStackNavigator();
const ChartStackScreen = () => {
  return (
    <ChartStack.Navigator>
      <ChartStack.Screen
        name="ChartStackScreen"
        options={{ headerShown: false }}
        component={Cart}
      />
      <ChartStack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
        }}
      />
    </ChartStack.Navigator>
  );
};

export default ChartStackScreen;
