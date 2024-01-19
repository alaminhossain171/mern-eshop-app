import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { apiPost } from "../../utils/utils";
import { signup } from "../../config/restAPI";
import Toast from "react-native-toast-message";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    let data = {
      name,
      email,
      password,
      phone,
      isAdmin: false,
    };
    try {
      const res = await apiPost(signup, data);
    if(res?.success){
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Registration succeed",
        text2: "Please login your account",
      });
    setTimeout(() => {
      navigation.navigate("Login");
    }, 500);
    }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: error.message|| "Something went wrong",
        text2: "Please try again!",
      });
    }
  };

  const handleLoginNavigation = () => {
    // Navigate to the login page
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={handleLoginNavigation}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: "#3498db",
  },
});

export default Register;
