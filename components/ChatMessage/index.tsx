import { Message } from "../../types";
import { Text } from "react-native";
import { View } from "../Themed";
import moment from "moment";
import styles from "./style";

export type ChatMessageProps = {
  message: Message;
  myId: String;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message, myId } = props;

  const isMyMessage = () => {
    return message.user.id == myId;
  };

  return (
    <View style={styles.container}>
      <View
        style={
          (styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#DCFBC5" : "#e5e5e5",
            marginRight: isMyMessage() ? 0 : 50,
            marginLeft: isMyMessage() ? 50 : 0,
            borderRadius: 30,
            padding: 10,
          })
        }
      >
        {isMyMessage() ? null : (
          <Text style={styles.name}>{message.user.name}</Text>
        )}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;
