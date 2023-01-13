import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { useAuth } from "../hooks/auth";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import DefaultButton from "../components/DefaultButton";
import DefaultTextInput from "../components/DefaultTextInput";

const LoginWithPhone = () => {
  const [phone, setPhone] = useState("");
  const [attendenceId, setAttendenceId] = useState("");
  const { loginWithPhone, user, isLoading } = useAuth();
  const navigation = useNavigation();

  const onPressEntry = async () => {
    let response = await loginWithPhone(attendenceId, phone);

    if (response?.data?.status) {
      if (response.data.status.variant === "success")
        navigation.navigate({
          name: "LoginConfirmPhone",
          params: { emp_code: attendenceId, phone },
        });
      else alert(response.data.status.text);
    } else {
      alert("aldaa");
    }
  };
  const onPressChangeEntryType = () => {
    navigation.navigate("LoginWithUser");
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <View style={styles.inputContainer}>
          <DefaultTextInput
            iconName={"idcard"}
            value={attendenceId}
            onChangeText={setAttendenceId}
            placeholder="Цаг бүртгэлийн дугаар"
            keyboardType="number-pad"
          />

          <DefaultTextInput
            iconName={"phone"}
            value={phone}
            onChangeText={setPhone}
            placeholder="Утасны дугаар"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton title="Системд нэвтрэх" onPress={onPressEntry} />
          <DefaultButton
            type="SECONDARY"
            title="Бүртгэлтэй хэрэглэгч"
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

export default LoginWithPhone;
