import { ScrollView } from "react-native"
import { Stack } from "expo-router"
import MonthlyExpense from "@/app/ui/home/monthlyExpense"
import LastSevenDayBills from "@/app/ui/home/lastSevenDaysBill"
import { useEffect,useState } from "react"
import { getLatestMonthTotalExpense,getLatestMonthTotalIncome } from "@/app/data/calculate"
import { Test } from "@/app/ui/home/test"


export default function HomePage() {
  const [expense,setExpense] = useState(0);
  const [income,setIncome] = useState(0);

  useEffect(()=>{
    async function fetchExpense() {
      const totalExpense = await getLatestMonthTotalExpense();
      const totalIncome = await getLatestMonthTotalIncome();
      setExpense(totalExpense);
      setIncome(totalIncome);
    }
    
    fetchExpense();
  },[])
  return (
    <ScrollView>
      <Stack.Screen
      options={{ headerShown: true, title:'Home'}}></Stack.Screen>
      <MonthlyExpense month={getCurrentMonthAbbreviation()} expense={expense} income={income} currency="AUD"/>
      <LastSevenDayBills/>
      <Test></Test>
    </ScrollView>
  )
}

const getCurrentMonthAbbreviation = () => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
};



