import { View, Text, TouchableWithoutFeedback, StyleSheet,SectionList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { BillIncludeAccountName,Section } from "@/assets/definition";
import { totalExpense, totalIncome } from "@/app/data/calculate";
import { FormattedAmount,FormatDate, formatTime } from "@/app/data/format";
import { Icon } from "@/assets/icons/icon";


export default function LastSevenDayBillsSectionList({section}:{section:Section[]}) {

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

  let content=<Text></Text>
  if(bill.type ==='cost'){
    content = <View style={listDetailStyles.rightPart}>
                  <Text style={listDetailStyles.amount}>{"-"}
                      <FormattedAmount amount = {bill.amount} currency="AUD"/>
                  </Text>
                  <Text style={listDetailStyles.accountName}>{bill.account_name}</Text></View>
  }else if (bill.type==='income'){
    content = <View style={listDetailStyles.rightPart}>
                  <Text style={listDetailStyles.amount}>{"+"}
                      <FormattedAmount amount = {bill.amount} currency="AUD"/>
                  </Text>
                  <Text style={listDetailStyles.accountName}>{bill.account_name}</Text></View>
    
  }else if (bill.type==='transfer'){
    content = <View style={listDetailStyles.rightPart}>
                  <Text style={listDetailStyles.amount}>
                      <FormattedAmount amount = {bill.amount} currency="AUD"/>
                  </Text>
              </View>
  }


  return(
    <View>
    <View style={listDetailStyles.mainView}>
    {bill.type==='transfer'?
    <View style={listDetailStyles.leftPart}>
      <View  style={listDetailStyles.iconView}>
        <Icon name = 'transfer'/>
      </View>
      <View style={listDetailStyles.categoryView}>
          <Text style={listDetailStyles.category}>{bill.account_name+" -> "+bill.target_account_name}</Text>
          <Text style={listDetailStyles.time}>{formatTime(bill.created_at)}</Text>
      </View>

    </View>:
    <View style={listDetailStyles.leftPart}>
        <View style={listDetailStyles.iconView}>
        {bill.icon_name?<Icon name={bill.icon_name}/>:<Icon name='undefined'/>}
        </View>
        <View style={listDetailStyles.categoryView}>
          {bill.category_name?(bill.parent_category_name?<Text style={listDetailStyles.category}>{bill.parent_category_name+"."+bill.category_name}</Text>:<Text style={listDetailStyles.category}>{bill.category_name}</Text>):<Text style={listDetailStyles.category}>Undefined</Text>}
          <Text style={listDetailStyles.time}>{formatTime(bill.created_at)}</Text>
        </View>
      </View>
    }
      
      {content}
    </View>
    <View style={listDetailStyles.divider}/>
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



const listDetailStyles = StyleSheet.create({
  mainView:{
    flex:1, 
    flexDirection:'row',
    marginVertical:6,
    justifyContent:'space-between',
    paddingHorizontal:5
  },
  divider:{
    borderColor:'gray',
    borderBottomWidth:0.25,
    marginHorizontal:15,
    padding:1,
    opacity: 0.3,
  },

  leftPart:{
    flex:1,
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:'center',
  },
  rightPart:{
    flex:0,
    flexDirection:'column',
    alignItems:'flex-end',
    justifyContent:'center'
  },
  category:{
    color:'white',
    fontSize:13
  },
  iconView:{
    flex:0,
    justifyContent:'center',
    alignItems:'center',
    padding:6,

  },
  categoryView:{
    flex:1,
    flexDirection:'column',

  },
  time:{
    color:'gray',
    fontSize:10,
  },
  amount:{
    color:'white',
    fontWeight:'600',
    fontSize:13
  },
  accountName:{
    color:'gray',
    fontSize:10,
  },
  
})

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

