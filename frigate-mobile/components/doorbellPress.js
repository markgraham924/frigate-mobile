import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";

const EventImageFetcher = ({ cameraID, refreshTrigger, apiAttributes }) => {
  const [eventData, setEventData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEventData = async () => {
    let queryParams = [];
    queryParams.push(`camera=${cameraID}`);
    queryParams.push("limit=50");
    if (apiAttributes.Zone) {
      queryParams.push("zones=driveway");
    }
    if (apiAttributes.Person && apiAttributes.Car) {
      queryParams.push("labels=person,car");
    } else {
      if (apiAttributes.Person) {
        queryParams.push("labels=person");
      }
      if (apiAttributes.Car) {
        queryParams.push("labels=car");
      }
    }
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    setRefreshing(true);
    try {
      const response = await fetch(
        `http://192.168.0.92:5000/api/events${queryString}`
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
          //or can use thumbnail
          imageUrl: `http://192.168.0.92:5000/api/events/${event.id}/snapshot.jpg?format=android`,
        }));
        setEventData(processedData);
      } else {
        setEventData([]);
      }
    } catch (error) {
      console.error("Failed to fetch event data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [cameraID, refreshTrigger, apiAttributes]);

  return (
    <View style={styles.container}>
      <FlatList
        data={eventData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          //console.log(item),
          <View
            style={[
              styles.card,
              item.endtime === null ? styles.cardHighlight : null,
            ]}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Label: {item.label}</Text>
              <Text style={styles.cardText}>Start Time: {item.starttime}</Text>
              {item.endtime && (
                <Text style={styles.cardText}>End Time: {item.endtime}</Text>
              )}
              <Text style={styles.cardText}>
                {item.clip ? "Clip Available" : "No Clip Available"}
              </Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchEventData} />
        }
        contentContainerStyle={styles.scrollView}
      />
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default EventImageFetcher;
