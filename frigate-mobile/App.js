import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import HomeScreen from "./screens/HomeScreen";
import FrontDoorScreen from "./screens/FrontDoorScreen"; // Screen that displays doorbell press events
import DynamicScreen from "./screens/DynamicScreen"; // Screen that displays dynamic content

const Stack = createNativeStackNavigator();

const App = () => {
  const [dynamicScreens, setDynamicScreens] = useState([]);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await fetch("http://192.168.0.92:5000/api/stats");
        const data = await response.json();
        // Assuming the API response format you provided
        const cameraNames = Object.keys(data.cameras);

        // Transform camera names into a suitable format for dynamicScreens
        const transformedScreens = cameraNames.map((name) => ({
          screenName: name
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()), // Format name
          content: `${name} camera details`, // Placeholder content, adjust as needed
        }));

        setDynamicScreens(transformedScreens);
      } catch (error) {
        console.error("Failed to fetch screens:", error);
      }
    };

    fetchScreens();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ dynamicScreens }}
          />
          <Stack.Screen name="DynamicScreen" component={DynamicScreen} />
          <Stack.Screen name="Front Door" component={FrontDoorScreen} />
          {dynamicScreens.map(({ screenName, content }, index) => (
            <Stack.Screen
              key={index}
              name={screenName}
              component={DynamicScreen}
              initialParams={{ content }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
