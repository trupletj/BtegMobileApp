import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Text,
  Button,
  List,
  Card,
  Spinner,
} from "@ui-kitten/components";
//navigation
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import globals from "constants/globals";
import { useAuth } from "hooks/useAuth";
import axios from "axios";
const DATA_LIST = globals.DATA_LIST;

const ServiceMiddleScreen = ({ route }) => {
  const navigation = useNavigation();
  const { service } = route.params;

  const { service_roles, user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    const asd = [
      {
        field_name: "application_service_id",
        filter_type: "=",
        filter_value: service.id,
      },
    ];
    axios({
      method: "POST",
      url: `/api/custom/list`,
      data: {
        ...DATA_LIST,
        modelName:
          "Frontend\\Plugins\\ApplicationService\\ApplicationServiceDataRows",
        filters: asd,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(function (response) {
      if (response.data.records) {
        let aa = response.data.records.data;
        let newArray = [];

        aa.filter(function (el) {
          if (el.browse == 1) {
            let newObject = {};
            newObject["field"] = el.field;
            newObject["label"] = el.display_name;
            newArray.push(newObject);
          }
        });
        setDataRows(newArray || []);
      } else alert("error");
      setLoading(false);
    });
  }, []);

  const fetchData = async (data, token) => {
    axios({
      method: "POST",
      url: `/api/custom/list`,
      data,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(function (response) {
      if (response.data.records) {
        setResults(response?.data?.records?.data || []);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    var quest_data = JSON.parse(JSON.stringify(DATA_LIST));
    let real_service_role =
      '{"field_name": "worker_id", "filter_type": "=", "filter_value": ${user.user.employee_id}}';

    var filtered_role = service_roles.find(
      (item) =>
        parseInt(item.application_service_id) === parseInt(service.id) &&
        parseInt(item.role_id) === parseInt(user.user.role_id)
    );
    let aa = JSON.stringify(eval("`" + real_service_role + "`"));

    if (filtered_role) {
      aa = JSON.stringify(eval("`" + filtered_role.filter_options + "`"));
    }
    quest_data.filters.push(JSON.parse(aa));
    quest_data.page = 1;
    quest_data.perPage = 2;
    console.log(quest_data, service);
    quest_data.modelName = service.model_path + "\\" + service.model_name;
    fetchData(quest_data, token);
  }, [service.id]);

  const handleConfirm = () => {
    navigation.navigate("SingleServiceForm", { id: service.id });
  };

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Maldives</Text>
      <Text category="s1">By Wikipedia</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <TouchableOpacity
        style={{ marginLeft: 5 }}
        onPress={() => console.log("first")}
      >
        <AntDesign name="ellipsis1" size={24} color={globals.COLOR.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <Card style={styles.card} footer={Footer}>
      {dataRows.map((row, index) => {
        return (
          <View key={index} style={styles.tableContainer}>
            <View style={styles.item}>
              <Text>{row.label}</Text>
            </View>
            <View style={styles.item}>
              <Text>{item[row.field]}</Text>
            </View>
          </View>
        );
      })}
    </Card>
  );
  return (
    <Layout style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          {loading && (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner></Spinner>
              <Text style={{ marginVertical: 10 }} status="info">
                Өгөгдлийн тохируулж байна!
              </Text>
            </View>
          )}
          {!loading && (
            <>
              <List data={results} renderItem={renderItem} />
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  status="success"
                  onPress={() => handleConfirm()}
                >
                  <AntDesign
                    name="pluscircle"
                    size={36}
                    color={globals.COLOR.PRIMARY}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  status="success"
                  onPress={() => console.log("first")}
                >
                  <AntDesign
                    name="questioncircle"
                    size={36}
                    color={globals.COLOR.PRIMARY}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default ServiceMiddleScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    padding: 10,
  },
  tableContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    width: "50%", // is 50% of container width
  },
  buttonGroup: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
