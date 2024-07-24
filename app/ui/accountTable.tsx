import { useEffect,useState } from 'react';
import { Timestamp } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';
import { getAccounts } from '../data/database';
import { View,Text,ScrollView } from 'react-native';
export default function AccountTable() {
    const [accounts, setAccounts] = useState([] as Array<{account_id:string,account_name:string,account_balance:number,created_at:Timestamp}>)
    const fetchData = async () =>{
        const accountsData = await getAccounts()
        setAccounts(accountsData as Array<{account_id:string,account_name:string,account_balance:number,created_at:Timestamp}>)
      }

    useEffect(()=>{
        
        fetchData()
      },[])
      console.log(accounts)

    return(
        <ScrollView>
            <View>
            {accounts.map((account) => (
          <View key={account.account_id} >
          <Text style = {{color:`white`}}>Account Name: {account.account_name}</Text>
          <Text style = {{color:`white`}}>Account Balance: {account.account_balance}</Text>
          <Text style = {{color:`white`}}>Created At: {new Date(account.created_at).toLocaleDateString()}</Text>
        </View>
        ))}
        </View>
        </ScrollView>
        
    )

}