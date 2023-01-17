import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
const CustomForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Save data locally
    alert("localed");
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Enter your name"
      />
      <Text>Email:</Text>
      <TextInput
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Enter your email"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CustomForm;
