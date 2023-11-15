import React, {useRef} from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {captureRef} from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import ExampleTable from "./Table";

export default function App() {
  const ref = useRef();

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(ref, {
        height: 440,
        quality: 1,
        format: "jpg",
        // snapshotContentContainer: true,
      });
      console.log("before media library");
      await MediaLibrary.requestPermissionsAsync();
      await MediaLibrary.saveToLibraryAsync(localUri);
      console.log("after media library");
      console.log("local uri", localUri);
      if (localUri) {
        Alert.alert("Saved!", "Your image is successfully saved!", [
          {text: "OK", onPress: () => console.log("OK Pressed")},
        ]);
      }
    } catch (e) {
      console.log("ERROR", e);
      alert("error!", e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal>
          <View
            ref={ref}
            collapsable={false}
            style={{backgroundColor: "yellow", marginTop: 100}}
          >
            <ExampleTable />
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 5,
          marginBottom: 50,
        }}
        onPress={onSaveImageAsync}
      >
        <Text>Save to gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
