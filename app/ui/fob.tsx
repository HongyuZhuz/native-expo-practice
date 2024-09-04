import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState,useRef } from 'react';
import { TextInput} from 'react-native';


export default function Fob () {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

    return(
        <TouchableOpacity style={styles.fab} activeOpacity={1} onPress={toggleModal}>
            <AntDesign name="plus" size={24} color="white" />
            <CreateBill modalVisible={modalVisible} toggleModal={toggleModal}/>
        </TouchableOpacity>
        
    )
}


function CreateBill ({modalVisible,toggleModal}:{modalVisible:boolean,toggleModal:()=>void}) {
  const [amount, setAmount] = useState("0.00");
  const [activeTab, setActiveTab ] = useState('Expense');
  const [category,setCategory] = useState('undefine')




  return (
      <Modal
          transparent={false}
          visible={modalVisible}
          animationType="slide"
      >
          <View style={styles.modalContainer}>
              {/* Header */}
              <Header toggleModal={toggleModal} activeTab = {activeTab} setActiveTab = {setActiveTab}/>

              {/*Icon sets*/}
              <View>
                {activeTab==='Expense' && <ExpenseScreen category = {category} setCategory = {setCategory}/>}
                {activeTab==='Income' && <IncomeScreen/>}
                {activeTab==='Transfer' &&<TransferScreen/>}
              </View>


              {/* Calculator component*/}
              <View style={styles.amountContainer}>
                  <TextInput
                      style={styles.amountInput}
                      value={amount}
                      editable={false} // Disable manual editing, controlled by the keypad
                  />
                  <TouchableOpacity style={styles.currencyIcon}>
                      <Text style={styles.currencyText}>A$</Text>
                  </TouchableOpacity>
              </View>

              {/* Keypad */}
              <View style={styles.keypadContainer}>
                  <View style={styles.keypadRow}>
                      {/* Each keypad button */}
                      <TouchableOpacity style={styles.keypadButton} onPress={() => setAmount(amount + "1")}>
                          <Text style={styles.keypadButtonText}>1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.keypadButton} onPress={() => setAmount(amount + "2")}>
                          <Text style={styles.keypadButtonText}>2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.keypadButton} onPress={() => setAmount(amount + "3")}>
                          <Text style={styles.keypadButtonText}>3</Text>
                      </TouchableOpacity>
                  </View>
                  {/* ... Repeat rows for other numbers */}
                  <View style={styles.keypadRow}>
                      <TouchableOpacity style={styles.keypadButton}>
                          <Text style={styles.keypadButtonText}>Again</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.keypadButton} onPress={() => setAmount(amount + "0")}>
                          <Text style={styles.keypadButtonText}>0</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.keypadButton}>
                          <Text style={styles.keypadButtonText}>.</Text>
                      </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.saveButton}>
                      <Text style={styles.saveButtonText}>SAVE</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
  );
}


function Header ({toggleModal,activeTab,setActiveTab}:{toggleModal:()=>void, activeTab:any, setActiveTab:any}) {
    const translateX = useRef(new Animated.Value(0)).current;
    const [tabContainerWidth, setTabContainerWidth] = useState(0); // 保存Tab容器的宽度
    const tabWidth = tabContainerWidth / 3; // 假设有3个Tab

  const handleTabPress = (tab:string) => {
    setActiveTab(tab);

    // 计算目标位置
    let toValue = 0;
    if (tab === 'Income') toValue = tabWidth-3;
    else if (tab === 'Transfer') toValue = 2 * tabWidth-5;

    // 启动动画
    Animated.timing(translateX, {
      toValue,
      duration: 300, // 动画持续时间
      useNativeDriver: true,
    }).start();
  };

  return (   
              <View style={styles.header}>
                  <TouchableOpacity onPress={toggleModal}>
                      <AntDesign name="left" size={24} color="white" />
                  </TouchableOpacity>
                <View 
                    style={styles.tabContainer}
                    onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setTabContainerWidth(width); // 保存Tab容器的宽度
                      }}>
                <Animated.View
                                style={[
                        styles.animatedBackground,
                        { transform: [{ translateX }], width: tabWidth }
                    ]}
                    />
                    <TouchableOpacity onPress={() => handleTabPress('Expense')}>
                        <Text style={[styles.tabText, activeTab === 'Expense' && styles.activeTabText]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTabPress('Income')}>
                        <Text style={[styles.tabText, activeTab === 'Income' && styles.activeTabText]}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTabPress('Transfer')}>
                        <Text style={[styles.tabText, activeTab === 'Transfer' && styles.activeTabText]}>Transfer</Text>
                    </TouchableOpacity>
                </View>
                  <TouchableOpacity>
                      <AntDesign name="setting" size={24} color="white" />
                  </TouchableOpacity>
              </View>
  )
}

import { iconLib,Icon } from '@/assets/icons/icon';

function ExpenseScreen({category,setCategory}:{category:string,setCategory:any}) {
  const expenseKeys = Object.keys(iconLib.expense);
 const handleIconPress = (name:string) =>{
  setCategory(name)
 }
    return (
      <View style={styles.screenContainer}>
        <View style={styles.iconContainer}>
          {expenseKeys.map((name)=>{
            return(
              <View style = {[styles.iconGroup,category===name&&styles.activeIcon]}>
                <TouchableOpacity onPress={() => handleIconPress(name)} style={styles.iconGroup}>
                  <Icon key={name} name = {name} style={styles.icon}/>
                  <Text style={styles.categoryText}>{name}</Text>
                </TouchableOpacity>
                
            </View>
            )})}
        </View>
      </View>
    );
  }
  
  function IncomeScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.categoryText}>Income</Text>
      </View>
    );
  }
  
  function TransferScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.categoryText}>Transfer</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  modalContainer: {
      flex: 1,
      backgroundColor: 'black',
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 0,
      backgroundColor: 'black',
      alignItems: 'center',
      marginTop:60
  },
  tabContainer: {
      flexDirection: 'row',
      backgroundColor:'#424949',
      padding:1,
      borderRadius:10,
      alignItems:'center'
  },
  tabText: {
      color: '#b3b6b7',
      marginHorizontal: 6,
      fontSize: 12,
      paddingVertical:10,
    paddingHorizontal:2,
  },
  categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingVertical: 20,
  },
  categoryItem: {
      alignItems: 'center',
      marginBottom: 20,
  },
  categoryText: {
      color: 'white',
      marginTop: 5,
      fontSize:12,
      textAlign:'center'
  },
  amountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
  },
  amountInput: {
      color: 'orange',
      fontSize: 36,
  },
  currencyIcon: {
      marginLeft: 10,
  },
  currencyText: {
      color: 'orange',
      fontSize: 18,
  },
  keypadContainer: {
      flex: 1,
      backgroundColor: 'black',
      padding: 10,
  },
  keypadRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
  },
  keypadButton: {
      backgroundColor: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: 80,
      borderRadius: 10,
  },
  keypadButtonText: {
      color: 'white',
      fontSize: 24,
  },
  saveButton: {
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderRadius: 10,
      marginHorizontal: 20,
  },
  saveButtonText: {
      color: 'white',
      fontSize: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'rgba(230, 145, 56,1)',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 9999,
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height:'40%'
  },
  activeTabText: {
    color: 'white',
    borderRadius:10,
    overflow: 'hidden',
  },
  animatedBackground: {
    position: 'absolute',
    height: '90%',
    backgroundColor: 'black',
    borderRadius: 8,
    marginHorizontal:2,
  },
  iconContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  iconGroup:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    width:30,
    height:30
  },
  activeIcon:{
    backgroundColor:'orange'
  }
});