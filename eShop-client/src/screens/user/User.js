import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthGlobal from "../../context/store/AuthGlobal";
import { apiGet, getItem, removeItem } from "../../utils/utils";
import { ordersApi, user } from "../../config/restAPI";
import { logoutUser } from "../../context/actions/authAction";

const User = (props) => {
  const { stateUser, dispatch } = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState([])
  const [orders, setOrders] = useState([])
  useEffect(() => {
    if (
      stateUser.isAuthenticated === false ||
      stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }
    getUserInfo()
    getOrderList()
    
  }, [stateUser.isAuthenticated]);

  const getUserInfo=async()=>{
    try {
      const res=await apiGet(`${user}/${stateUser?.user?.userId}`);
      setUserProfile(res?.user)
    } catch (error) {
      console.log(error) 
    }
  }

  const getOrderList=async()=>{
   
    try {
      const res=await apiGet(ordersApi);
    
      const userOrders = res.filter(
        (order) => order?.user?._id === stateUser?.user?.userId
    );
    setOrders(userOrders)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async() => {
    await removeItem('jwt');
    logoutUser(dispatch);
    // navigation.navigate("Login"); 
  };

  // Dummy order list data
  const dummyOrderList = [
    { id: "1", product: "Product A", price: "$20.00" },
    { id: "2", product: "Product B", price: "$15.00" },
    { id: "3", product: "Product C", price: "$25.00" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      <Text style={styles.userEmail}>{userProfile?.name}</Text>
        <Text style={styles.userEmail}>{userProfile?.email}</Text>
        <Text style={styles.userPhone}>{userProfile?.phone}</Text>
      </View>

      {/* <View style={styles.orderListContainer}>
        <Text style={styles.orderListTitle}>My Order List:</Text>
        <FlatList
          data={dummyOrderList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>{item.product}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />
      </View> */}

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color:'black'
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 16,
  },
  orderListContainer: {
    marginTop: 20,
  },
  orderListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default User;
