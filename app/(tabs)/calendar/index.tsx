import {Text, View,Button} from 'react-native'
import { Stack } from 'expo-router';
export default function Mine() {
   
  
    return (
      <View
        style={{
          flex: 1,
          padding:10,
          justifyContent:'space-evenly'
        }}
      >
        <Stack.Screen
      options={{ headerShown: true, title:'Calendar'}}></Stack.Screen>
        <Text  style = {{color:`white`}}>calendar</Text>
      </View>
    );
  }