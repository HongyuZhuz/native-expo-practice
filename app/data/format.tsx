import { IntlProvider,FormattedNumber, FormattedDateParts } from "react-intl"
import { Text,StyleSheet,Image } from "react-native"
import { BillIncludeAccountName } from "@/assets/definition";


export function Icon({ name }: { name: string }) {
  return <Image src={require('../../assets/icons/shopping.svg')} alt={name} style={{ width: 24, height: 24, }}/>;
}

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

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  
  // 获取小时和分钟
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  
  // 如果小时或分钟小于10，补充前导0
  if (hours.length < 2) {
      hours = '0' + hours;
  }
  if (minutes.length < 2) {
      minutes = '0' + minutes;
  }
  
  // 返回格式化的时间
  return `${hours}:${minutes}`;
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


export function changeBillsToLocalTime(bills:BillIncludeAccountName[]):BillIncludeAccountName[]{
  bills.forEach((bill) => {
    const localTimeString = getLocalTime(bill.created_at);
    bill.created_at = localTimeString;
  });
  return bills;
}

function getLocalTime (time:string):string {
  const utcDate = new Date(time);

  // 将UTC时间转换为本地时间
  const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

  // 手动提取和格式化各个时间部分
  const year = localDate.getFullYear();
  const month = ('0' + (localDate.getMonth() + 1)).slice(-2);
  const day = ('0' + localDate.getDate()).slice(-2);
  const hours = ('0' + localDate.getHours()).slice(-2);
  const minutes = ('0' + localDate.getMinutes()).slice(-2);
  const seconds = ('0' + localDate.getSeconds()).slice(-2);

  const localDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return localDateString;
}