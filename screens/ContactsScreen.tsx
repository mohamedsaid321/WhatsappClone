import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { FlatList } from "react-native";
import Users from "../data/Users";
import ContactListItem from "../components/ContactsListItem";
import MultiSelect from "react-native-multiple-select";
import { useState } from "react";

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={Users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
