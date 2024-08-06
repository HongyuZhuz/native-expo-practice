import { ScrollView } from "react-native"
import { Stack } from "expo-router"
import MonthlyExpense from "@/app/ui/home/monthlyExpense"
import { useEffect,useState } from "react"
import { getLatestMonthTotalExpense } from "@/app/data/calculate"
import { Test } from "@/app/ui/home/test"


export default function HomePage() {
  const [expense,setExpense] = useState(0);

  useEffect(()=>{
    async function fetchExpense() {
      const totalExpense = await getLatestMonthTotalExpense();
      setExpense(totalExpense);
    }
    
    fetchExpense();
  },[])
  return (
    <ScrollView>
      <Stack.Screen
      options={{ headerShown: true, title:'Home'}}></Stack.Screen>
      <MonthlyExpense month="Aug" expense={expense} income={874.21}/>
      <Test></Test>
    </ScrollView>
  )
}



