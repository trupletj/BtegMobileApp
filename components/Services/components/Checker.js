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

const Checker = ({ options, control, name, label, caption, status }) => {
  const { field } = useController({
    control,
    defaultValue: false,
    name,
  });
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <CheckBox
        checked={checked}
        onChange={(nextChecked) => {
          setChecked(nextChecked);
          field.onChange(nextChecked);
        }}
        caption={caption}
        status={status}
      >
        {(evaProps) => <Text {...evaProps}>{label}</Text>}
      </CheckBox>
    </>
  );
};

export default Checker;
