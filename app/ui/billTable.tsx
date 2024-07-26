import { useEffect,useState } from 'react';
import { Timestamp } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';
import { getBills } from '../data/database';
import { View,Text,ScrollView } from 'react-native';
export default function AccountTable() {
    const [bills, setBills] = useState([] as Array<{bill_id:string,account_id:string,type:string,amount:number,description:string,created_at:Timestamp}>)
    const fetchData = async () =>{
        const billsData = await getBills()
        setBills(billsData as Array<{bill_id:string,account_id:string,type:string,amount:number,description:string,created_at:Timestamp}>)
      }

    useEffect(()=>{
        
        fetchData()
      },[])
      console.log(bills)

    return(
        <ScrollView>
            <View>
            {bills.map((bill) => (
          <View key={bill.bill_id} >
          <Text style = {{color:`white`}}>Bill Type: {bill.type}</Text>
          <Text style = {{color:`white`}}>Bill Amount: {bill.amount}</Text>
          <Text style = {{color:`white`}}>Created At: {new Date(bill.created_at).toLocaleDateString()}</Text>
        </View>
        ))}
        </View>
        </ScrollView>
        
    )

}