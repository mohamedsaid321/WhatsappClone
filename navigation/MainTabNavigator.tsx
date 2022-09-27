import { FontAwesome } from '@expo/vector-icons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import Colors from '../constants/Colors';
import ChatsScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import useColorScheme from '../hooks/useColorScheme';
import {MainTabParamList , RootTabScreenProps } from '../types';
import {Pressable} from 'react-native';
import { Fontisto } from '@expo/vector-icons';









/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
 const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

 export default function  MainTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <MainTab.Navigator
       initialRouteName="Chats"
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].background,
         tabBarStyle:{
            backgroundColor: Colors[colorScheme].tint,
         },
         tabBarIndicatorStyle:{
            backgroundColor: Colors[colorScheme].background,
            height:5,
         },
         tabBarLabelStyle:{
            fontWeight:'bold',
         }
       }}>
       <MainTab.Screen
         name="Camera"
         component={ChatsScreen}
         options={({ navigation }: RootTabScreenProps<'Camera'>) => ({
           tabBarIcon: ({ color }) => <Fontisto name='camera' color={color} />,
           tabBarLabel: () => null,
           headerRight: () => (
             <Pressable
               onPress={() => navigation.navigate('Modal')}
               style={({ pressed }) => ({
                 opacity: pressed ? 0.5 : 1,
               })}>
               <FontAwesome
                 name="info-circle"
                 size={25}
                 color={Colors[colorScheme].text}
                 style={{ marginRight: 15 }}
               />
             </Pressable>
           ),
         })}
       />
       <MainTab.Screen
         name="Chats"
         component={ChatsScreen}
       />

        <MainTab.Screen
         name="Status"
         component={TabTwoScreen}
       />

        <MainTab.Screen
         name="Calls"
         component={TabTwoScreen}
       />

     </MainTab.Navigator>
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 