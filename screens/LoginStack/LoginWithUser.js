import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Layout, Text, Input, Button, Divider } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";

import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";

import { useNavigation } from "@react-navigation/native";
import globals from "constants/globals";
const LoginWithUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { loginWithEmail, user } = useAuth();

  const onPressEntry = () => {
    loginWithEmail(email, password);
  };
  const onPressChangeEntryType = () => {
    navigation.navigate("LoginWithPhone");
  };
  return (
    <Layout style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("assets/logo.png")} />
          </View>
          <Input
            style={styles.inputStyle}
            onChangeText={setEmail}
            value={email}
            placeholder="E-Mail"
            keyboardType="email-address"
            accessoryLeft={() => (
              <AntDesign name="mail" size={24} color={globals.COLOR.PRIMARY} />
            )}
          />
          <Input
            style={styles.inputStyle}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
            accessoryLeft={() => (
              <AntDesign name="lock" size={24} color={globals.COLOR.PRIMARY} />
            )}
          />
          <Divider style={{ marginTop: 10 }} />
          <Button style={styles.buttonStyle} onPress={onPressEntry}>
            Нэвтрэх
          </Button>
          <Button
            style={styles.buttonStyle}
            onPress={onPressChangeEntryType}
            appearance="ghost"
            status="basic"
          >
            Кодоор нэвтрэх
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 10,
  },
  inputStyle: { marginVertical: 3 },
  inputContainer: { width: "80%" },
  buttonContainer: { width: "60%" },
  logoContainer: { marginBottom: 40, alignItems: "center" },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default LoginWithUser;
