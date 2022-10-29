/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import MainTabNavigator from "./MainTabNavigator";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";
import { TouchableOpacity } from "react-native";

import { View } from "../components/Themed";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "WhatsApp",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.light.tint,
                width: 60,
                justifyContent: "space-between",
                merginRight: 10,
              }}
            >
              <Octicons name="search" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.light.tint,
                width: 100,
                justifyContent: "space-between",
                merginRight: 10,
              }}
            >
              <FontAwesome5 name="video" size={22} color={"white"} />
              <MaterialIcons name="call" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          title: "Contacts",
          headerRight: ({ navigation, route }) => (
            <View
              style={{
                backgroundColor: Colors.light.tint,
                alignContent: "flex-end",
              }}
            >
              <TouchableOpacity>
                <MaterialIcons name="group-add" size={28} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
