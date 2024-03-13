import React from 'react';
import { View, Text } from 'react-native';
import EventImageFetcher from '../components/doorbellPress';

const FrontDoorScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <EventImageFetcher />
    </View>
  );
};

export default FrontDoorScreen;
