import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useNetwork } from "hooks/useNetwork";
import CustomForm from "components/Services/CustomForm";
import { Layout, Text, Button } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";
import { useAppState } from "hooks/useAppState";
import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const data = {
  prefix: "custom",
  page: 1,
  perPage: 25,
  modelName:
    "Frontend\\Plugins\\ApplicationService\\ApplicationServiceCategory",
  relations: [],
  select: "*",
  filters: [],
  orders: [{ field_name: "id", order_type: "desc" }],
  globalSearch: [
    // {
    //   field_name: "organization_id",
    //   filter_type: "=",
    //   filter_value: 1,
    // },
    // { field_name: "gazar_id", filter_type: "=", filter_value: 1 },
  ],
  // tableColumns: [
  //   { label: "#", key: "index", sortable: false, isFilter: false },
  //   {
  //     label: "name",
  //     key: "name",
  //     sortable: true,
  //     isFilter: true,
  //     searchValue: "",
  //     filterOptions: { searchType: "b-form-input" },
  //   },
  //   {
  //     label: "logo",
  //     key: "logo",
  //     sortable: true,
  //     isFilter: true,
  //     searchValue: "",
  //     filterOptions: { searchType: "b-form-input" },
  //   },
  //   {
  //     label: "description",
  //     key: "description",
  //     sortable: true,
  //     isFilter: true,
  //     searchValue: "",
  //     filterOptions: { searchType: "b-form-input" },
  //   },
  //   {
  //     label: "details",
  //     key: "details",
  //     sortable: true,
  //     isFilter: true,
  //     searchValue: "",
  //     filterOptions: { searchType: "b-form-input" },
  //   },
  //   {
  //     label: "created_at",
  //     key: "created_at",
  //     sortable: true,
  //     isFilter: true,
  //     searchValue: "",
  //     filterOptions: { searchType: "flat-pickr" },
  //   },
  //   {
  //     label: "Үйлдэл",
  //     key: "actions",
  //     searchValue: "",
  //     isFilter: false,
  //   },
  // ],
  tableName: "application_service_category",
  dataloaded: 0,
};

const HomeScreen = () => {
  const [test, setTest] = React.useState(false);
  const { token } = useAuth();
  const isConnected = useNetwork();
  console.log("token +======", token);
  const handlePress = async () => {};
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      {<Text>{isConnected ? "true" : "false"}</Text>}
      <Button></Button>
      {/* <CustomForm /> */}
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
