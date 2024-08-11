import { StyleSheet, View,Text } from "react-native"
import { FormattedAmount } from "@/app/data/format"

export default function MonthlyExpense ({month,expense,income,currency}:{month:string,expense:number,income:number,currency:string}) {
    const balance = income-expense
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.month}>{month}</Text>
                <Text>.Expense</Text>
            </View>
            <Text style={styles.expense}> <FormattedAmount amount={expense} currency={currency}/></Text>
            <View style={styles.details}>
                <Text>Income <FormattedAmount amount={income} currency={currency}/></Text>
                <Text style={{marginLeft:20}}>Balance <FormattedAmount amount={balance} currency={currency}/></Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#F9E79F',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        margin:10
    },
    month:{
        fontSize:20,
        fontWeight:'500'
    },
    expense: {
        fontSize: 40,
        marginBottom: 10,
        fontWeight:'500'
      },
    details: {
        flexDirection: 'row',
        alignItems:'flex-end',
        marginBottom:10
      },
})