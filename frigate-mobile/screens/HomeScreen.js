import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Button, ScrollView, Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [cameraNames, setCameraNames] = useState([]);

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const response = await fetch("http://192.168.0.92:5000/api/stats");
        const data = await response.json();
        const names = Object.keys(data.cameras); 
        const filteredNames = names.filter(name => name !== "ptz");
        setCameraNames(filteredNames);
      } catch (error) {
        console.error("Failed to fetch camera data:", error);
      }
    };

    fetchCameraData();
  }, []);

  return (
    
    <ScrollView 
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cameraNames.length > 0 ? (
        cameraNames.map((name) => (
          <View key={name} style={{ marginVertical: 10 }}>
            <Button
              title={name.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
              onPress={() => navigation.navigate("DynamicScreen", {
                content: `${name}`,
              })}
            />
          </View>
        ))
      ) : (
        <Text>Loading cameras...</Text>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
