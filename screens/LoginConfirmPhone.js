import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../hooks/auth";

import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

import DefaultButton from "../components/DefaultButton";
import DefaultTextInput from "../components/DefaultTextInput";
import LoginWithPhone from "./LoginWithPhone";

const LoginConfirmPhone = ({ route }) => {
  const [code, setCode] = useState("");

  const navigation = useNavigation();
  const { loginConfirmCode, user, isLoading } = useAuth();

  const onPressBackToLogin = () => {
    navigation.navigate("LoginWithPhone");
  };
  const onPressEntry = () => {
    loginConfirmCode(route.params.emp_code, route.params.phone, code);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container} behavior="padding">
        <Text style={styles.title}>Код оруулах</Text>
        <View style={styles.inputContainer}>
          <DefaultTextInput
            iconName={"message1"}
            value={code}
            onChangeText={setCode}
            placeholder="Код"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton title="Нэвтрэх" onPress={onPressEntry} />
          <DefaultButton type="SECONDARY" title="Дахин код авах" />
          <DefaultButton
            type="TERTIARY"
            title="Нэвтрэх Хуудсанд буцах"
            onPress={onPressBackToLogin}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "start" },
  inputContainer: { width: "80%" },
  buttonContainer: { width: "60%" },
  title: { fontSize: 24, fontWeight: "bold", color: "#051C60", margin: 10 },
});

export default LoginConfirmPhone;
