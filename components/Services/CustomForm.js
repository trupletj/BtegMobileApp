import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Divider, Layout } from "@ui-kitten/components";
import { useForm, Controller, useController, set } from "react-hook-form";
import formFields from "./formFields";

import SelectMulti from "./components/SelectMulti";
import Checker from "./components/Checker";
import Selecter from "./components/Selecter";
import TextInput from "./components/TextInput";

export default () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log("this is data ", data);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  const handleChange = (name, value) => {
    setValue(name, value);
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Layout style={styles.container}>
      {formFields.map((field, i) => {
        switch (field.type) {
          case "text":
            return (
              <TextInput
                key={i}
                label={field.label}
                name={field.name}
                control={control}
                rules={field.rules}
                caption={errors[field.name] && errors[field.name].message}
                status={errors[field.name] && "danger"}
              />
            );
          case "checkbox":
            return (
              <Checker
                key={i}
                label={field.label}
                options={["a", "b", "c"]}
                control={control}
                name={field.name}
                caption={errors[field.name] && errors[field.name].message}
                status={errors[field.name] && "danger"}
              />
            );
          case "select":
            return (
              <Selecter
                key={i}
                label={field.label}
                options={field.options}
                control={control}
                name={field.name}
                rules={field.rules}
                caption={errors[field.name] && errors[field.name].message}
                status={errors[field.name] && "danger"}
              />
            );
          case "selectmulti":
            return (
              <SelectMulti
                key={i}
                label={field.label}
                options={field.options}
                control={control}
                name={field.name}
                rules={field.rules}
                caption={errors[field.name] && errors[field.name].message}
                status={errors[field.name] && "danger"}
              />
            );
        }
      })}

      <Divider style={styles.divider} />
      <Button
        style={styles.button}
        title="Button"
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
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
  divider: { marginVertical: 5 },
  button: { marginVertical: 5 },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});