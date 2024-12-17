import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const KeyboardAvoidingWrapper = ({ children, scrollEnabled }) => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })} // Adjust based on status bar height
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={scrollEnabled}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>; // For Android, no keyboard avoidance needed
};

export default KeyboardAvoidingWrapper;
