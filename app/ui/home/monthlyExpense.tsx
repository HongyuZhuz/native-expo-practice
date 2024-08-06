import { StyleSheet, View,Text } from "react-native"
import { IntlProvider,FormattedNumber } from "react-intl"

export default function MonthlyExpense ({month,expense,income}:{month:string,expense:number,income:number}) {
    const balance = income-expense
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.month}>{month}</Text>
                <Text>.Expense</Text>
            </View>
            <Text style={styles.expense}> <FormattedAmount amount={expense} currency="AUD"/></Text>
            <View style={styles.details}>
                <Text>Income {income}</Text>
                <Text style={{marginLeft:20}}>Balance <FormattedAmount amount={balance} currency="AUD"/></Text>
            </View>
        </View>
    )
}

const FormattedAmount = ({amount, currency}:{amount:number,currency:string})=>{
    return(
        <IntlProvider locale="en">
            <Text>
                <FormattedNumber 
                    value={amount} 
                    style="currency"
                    currency={currency}
                    minimumFractionDigits={2} 
                    maximumFractionDigits={2}
                    />
            </Text>
        </IntlProvider>
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