import React, { useLayoutEffect, useState } from "react"; // Corrected import
import { Text, View, Button, StyleSheet } from "react-native";
import EventImageFetcher from "../components/doorbellPress"; // Ensure the path is correct
import FilterComponent from "../components/filterComponent"; // Assuming FilterComponent is in the same directory

const DynamicScreen = ({ navigation, route }) => {
  const [cameraID, setCameraID] = useState(route.params.content);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiAttributes, setApiAttributes] = useState({
    Zone: false,
    Person: false,
    Car: false,
  }); // New state for API attributes

  const handleRefresh = () => setRefreshKey((prevKey) => prevKey + 1);

  const handleToggleChange = (toggles) => {
    setApiAttributes(toggles);
  };

  const { content } = route.params;
  let screenTitle = route.params.screenTitle || content;

  // Transformations applied to screenTitle
  screenTitle = screenTitle
    .replace(/_/g, " ") // Replace all underscores with spaces
    .replace(/\b\w/g, letter => letter.toUpperCase()); // Capitalize the first letter of each word

  // Set the screen title using navigation.setOptions
  useLayoutEffect(() => {
    navigation.setOptions({ title: screenTitle });
  }, [navigation, screenTitle]);

  return (
    <>
      <View style={styles.container1}>
        <FilterComponent
          onRefresh={handleRefresh}
          apiAttributes={apiAttributes}
          onToggleChange={handleToggleChange}
        />
      </View>
      <View style={styles.container}>
        <EventImageFetcher
          cameraID={cameraID}
          refreshTrigger={refreshKey}
          apiAttributes={apiAttributes}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
  },
  container1: {
    padding: 5,
  },
  // Styles for 'text' and 'content' were removed as they were not used in this component
});

export default DynamicScreen;
