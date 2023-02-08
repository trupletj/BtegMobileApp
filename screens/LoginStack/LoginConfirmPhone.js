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
  Divider,
  Spinner,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import globals from "constants/globals";

import { useNavigation } from "@react-navigation/native";

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
          <Input
            style={styles.inputStyle}
            onChangeText={setCode}
            value={code}
            placeholder="Утсанд илгээсэн код"
            keyboardType="number-pad"
            accessoryLeft={() => (
              <AntDesign
                name="message1"
                size={24}
                color={globals.COLOR.PRIMARY}
              />
            )}
          />
          <Divider style={{ marginTop: 10 }} />

          <Button
            style={styles.buttonStyle}
            onPress={onPressEntry}
            disabled={isLoading}
          >
            {isLoading ? <Spinner status="basic" /> : "Нэвтрэх"}
          </Button>
          <Button
            style={styles.buttonStyle}
            onPress={onPressBackToLogin}
            appearance="ghost"
          >
            Нэвтрэх хуудасанд буцах
          </Button>
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
  buttonStyle: {
    marginVertical: 10,
  },
  inputStyle: { marginVertical: 3 },
  inputContainer: { width: "80%" },
  buttonContainer: { width: "60%" },
  title: { fontSize: 24, fontWeight: "bold", color: "#FF6721", margin: 10 },
});

export default LoginConfirmPhone;
