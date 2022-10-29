import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "transparent" },
  messageBox: {
    borderRadius: 30,
    padding: 10,
  },

  name: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginBottom: 5,
  },

  message: {},

  time: {
    alignSelf: "flex-end",
  },
});

export default styles;
