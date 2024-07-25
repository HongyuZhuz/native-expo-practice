import {Text, View,Button} from 'react-native'
import { useEffect} from 'react';
import { createTable, createAccount, deleteAccountById, deleteAllAccounts} from './data/database';
import AccountTable from './ui/accountTable';


export default function Index() {
  useEffect(()=>{
    createTable()
  },[])


  return (
    <View
      style={{
        flex: 1,
        padding:10,
        justifyContent:'space-evenly'
      }}
    >
      <View>
      <Text style = {{color:`white`}}>Here is the test</Text>
      <Button onPress={()=>createAccount('test2')} title='createAccount'></Button>
      </View>
      
      <View style={{alignItems:'center'}}>
        <AccountTable/>
      </View>
  
  <View>
      <Button onPress={()=>deleteAccountById('a48e4a99-e063-4c79-814e-6cd95f594ffd')} title = 'delete account'></Button>
      <Button onPress={()=>deleteAllAccounts()} title = 'delete all accounts'></Button>
      </View>
      
      
    </View>
  );
}
