import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../hooks/auth";

import { useNavigation } from "@react-navigation/native";

import { DefaultButton, DefaultTextInput } from "../components";

const LoginWithUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { loginWithEmail, user } = useAuth();

  const onPressEntry = () => {
    loginWithEmail(email, password);
    navigation.navigate("AppTabScreen");
  };
  const onPressChangeEntryType = () => {
    navigation.navigate("LoginWithPhone");
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>

        <View style={styles.inputContainer}>
          <DefaultTextInput
            iconName={"mail"}
            value={email}
            onChangeText={setEmail}
            placeholder="E-Mail"
            keyboardType="email-address"
          />

          <DefaultTextInput
            iconName={"lock"}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.buttonContainer}>
          <DefaultButton title="Системд нэвтрэх" onPress={onPressEntry} />
          <DefaultButton
            type="SECONDARY"
            title="Кодоор нэвтрэх"
            onPress={onPressChangeEntryType}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  inputContainer: { width: "80%" },
  buttonContainer: { width: "60%" },
  logoContainer: { marginBottom: 40 },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default LoginWithUser;
