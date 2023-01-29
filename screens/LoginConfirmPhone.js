import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  IndexPath,
  Input,
  Button,
  Layout,
  Text,
  CheckBox,
  Select,
  SelectItem,
  TopNavigation,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { useAuth } from "hooks/auth";

import { useNavigation } from "@react-navigation/native";

import DefaultButton from "components/DefaultButton";
import DefaultTextInput from "components/DefaultTextInput";

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
    <Layout style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container}>
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
        </Layout>
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
  inputContainer: { width: "80%" },
  buttonContainer: { width: "60%" },
  title: { fontSize: 24, fontWeight: "bold", color: "#051C60", margin: 10 },
});

export default LoginConfirmPhone;
