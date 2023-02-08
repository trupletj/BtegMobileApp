import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  IndexPath,
  Input,
  Button,
  Layout,
  Text,
  CheckBox,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useForm, Controller, useController, set } from "react-hook-form";

const TextInput = ({
  name,
  control,
  rules,
  label,
  caption,
  status,
  multiline,
}) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
    rules,
  });
  return (
    <Input
      style={styles.inputStyle}
      label={label}
      onChangeText={field.onChange}
      value={field.value}
      status={status}
      caption={caption}
      multiline={multiline}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
  },
});
