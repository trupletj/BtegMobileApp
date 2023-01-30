import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Layout, Text, Input, Button, Divider } from "@ui-kitten/components";

import { useAuth } from "hooks/auth";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const LoginWithPhone = () => {
  const [phone, setPhone] = useState("");
  const [attendenceId, setAttendenceId] = useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
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
    <Layout style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("assets/logo.png")} />
          </View>
          <Input
            style={styles.inputStyle}
            onChangeText={setAttendenceId}
            placeholder="Цаг бүртгэлийн дугаар"
            keyboardType="number-pad"
            accessoryLeft={() => (
              <AntDesign name="idcard" size={24} color="#FF6721" />
            )}
          />
          <Input
            style={styles.inputStyle}
            onChangeText={setPhone}
            placeholder="Утасны дугаар"
            keyboardType="number-pad"
            accessoryLeft={() => (
              <AntDesign name="phone" size={24} color="#FF6721" />
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
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 10,
  },
  inputStyle: { marginVertical: 3 },
  //  inputContainer: { width: "80%" },
  // buttonContainer: { width: "60%" },
  logoContainer: { marginBottom: 40, alignItems: "center" },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default LoginWithPhone;
