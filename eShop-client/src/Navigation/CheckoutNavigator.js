import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Payment from "../screens/checkout/Payment";
import Confirm from "../screens/checkout/Confirm";
import Checkout from "../screens/checkout/Checkout"
// Screens

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
