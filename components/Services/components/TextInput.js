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

const TextInput = ({ name, control, rules, label, caption, status }) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
    rules,
  });
  return (
    <Input
      label={label}
      onChangeText={field.onChange}
      value={field.value}
      status={status}
      caption={caption}
    ></Input>
  );
};

export default TextInput;
