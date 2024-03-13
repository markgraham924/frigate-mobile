import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventImageFetcher from '../components/doorbellPress';

const DynamicScreen = ({ route }) => {
  // Extracting the content parameter passed from the HomeScreen
  const { content } = route.params;
  console.log(content);
  return (
    <View style={styles.container}>
      
      <EventImageFetcher cameraID={content} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default DynamicScreen;
