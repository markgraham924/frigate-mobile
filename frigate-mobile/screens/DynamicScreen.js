import React, { useLayoutEffect, useState } from 'react'; // Corrected import
import { Text, View, Button, StyleSheet } from 'react-native';
import EventImageFetcher from '../components/doorbellPress'; // Ensure the path is correct
import FilterComponent from '../components/filterComponent'; // Assuming FilterComponent is in the same directory

const DynamicScreen = ({ navigation, route }) => {
  const [cameraID, setCameraID] = useState(route.params.content);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiAttributes, setApiAttributes] = useState({
    Zone: false,
    Person: false,
    Car: false,
  }); // New state for API attributes

  const handleRefresh = () => setRefreshKey(prevKey => prevKey + 1);

  const handleToggleChange = (toggles) => {
    setApiAttributes(toggles);
  };


  const { content } = route.params;

  // Ensure useLayoutEffect is used if you need to set navigation options or perform effects based on navigation
  useLayoutEffect(() => {
    // Example: Set navigation options here if needed
  }, [navigation]);

  return (
    <>
      <View style={styles.container1}>
        {/* Pass down the apiAttributes and the method to update them */}
        <FilterComponent onRefresh={handleRefresh} apiAttributes={apiAttributes} onToggleChange={handleToggleChange} />
      </View>
      <View style={styles.container}>
        {/* Pass down apiAttributes so EventImageFetcher can use them to modify the API call */}
        <EventImageFetcher cameraID={cameraID} refreshTrigger={refreshKey} apiAttributes={apiAttributes} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container1: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
  // Styles for 'text' and 'content' were removed as they were not used in this component
});

export default DynamicScreen;
