import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DefaultTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  iconName,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <AntDesign name={iconName} size={24} color="#7367f0" />
      <TextInput
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={styles.textInputStyle}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 5,
    paddingHorizontal: 15,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
  },
  textStyle: {
    marginVertical: 5,
    fontSize: 20,
  },
  textInputStyle: {
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
});

export default DefaultTextInput;
