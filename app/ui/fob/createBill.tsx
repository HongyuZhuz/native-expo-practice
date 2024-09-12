import { View, Modal, StyleSheet,Dimensions} from 'react-native';
import { useEffect, useState,} from 'react';
import { Header} from './header';
import { ExpenseScreen } from './expenseScreen';
import { IncomeScreen } from './incomeScreen';
import { TransferScreen } from './transferScreen';
import { Numpad } from './numPad';
import { createBill,getCategoryId } from '@/app/data/database';
import { BillType } from '@/assets/definition';


 export  function CreateBill ({modalVisible,toggleModal}:{modalVisible:boolean,toggleModal:()=>void}) {
    const [amount, setAmount] = useState<string>("0.00");
    const [activeTab, setActiveTab ] = useState<BillType>('cost');
    const [category,setCategory] = useState('undefine')
    const [subCategory,setSubCategory] = useState<string|null>(null)
    const [description,setDescription] = useState<string> ("")

    const onSubmit =async() =>{
        console.log("submit")
        let categoryId
        subCategory?categoryId = await getCategoryId(subCategory):categoryId = await getCategoryId(category)
        await createBill("c42a5364-5b5f-4276-9b5b-18269f2e80b7",activeTab,Number(amount),description,undefined,undefined,categoryId?categoryId:undefined)
        toggleModal()
    }
  
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
                {activeTab==='cost' && <ExpenseScreen category = {category} setCategory = {setCategory} subCategory = {subCategory} setSubCategory = {setSubCategory}/>}
                {activeTab==='income' && <IncomeScreen/>}
                {activeTab==='transfer' &&<TransferScreen/>}
            </View>
                
            
            <View style={styles.numPadContainer}>
                <Numpad setAmount = {setAmount} amount = {amount} setDescription = {setDescription} handleSubmit = {onSubmit}/>
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