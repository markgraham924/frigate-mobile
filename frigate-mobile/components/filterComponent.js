import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming MaterialIcons

const FilterComponent = ({ onRefresh, onToggleChange }) => {
  const [toggles, setToggles] = useState({
    Zone: false,
    Person: false,
    Car: false,
  });

  const handleToggle = (key) => {
    const newToggles = { ...toggles, [key]: !toggles[key] };
    setToggles(newToggles);
    onToggleChange(newToggles);
  };

  const icons = {
    Zone: "location-on",
    Person: "person",
    Car: "directions-car",
  };

  return (
    <View style={styles.container}>
      {Object.entries(toggles).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          onPress={() => handleToggle(key)}
          style={[
            styles.button,
            { backgroundColor: value ? "#4CAF50" : "#F44336" }, // Toggle color
          ]}
        >
          <Icon name={icons[key]} size={30} color="#FFF" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
  },
});

export default FilterComponent;
