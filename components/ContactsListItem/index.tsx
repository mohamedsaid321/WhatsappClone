import React from "react";
import { View, Text, Image } from "react-native";
import { User } from "../../types";
import styles from "./style";
import moment from "moment";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { graphqlOperation, API, Auth } from "aws-amplify";
import {
  createChatRoom,
  createChatRoomUser,
} from "../../src/graphql/mutations";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const [isGroup, setISGroup] = useState(false);
  //const arr;
  var x = 0;

  const navigation = useNavigation();

  const onClick = async () => {
    console.warn("Hello");

    try {
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {
          input: {},
        })
      );

      if (!newChatRoomData.data) {
        console.log("Failed to create a room");
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;

      //Add user to The chatRoom
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: { userID: user.id, chatRoomID: newChatRoom.id },
        })
      );

      //Add Authenticated user to the ChatRoom
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      navigation.navigate("ChatRoom", {
        id: newChatRoom.id,
        name: user.name,
      });
    } catch (e) {}
  };

  const onPressDots = () => {
    console.warn("I'm Pressed");
    setISGroup((current) => {
      return opposite(current);
    });
    console.log(isGroup);
  };
  const opposite = (prevState) => {
    return !prevState;
  };

  const groupColor = () => {
    return isGroup ? "black" : "white";
  };

  useEffect(() => {
    const setUpGroupIcon = async () => {
      x = x + 1;
      console.log(x);
      console.log(user.name);
      navigation.setOptions({
        headerRight: () => (
          <View
            style={{
              backgroundColor: Colors.light.tint,
              alignContent: "flex-end",
            }}
          >
            <TouchableOpacity onPress={onPressDots}>
              <MaterialIcons name="group-add" size={28} color={groupColor()} />
            </TouchableOpacity>
          </View>
        ),
      });
    };
    setUpGroupIcon();
  }, [isGroup]);

  return user == undefined ? null : (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
