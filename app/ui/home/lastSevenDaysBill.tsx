import { View, Text, TouchableWithoutFeedback, StyleSheet,SectionList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState,useEffect } from "react";
import { getLatestWeekBill } from "@/app/data/database";
import { Bill, BillIncludeAccountName,Section } from "@/assets/definition";
import { groupBillsByDate } from "@/app/data/calculate";

export default function LastSevenDayBills () {
    return (
        <View style={styles.container}>
            <View style={styles.firstLine}>
                <Text style={{color:'white', fontSize:16, fontWeight:'600'}}>Last 7 Days Bills</Text>
                <TouchableWithoutFeedback><View style={{flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
                    <Text style={{color:'gray'}}>All Bills </Text> 
                    <Ionicons name="chevron-forward-outline"  size={16} color={'gray'}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <LastSevenDayBillsSectionList/>
        </View>
    )
}


function LastSevenDayBillsSectionList() {
    const [data,setData] = useState<BillIncludeAccountName[]>([])
    const [section,setSection] = useState<Section[]>([])

    useEffect(()=>{
        async function fetchExpense() {
            const LastSevenDayBills = await getLatestWeekBill();
            if (LastSevenDayBills){
                setData(LastSevenDayBills)
            }  
          }
        fetchExpense()   
    },[])

    useEffect(()=>{
        const sectionData = groupBillsByDate(data)
        setSection(sectionData);
    },[data]
    )


    return(
        <View style={{ flex: 1, padding: 16 }}>
      <SectionList
        sections={section}
        keyExtractor={(item) => item.bill_id}
        renderItem={({ item }) => (
          <ListItem bill={item}/>
        )}
        renderSectionHeader={({section}) => (
          <SectionHeader section={section}/>
        )}
        ListHeaderComponent={() => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>最近七天的账单</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>没有更多账单</Text>
          </View>
        )}
        scrollEnabled={false}  
        contentContainerStyle={{ paddingBottom: 20 }} 
      />
    </View>
    )
}

function ListItem ({bill}:{bill:Bill}) {
  return(
    <View>
      <Text style={{color:'white'}}>{bill.amount}</Text>
    </View>
  )
}

function SectionHeader({section}:{section:Section}) {
  return(
    <View>
      <Text style={{color:'white'}}>{section.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#0e0e0e',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        margin:10
    },
    firstLine:{
        flex:1,
        flexDirection:'row',
        fontSize: 20,
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    expense: {
        fontSize: 40,
        marginBottom: 20,
      },
    details: {
        flexDirection: 'row',
        alignItems:'flex-end',
        marginBottom:10
      },
})

