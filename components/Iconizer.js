import { View, Text } from "react-native";
import React from "react";
import {
  Entypo,
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Brands,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

const component = {
  Entypo,
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Brands,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};
const Iconizer = (props) => {
  const IconType = component[props.iconType];
  return <IconType color={props.color} size={props.size} name={props.name} />;
};

export default Iconizer;
