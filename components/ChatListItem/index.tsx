import React from "react";
import { View, Text } from "react-native";
import { Chatroom } from "../../types";

const chatListItem = (chatRoom: Chatroom) => {
    return (
        <View>
            <Text>{chatRoom.lastMessage.content}</Text>
        </View>
    )

};

export default chatListItem;