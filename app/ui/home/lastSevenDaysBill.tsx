import { View, Text, TouchableWithoutFeedback, StyleSheet,SectionList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState,useEffect } from "react";
import { getLatestWeekBill } from "@/app/data/database";
import { Bill, BillIncludeAccountName,Section } from "@/assets/definition";
import { groupBillsByDate, totalExpense, totalIncome } from "@/app/data/calculate";
import { FormattedAmount,FormatDate } from "@/app/data/format";


export default function LastSevenDayBillsSectionList() {
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
    <View style={styles.container}>
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
        <LastSevenDayBillsHeader/>
      )}
      ListFooterComponent={() => (
        <View style={{ padding: 10 }}>
          
        </View>
      )}
      scrollEnabled={false}  
      contentContainerStyle={{ paddingBottom: 20 }} 
    />
  </View>
  )
}

export function LastSevenDayBillsHeader () {
    return (
        <View>
            <View style={styles.firstLine}>
                <Text style={{color:'white', fontSize:16, fontWeight:'600'}}>Last 7 Days Bills</Text>
                <TouchableWithoutFeedback><View style={{flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
                    <Text style={{color:'gray'}}>All Bills </Text> 
                    <Ionicons name="chevron-forward-outline"  size={16} color={'gray'}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
          
        </View>
    )
}




function ListItem ({bill}:{bill:BillIncludeAccountName}) {
  return(
    <View style={{flex:1, flexDirection:'row',marginVertical:3}}>
      {bill.icon_name?<Ionicons name={bill.icon_name as any}/>:<Ionicons name="accessibility-outline" color={'white'} style={{fontSize:20}}/>}
      <Text style={{color:'white'}}>{bill.created_at + bill.type+bill.amount+bill.account_name}</Text>
    </View>
  )
}

function SectionHeader({section}:{section:Section}) {
  const expense =totalExpense(section.data)
  const income = totalIncome(section.data)
  return(
    
      <View style={styles.sectionHeader}>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={styles.verticalLine}/>
          <Text style={{color:'white'}}><FormatDate dateString={section.title}/></Text>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
          {income?<Text style={styles.sectionHeaderText}><Text style={{color:'gray'}}> Income</Text> <FormattedAmount amount={income} currency={'AUD'}/></Text>:<></>}
          {expense?<Text style={styles.sectionHeaderText}><Text style={{color:'gray'}}> Expense</Text> <FormattedAmount amount={expense} currency={'AUD'}/></Text>:<></>}
        </View>
    </View>
   
    
  )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#0e0e0e',
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
        paddingHorizontal:10,
        marginBottom:10
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
    sectionHeader:{
      backgroundColor: 'rgba(230, 145, 56, 0.2)',
      flex:1,
      justifyContent:'space-between',
      flexDirection:'row',
      paddingHorizontal:10,
      paddingVertical:5,
    },
    sectionHeaderText:{
      color:'white',
      fontSize:10,
      fontWeight:'600'
    },
    verticalLine: {
      width: 3, 
      height: '100%',
      backgroundColor: 'orange', 
      marginRight: 5, 
      borderRadius:10,
    },
})

