import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";

import { useAuth } from "../hooks/auth";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import DefaultButton from "../components/DefaultButton";
import DefaultTextInput from "../components/DefaultTextInput";

const LoginWithPhone = () => {
  const [phone, setPhone] = useState("");
  const [attendenceId, setAttendenceId] = useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { loginWithPhone, user, isLoading } = useAuth();
  const navigation = useNavigation();

  const onPressEntry = async () => {
    // let response = await loginWithPhone(attendenceId, phone);

    // if (response?.data?.status) {
    //   if (response.data.status.variant === "success")
    //     navigation.navigate({
    //       name: "LoginConfirmPhone",
    //       params: { emp_code: attendenceId, phone },
    //     });
    //   else alert(response.data.status.text);
    // } else {
    //   alert("aldaa");
    // }
    navigation.navigate("LoginConfirmPhone");
  };
  const onPressChangeEntryType = () => {
    navigation.navigate("LoginWithUser");
  };
  return (
    <Layout style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
          </View>
          <Input style={styles.inputStyle} />
          <Input style={styles.inputStyle} secureTextEntry={secureTextEntry} />
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

          <Button style={styles.buttonStyle} onPress={onPressEntry}>
            Нэвтрэх
          </Button>
          <Button
            style={styles.buttonStyle}
            onPress={onPressChangeEntryType}
            appearance="ghost"
          >
            Бүртгэлэй хэрэглэгч
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 3,
  },
  inputStyle: { marginVertical: 3 },
  //  inputContainer: { width: "80%" },
  // buttonContainer: { width: "60%" },
  // logoContainer: { marginBottom: 40 },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default LoginWithPhone;
