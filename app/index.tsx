import {Text, View,Button} from 'react-native'
import { useEffect} from 'react';
import { createTable, createAccount, deleteAccountById, deleteAllAccounts, updateAccount, createBill,deleteBill,updateBill} from './data/database';
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
      <Button onPress={()=>deleteBill('23c66c78-6a71-418d-a6f7-217538d17596')} title = 'delete bill'></Button>
      <Button title='update bill test' onPress={()=>updateBill('d82c5745-c3cc-4728-9cac-324641c0912f','b6c870be-7a64-4f2a-b1bb-d7aaafca14cc','cost',25,"test","","2024-07-26 01:50:36")}></Button>
  </View>
    </View>
  );
}
