import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Select, SelectItem } from "@ui-kitten/components";
import { useForm, Controller, useController, set } from "react-hook-form";

const Selecter = ({
  options,
  control,
  name,
  label,
  rules,
  caption,
  status,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const { field } = useController({
    control,
    defaultValue: null,
    name,
    rules,
  });

  useEffect(() => {
    if (selectedIndex) field.onChange(options[selectedIndex.row].label);
  }, [selectedIndex, setSelectedIndex]);
  return (
    <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
        }}
        style={styles.inputStyle}
        value={selectedIndex ? options[selectedIndex.row].label : null}
        label={label}
        caption={caption}
        status={status}
      >
        {options.map((_, i) => {
          return <SelectItem key={i} title={_.label} value={_.value} />;
        })}
      </Select>
    </>
  );
};

export default Selecter;

const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
  },
});
