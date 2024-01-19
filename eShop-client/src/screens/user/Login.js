import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginAction } from "../../context/actions/authAction";
import { useIsFocused } from '@react-navigation/native';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthGlobal);
  const isFocused = useIsFocused()
  useEffect(() => {

    if (context?.stateUser?.isAuthenticated === true) {
      navigation.replace("User");

    }
  }, [context?.stateUser?.isAuthenticated]);

  const handleLogin = () => {
    loginAction({email,password},context.dispatch);
  };

  const handleSignup = () => {
    // Add your signup navigation logic here
    navigation.replace("Register");
    console.log("Signup pressed");
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText} onPress={handleSignup}>
        Don't have an account? Signup
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
  signupText: {
    marginTop: 20,
  },
});

export default Login;
