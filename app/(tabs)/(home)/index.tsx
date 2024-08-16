import { ScrollView,RefreshControl,View,Animated } from "react-native"
import { Stack } from "expo-router"
import MonthlyExpense from "@/app/ui/home/monthlyExpense"
import LastSevenDayBillsSectionList from "@/app/ui/home/lastSevenDaysBill"
import { useEffect,useState } from "react"
import { getLatestMonthTotalExpense,getLatestMonthTotalIncome,groupBillsByDate } from "@/app/data/calculate"
import { Test } from "@/app/ui/home/test"
import { BillIncludeAccountName,Section } from "@/assets/definition"
import { getLatestWeekBill } from "@/app/data/database"
import Fob, { CreateBill } from "@/app/ui/fob"


export default function HomePage() {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [data, setData] = useState<BillIncludeAccountName[]>([]);
  const [section, setSection] = useState<Section[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const slideUp = new Animated.Value(300); // 初始位置在屏幕外

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        if (!modalVisible) {
          Animated.spring(slideUp, {
            toValue: 0, // 移动到屏幕内
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(slideUp, {
            toValue: 300, // 移动到屏幕外
            useNativeDriver: true,
          }).start(() => setModalVisible(false));
        }
      };

  // 统一获取数据的函数
  async function fetchData() {
    try {
      const [totalExpense, totalIncome, lastSevenDayBills] = await Promise.all([
        getLatestMonthTotalExpense(),
        getLatestMonthTotalIncome(),
        getLatestWeekBill(),
      ]);
      setExpense(totalExpense);
      setIncome(totalIncome);
      if (lastSevenDayBills) {
        setData(lastSevenDayBills);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData(); // 初始加载数据
  }, []);

  useEffect(() => {
    const sectionData = groupBillsByDate(data);
    setSection(sectionData);
  }, [data]);

  // 下拉刷新函数
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); // 重新获取数据
    setRefreshing(false); // 结束刷新
  };
  return (
    <View>
      <Fob toggleModal={toggleModal}/>
      <CreateBill modalVisible={modalVisible} toggleModal={toggleModal}/>
      <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      
      <Stack.Screen
      options={{ headerShown: true, title:'Home'}}></Stack.Screen>
      <MonthlyExpense month={getCurrentMonthAbbreviation()} expense={expense} income={income} currency="AUD"/>
      <LastSevenDayBillsSectionList section={section}/>
      <Test></Test>
    </ScrollView>
    </View>
    
  )
}

const getCurrentMonthAbbreviation = () => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
};



