import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../src/graphql/mutations";
import { useEffect } from "react";

const InputBox = (props) => {
  const [message, setMessage] = useState("");
  const [myUserId, setMyUserId] = useState(null);
  const { chatRoomID } = props;

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setMyUserId(userInfo.attributes.sub);
    };
    fetchUser();
  }, []);

  const onMicrophonePress = () => {
    console.log("microphone is pressed");
  };

  const updateChatRoomLastMessage = async (messageId: string) => {
    try {
      const updateLastMessage = await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: { id: chatRoomID, lastMessageID: messageId },
        })
      );
      console.log(messageId);
      console.log(chatRoomID);
    } catch (e) {
      console.log(e);
    }
  };
  const onSendPress = async () => {
    try {
      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, {
          input: { content: message, userID: myUserId, chatRoomID: chatRoomID },
        })
      );
      updateChatRoomLastMessage(newMessageData.data.createMessage.id);
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color={"grey"} />
        <TextInput
          placeholder={"Type a message..."}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <FontAwesome5
          name="paperclip"
          size={24}
          color={"grey"}
          style={styles.icon}
        />
        {!message && (
          <FontAwesome5
            name="camera"
            size={24}
            color={"grey"}
            style={styles.icon}
          />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons
              name="microphone"
              size={28}
              color={"white"}
            />
          ) : (
            <MaterialIcons name="send" size={28} color={"white"} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
