import {Text, View,Button} from 'react-native'
import { useEffect } from 'react';
import { createTable } from './data/database';
import { createAccount } from './data/database';


export default function Index() {
  useEffect(()=>{
    createTable()
  },[])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style = {{color:`white`}}>Edit app/index.tsx to edit this screen</Text>
      <Button onPress={()=>createAccount('travel')} title='createAccount'></Button>
      
    </View>
  );
}
