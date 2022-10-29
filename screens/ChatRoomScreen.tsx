import React from "react";
import { Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList, ImageBackground } from "react-native";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { messagesByChatRoom } from "../src/graphql/queries";
import { useEffect, useState } from "react";
import { onCreateMessage } from "../src/graphql/subscriptions";
import { KeyboardAvoidingView } from "react-native";

const ChatRoomScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  console.log(route.params);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        })
      );

      setMessages(messagesData.data.messagesByChatRoom.items);
    };
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(messagesByChatRoom, {
        chatRoomID: route.params.id,
        sortDirection: "DESC",
      })
    );

    console.log("FETCH MESSAGES");
    setMessages(messagesData.data.messagesByChatRoom.items);
  };

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      setMyId(userInfo.attributes.sub);
    };
    getMyId();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          return;
        }
        //setMessages([newMessage, ...messages]);
        fetchMessages();
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%", height: "100%" }}
    >
      <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
          inverted
        />
        <InputBox chatRoomID={route.params.id} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
