import { ScrollView } from "react-native"
import { Stack } from "expo-router"
import MonthlyExpense from "@/app/ui/home/monthlyExpense"


export default function HomePage() {
<Stack.Screen
      options={{ headerShown: true, title:'Calendar'}}></Stack.Screen>

  return (
    <ScrollView>
      <Stack.Screen
      options={{ headerShown: true, title:'Home'}}></Stack.Screen>
      <MonthlyExpense month="Aug" expense={1316.43} income={874.21}/>
    </ScrollView>
  )
}



