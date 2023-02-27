import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import { useForm, Controller, useController, set } from "react-hook-form";
// import data from "./formFields.json";

//inner Components
import SelectMulti from "./components/SelectMulti";
import Checker from "./components/Checker";
import Selecter from "./components/Selecter";
import TextInput from "./components/TextInput";
import Dater from "./components/Dater";
import CustomImagePicker from "components/ImagePicker/CustomImagePicker";
import { ScrollView } from "react-native-gesture-handler";

export default ({ formField, name }) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {};

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
      <ScrollView style={{ flex: 1 }}>
        <Text category="h6">{name}</Text>
        {formField.map((field, i) => {
          switch (field.type) {
            case "text":
              return (
                <TextInput
                  key={i}
                  multiline={false}
                  label={field.display_name}
                  name={field.field}
                  control={control}
                  // rules={field.rules}
                  caption={errors[field.field] && errors[field.field].message}
                  status={errors[field.field] && "danger"}
                />
              );
            case "textarea":
              return (
                <TextInput
                  key={i}
                  multiline={true}
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
            case "datepicker":
              return (
                <Dater
                  key={i}
                  label={field.label}
                  control={control}
                  name={field.name}
                  rules={field.rules}
                  caption={errors[field.name] && errors[field.name].message}
                  status={errors[field.name] && "danger"}
                />
              );
            case "imagepicker":
              return (
                <CustomImagePicker
                  key={i}
                  // label={field.label}
                  // control={control}
                  // name={field.name}
                  // rules={field.rules}
                  // caption={errors[field.name] && errors[field.name].message}
                  // status={errors[field.name] && "danger"}
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
      </ScrollView>
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
