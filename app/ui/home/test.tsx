import {Text, View,Button} from 'react-native'
import { useEffect} from 'react';
import { createTable, createAccount, deleteAccountById, deleteAllAccounts, updateAccount, createBill,deleteBill,updateBill} from '../../data/database';
import AccountTable from '../../ui/accountTable';
import BillTable from '../../ui/billTable';
import { Stack } from 'expo-router';

export function Test () {
    useEffect(()=>{
      createTable()
    },[])
  
    return(
      <View
        style={{
          flex: 1,
          padding:10,
          justifyContent:'space-evenly'
        }}
      >
        <Stack.Screen
        options={{ headerShown: true, title:'Home'}}></Stack.Screen>
        <View>
        <Text style = {{color:`white`}}>Here is the test</Text>
        <Button onPress={()=>createAccount('test3')} title='createAccount'></Button>
        </View>
        <View>
          <Button onPress={()=>createBill('c42a5364-5b5f-4276-9b5b-18269f2e80b7','income',1000,'','')} title = 'Create Bill'></Button>
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
        <Button onPress={()=>deleteBill('c42a5364-5b5f-4276-9b5b-18269f2e80b7')} title = 'delete bill'></Button>
        <Button title='update bill test' onPress={()=>updateBill('86be3836-ab71-44ff-b7e9-b50768b0ce92','c42a5364-5b5f-4276-9b5b-18269f2e80b7','cost',25,"test","","2024-07-26 01:50:36")}></Button>
    </View>
      </View>
    )
  }