import React, { useEffect, useState } from 'react';
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native';

const EventImageFetcher = () => {
  const [eventId, setEventId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchEventData = async () => {
    try {
      const response = await fetch('http://192.168.0.92:5000/api/events?limit=1&zones=driveway&camera=front_drive');
      const data = await response.json();
      
      // Assuming the response data is an array and taking the first item's id
      if (data.length > 0) {
        setEventId(data[0].id);
      } else {
        // Reset event ID and image URL if no data is returned
        setEventId('');
        setImageUrl('');
      }
    } catch (error) {
      console.error("Failed to fetch event data:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  useEffect(() => {
    if (eventId) {
      // Construct the image URL using the event ID
      setImageUrl(`http://192.168.0.92:5000/api/events/${eventId}/thumbnail.jpg?format=android`);
    }
  }, [eventId]);

  const handleRefresh = () => {
    fetchEventData();
  };

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          <Button title="Refresh Image" onPress={handleRefresh} />
        </>
      ) : (
        <Button title="Fetch Event Image" onPress={fetchEventData} />
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.9,
    marginBottom: 20, // Add some space between the image and the refresh button
  },
});

export default EventImageFetcher;
