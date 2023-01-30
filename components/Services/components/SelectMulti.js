import React, { useEffect } from "react";
import { Select, SelectItem } from "@ui-kitten/components";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";

const SelectMulti = ({
  options,
  control,
  name,
  label,
  rules,
  caption,
  status,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [value, setValue] = React.useState(null);
  const { field } = useController({
    control,
    defaultValue: null,
    name,
    rules,
  });

  useEffect(() => {
    let str = null;
    if (selectedIndex) {
      selectedIndex.map((_, i) => {
        str
          ? (str = str + ", " + options[_.row].label)
          : (str = options[_.row].label);
      });
    }
    setValue(str);
  }, [selectedIndex, setSelectedIndex]);

  const handleOnBlur = () => {
    field.onChange(value);
  };

  return (
    <>
      <Select
        multiSelect={true}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
        }}
        style={styles.inputStyle}
        label={label}
        onBlur={handleOnBlur}
        value={value}
        status={status}
        caption={caption}
      >
        {options.map((_, i) => {
          return <SelectItem key={i} title={_.label} value={_.value} />;
        })}
      </Select>
    </>
  );
};

export default SelectMulti;

const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
  },
});
