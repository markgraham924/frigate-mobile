import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

const EventImageFetcher = ({ cameraID }) => {
  const [eventData, setEventData] = useState([]);

  // Function to fetch event data
  const fetchEventData = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.92:5000/api/events?limit=5&zones=driveway&camera=${cameraID}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const processedData = data.map((event) => ({
          id: event.id,
          label: event.label,
          starttime: new Date(event.start_time * 1000).toLocaleString(),
          endtime: event.end_time
            ? new Date(event.end_time * 1000).toLocaleString()
            : null,
          clip: event.has_clip,
          imageUrl: `http://192.168.0.92:5000/api/events/${event.id}/thumbnail.jpg?format=android`,
        }));
        setEventData(processedData);
      } else {
        setEventData([]);
      }
    } catch (error) {
      console.error("Failed to fetch event data:", error);
    }
  };

  // Effect hook to fetch data when the component mounts or the cameraID prop changes
  useEffect(() => {
    fetchEventData();
  }, [cameraID]); // Dependency array includes cameraID to refetch when it changes

  // Function to handle manual refresh
  const handleRefresh = () => {
    fetchEventData();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {eventData.map((event) => (
          <View
            key={event.id}
            style={[
              styles.card,
              event.endtime === null ? styles.cardHighlight : null,
            ]}
          >
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Label: {event.label}</Text>
              <Text style={styles.cardText}>Start Time: {event.starttime}</Text>
              {event.endtime && (
                <Text style={styles.cardText}>End Time: {event.endtime}</Text>
              )}
              <Text style={styles.cardText}>
                {event.clip ? "Clip Available" : "No Clip Available"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Refresh Images" onPress={handleRefresh} />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
  scrollView: {
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    width: windowWidth * 0.9,
  },
  cardHighlight: {
    backgroundColor: "#dbf3e6",
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 10,
  },
  cardText: {
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default EventImageFetcher;
