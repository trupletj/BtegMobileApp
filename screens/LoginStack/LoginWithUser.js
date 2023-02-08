import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
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
import { AntDesign } from "@expo/vector-icons";

import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";

import { useNavigation } from "@react-navigation/native";
import globals from "constants/globals";
const LoginWithUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { loginWithEmail, user, isLoading } = useAuth();

  const onPressEntry = () => {
    loginWithEmail(email, password);
  };
  const onPressChangeEntryType = () => {
    navigation.navigate("LoginWithPhone");
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
              onChangeText={setEmail}
              value={email}
              placeholder="E-Mail"
              keyboardType="email-address"
              accessoryLeft={() => (
                <AntDesign
                  name="mail"
                  size={24}
                  color={globals.COLOR.PRIMARY}
                />
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
                <AntDesign
                  name="lock"
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
              Кодоор нэвтрэх
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
