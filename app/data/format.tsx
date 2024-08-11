import { IntlProvider,FormattedNumber, FormattedDateParts } from "react-intl"
import { Text,StyleSheet } from "react-native"


export const FormattedAmount = ({amount, currency}:{amount:number,currency:string})=>{
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

export function FormatDate ({dateString}:{dateString:string}) {
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
        <IntlProvider locale="en">
      <Text style={styles.sectionHeaderText}>{label+" "}
      <FormattedDateParts value={date} month="short" day="numeric" weekday="short">{parts =>(<><Text>{parts[3].value+" "+ parts[5].value+" "+parts[0].value}</Text></>)}</FormattedDateParts>
      </Text></IntlProvider>
    )
  }

  const styles = StyleSheet.create({
    sectionHeaderText:{
      color:'white',
      fontSize:10,
      fontWeight:'600'
    },

})