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
  return (
    <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
          if (selectedIndex) field.onChange(options[selectedIndex.row].label);
        }}
        style={{ width: "100%" }}
        value={selectedIndex ? options[selectedIndex.row].label : null}
        size="small"
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
