import {Text, View,Button} from 'react-native'
import { useEffect} from 'react';
import { createTable, createAccount, } from './data/database';
import AccountTable from './ui/accountTable';


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
      <Text style = {{color:`white`}}>Here is the test</Text>
      <Button onPress={()=>createAccount('test2')} title='createAccount'></Button>
      <AccountTable/>
      
    </View>
  );
}
