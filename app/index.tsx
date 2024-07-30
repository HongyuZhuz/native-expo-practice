import {Text, View,Button} from 'react-native'
import { useEffect} from 'react';
import { createTable, createAccount, deleteAccountById, deleteAllAccounts, updateAccount, createBill,deleteBill} from './data/database';
import AccountTable from './ui/accountTable';
import BillTable from './ui/billTable';


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
      <View>
        <Button onPress={()=>createBill('b6c870be-7a64-4f2a-b1bb-d7aaafca14cc','transfer',5,'cf70b257-02ec-400b-b4d3-a4a8df8d6309','cf70b257-02ec-400b-b4d3-a4a8df8d6309')} title = 'Create Bill'></Button>
      </View>
      
      <View style={{alignItems:'center'}}>
        <AccountTable/>
      </View>
      <View>
        <BillTable/>
      </View>
  
  <View>
      <Button onPress={()=>deleteAccountById('a48e4a99-e063-4c79-814e-6cd95f594ffd')} title = 'delete account'></Button>
      <Button onPress={()=>deleteAllAccounts()} title = 'delete all accounts'></Button>
      <Button onPress={()=>updateAccount('b6c870be-7a64-4f2a-b1bb-d7aaafca14cc','updated')} title = 'update account'></Button>
      <Button onPress={()=>deleteBill('0819ce6b-3fb5-40ba-93d4-517b4e0f4b8a')} title = 'delete bill'></Button>
  </View>
    </View>
  );
}
