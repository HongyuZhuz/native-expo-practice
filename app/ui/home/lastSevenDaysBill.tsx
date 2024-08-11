import { View, Text, TouchableWithoutFeedback, StyleSheet,SectionList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState,useEffect } from "react";
import { getLatestWeekBill } from "@/app/data/database";
import { Bill, BillIncludeAccountName,Section } from "@/assets/definition";
import { groupBillsByDate } from "@/app/data/calculate";
import { FormattedDate, FormattedDateParts, IntlProvider} from "react-intl";


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
          <Text style={{ fontWeight: 'bold' }}>没有更多账单</Text>
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




function ListItem ({bill}:{bill:Bill}) {
  return(
    <View>
      <Text style={{color:'white'}}>{bill.amount}</Text>
    </View>
  )
}

function SectionHeader({section}:{section:Section}) {
  return(
    <IntlProvider locale='en'>
      <View style={styles.sectionHeader}>
        <View style={styles.verticalLine}/>
        <Text style={{color:'white'}}><FormatDate dateString={section.title}/></Text>
        
      
    </View>
    </IntlProvider>
    
  )
}

function FormatDate ({dateString}:{dateString:string}) {
  const date = new Date(dateString);
  const now  = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate()-1);

  let label = '';
  if(date.toDateString()===now.toDateString()){
    label = 'Today';
  }else if (date.toDateString()===yesterday.toDateString()){
    label='Yesterday'
  }



  return(
    <Text style={styles.sectionHeaderText}>{label+" "}
    <FormattedDateParts value={date} month="short" day="numeric" weekday="short">{parts =>(<><Text>{parts[3].value+" "+ parts[5].value+" "+parts[0].value}</Text></>)}</FormattedDateParts>
    </Text>
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
        paddingHorizontal:20,
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
      flexDirection:'row',
      paddingHorizontal:20,
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

