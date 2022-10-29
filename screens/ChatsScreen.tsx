import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import ChatListItem from "../components/ChatListItem";

import ChatRooms from "../data/ChatRooms";

import { FlatList } from "react-native";
import NewMessageButton from "../components/NewMessageButton";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { getUser } from "./queries";
import { useEffect, useState } from "react";

export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        const userData = await API.graphql(
          graphqlOperation(getUser, {
            id: userInfo.attributes.sub,
          })
        );
        setChatRooms(userData.data.getUser.chatRoomUsers.items);
        console.log("userData");
        console.log(userData.data.getUser.chatRoomUsers.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
