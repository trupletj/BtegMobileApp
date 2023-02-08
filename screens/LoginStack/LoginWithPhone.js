import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native";
import {
  Layout,
  Text,
  Input,
  Button,
  Divider,
  Spinner,
} from "@ui-kitten/components";

import { useAuth } from "hooks/useAuth";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import globals from "constants/globals";

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layout style={styles.container}>
        <SafeAreaView style={styles.container2}>
          <Layout>
            <View style={styles.logoContainer}>
              <Text category="h2">Нэвтрэх</Text>
            </View>
            <Input
              style={styles.inputStyle}
              onChangeText={setAttendenceId}
              placeholder="Цаг бүртгэлийн дугаар"
              keyboardType="number-pad"
              accessoryLeft={() => (
                <AntDesign
                  name="idcard"
                  size={24}
                  color={globals.COLOR.PRIMARY}
                />
              )}
            />
            <Input
              style={styles.inputStyle}
              onChangeText={setPhone}
              placeholder="Утасны дугаар"
              keyboardType="number-pad"
              accessoryLeft={() => (
                <AntDesign
                  name="phone"
                  size={24}
                  color={globals.COLOR.PRIMARY}
                />
              )}
            />
          </Layout>
          <Layout>
            <Button
              style={styles.buttonStyle}
              onPress={onPressEntry}
              disabled={isLoading}
            >
              {isLoading ? <Spinner status="basic" /> : "Нэвтрэх"}
            </Button>
            <Button
              style={styles.buttonStyle}
              onPress={onPressChangeEntryType}
              appearance="ghost"
              status="basic"
            >
              Бүртгэлэй хэрэглэгч
            </Button>
          </Layout>
        </SafeAreaView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  container2: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
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
