import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import Admin from "../screens/admin/Admin";
import User from "../screens/user/User";
import HomeStackScreen from "./HomeStack";
import ChartStackScreen from "./ChartStack";
import { useSelector } from "react-redux";
import AuthScreens from "./UserNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { cartItem } = useSelector((state) => state.cart);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Cart") {
            iconName = focused ? "shopping-cart" : "shopping-cart";
          } else if (route.name === "Admin") {
            iconName = focused ? "cog" : "cog";
          } else if (route.name === "UserStack") {
            iconName = focused ? "user" : "user";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen
        name="Cart"
        component={ChartStackScreen}
        options={
          cartItem?.length > 0 ? { tabBarBadge: cartItem?.length } : null
        }
      />
      <Tab.Screen name="Admin" component={Admin} />
      <Tab.Screen name="UserStack" component={AuthScreens} />
    </Tab.Navigator>
  );
}
