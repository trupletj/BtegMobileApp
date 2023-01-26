import * as React from "react";
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
import { useForm, Controller, useController } from "react-hook-form";
import formFields from "./formFields";

const TextInput = ({ name, control, rules, label }) => {
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
    ></Input>
  );
};
const Checker = ({ options, control, name, label }) => {
  const { field } = useController({
    control,
    defaultValue: false,
    name,
  });
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <CheckBox
        label={label}
        checked={checked}
        onChange={(nextChecked) => {
          setChecked(nextChecked);
          field.onChange(nextChecked);
        }}
      >
        {`Checked: ${checked}`}
      </CheckBox>
    </>
  );
};
const Selecter = ({ options, control, name, label }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const { field } = useController({
    control,
    defaultValue: options[selectedIndex.row],
    name,
  });
  return (
    <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
          field.onChange(options[selectedIndex.row]);
        }}
        style={{ width: "100%" }}
        value={options[selectedIndex.row].label}
        size="small"
        label={label}
      >
        {options.map((_, i) => {
          return <SelectItem key={i} title={_.label} value={_.value} />;
        })}
      </Select>
    </>
  );
};

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

  console.log("errors!", errors);

  return (
    <Layout style={styles.container}>
      {formFields.map((field, i) => {
        switch (field.type) {
          case "text":
            return (
              <View key={i}>
                <TextInput
                  label={label}
                  name={field.name}
                  control={control}
                  rules={field.rules}
                />
                {errors[field.name] && (
                  <Text style={styles.error}>{errors[field.name].message}</Text>
                )}
              </View>
            );
          case "checkbox":
            return (
              <View key={i}>
                <Checker
                  label={label}
                  options={["a", "b", "c"]}
                  control={control}
                  name={field.name}
                />
                {errors[field.name] && (
                  <Text style={styles.error}>{errors[field.name].message}</Text>
                )}
              </View>
            );
          case "select":
            return (
              <View key={i} style={styles.container}>
                <Selecter
                  label={field.label}
                  options={field.options}
                  control={control}
                  name={field.name}
                />
                {errors[field.name] && (
                  <Text style={styles.error}>{errors[field.name].message}</Text>
                )}
              </View>
            );
        }
      })}

      <View>
        <Button title="Button" onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
});
