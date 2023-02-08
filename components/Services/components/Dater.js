import React from "react";
import { StyleSheet } from "react-native";
import { Datepicker, Layout, Text } from "@ui-kitten/components";
import { useForm, Controller, useController, set } from "react-hook-form";
import { MomentDateService } from "@ui-kitten/moment";
import moment from "moment";

const dateService = new MomentDateService();

const Dater = ({ options, control, name, label, rules, caption, status }) => {
  const [date, setDate] = React.useState(moment());

  const { field } = useController({
    control,
    defaultValue: null,
    name,
    rules,
  });

  return (
    <Layout style={styles.container} level="1">
      <Datepicker
        style={styles.picker}
        label={label}
        date={date}
        dateService={dateService}
        status={status}
        caption={caption}
        onSelect={(nextDate) => setDate(nextDate)}
        onBlur={() => field.onChange(date)}
      />
    </Layout>
  );
};

export default Dater;
const styles = StyleSheet.create({
  container: {},
  picker: {
    flex: 1,
    margin: 2,
    zIndex: 1,
  },
});
