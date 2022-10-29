import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify } from "aws-amplify";
import awsmobile from "./src/aws-exports";
import { useEffect } from "react";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure(awsmobile);

const randomImages = [
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  //run this only when app is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      //get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(getUser, {
            id: userInfo.attributes.sub,
          })
        );

        if (userData.data.getUser) {
          console.log("user already exists");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "Hey, I am using whats app",
        };

        await API.graphql({
          query: createUser,
          variables: { input: newUser },
        });
      }
    };
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
