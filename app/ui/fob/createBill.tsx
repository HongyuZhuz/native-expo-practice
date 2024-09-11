import { View, Modal, StyleSheet,Dimensions} from 'react-native';
import { useState,} from 'react';
import { Header} from './header';
import { ExpenseScreen } from './expenseScreen';
import { IncomeScreen } from './incomeScreen';
import { TransferScreen } from './transferScreen';
import { Numpad } from './numPad';

const { width, height } = Dimensions.get('window');

 export  function CreateBill ({modalVisible,toggleModal}:{modalVisible:boolean,toggleModal:()=>void}) {
    const [amount, setAmount] = useState("0.00");
    const [activeTab, setActiveTab ] = useState('Expense');
    const [category,setCategory] = useState('undefine')
    const [subCategory,setSubCategory] = useState<string|null>(null)
  
  
    return (
        <Modal
            transparent={false}
            visible={modalVisible}
            animationType="slide"
            
        >
            <View style={styles.modalContainer}>

                <View style={styles.header}>
                    <Header toggleModal={toggleModal} activeTab = {activeTab} setActiveTab = {setActiveTab}/>
                </View>
                
  
                {/*Icon sets*/}
            <View style={styles.screenContainer}>
                {activeTab==='Expense' && <ExpenseScreen category = {category} setCategory = {setCategory} subCategory = {subCategory} setSubCategory = {setSubCategory}/>}
                {activeTab==='Income' && <IncomeScreen/>}
                {activeTab==='Transfer' &&<TransferScreen/>}
            </View>
                
            
            <View style={styles.numPadContainer}>
                <Numpad setAmount = {setAmount} amount = {amount}/>
            </View>
            </View>
                
  
               

        </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: 'black',
        justifyContent:'space-between',
        gap:3
    },
    numPadContainer:{
        flex:1,
        backgroundColor:'rgb(15,15,15)',
        borderRadius:10,
        paddingBottom:30,
    },
    screenContainer:{
        backgroundColor:'rgb(15,15,15)',
        borderRadius:10,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 0,
        backgroundColor: 'rgb(15,15,15)',
        alignItems: 'center',
        paddingTop:60,
        paddingBottom:10,
        borderRadius:10
    },
   
  });