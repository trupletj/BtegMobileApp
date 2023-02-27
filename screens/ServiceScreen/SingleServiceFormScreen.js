import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import CustomForm from "components/Services/CustomForm.js";
import { Layout } from "@ui-kitten/components/ui";
import { fetchData } from "context/api";
import { useAuth } from "../../hooks/useAuth";
const data = {
  prefix: "custom",
  getAllData: "1",
  relations: ["application_service:id,name"],
  modelName:
    "Frontend\\Plugins\\ApplicationService\\ApplicationServiceDataRows",
  select: "*",
  filters: [],
  orders: [{ field_name: "id", order_type: "desc" }],
  globalSearch: [],
  dataloaded: 0,
};

const SingleServiceFormScreen = ({ route }) => {
  const { token } = useAuth();
  const [formFields, setFormFields] = useState([]);
  const { id } = route.params;
  useEffect(() => {
    const dd = {
      ...data,
      filters: [
        {
          field_name: "application_service.id",
          filter_type: "=",
          filter_value: id,
        },
      ],
    };
    fetchData(dd, token).then((response) =>
      setFormFields(response.data.records.data)
    );
  }, []);

  return (
    <Layout style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomForm formField={formFields} name="dddd" />
      </SafeAreaView>
    </Layout>
  );
};

export default SingleServiceFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
