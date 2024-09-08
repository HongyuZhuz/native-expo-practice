import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import { useState,} from 'react';
import { TextInput} from 'react-native';
import { Header} from './header';
import { ExpenseScreen } from './expenseScreen';
import { IncomeScreen } from './incomeScreen';
import { TransferScreen } from './transferScreen';


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
                {/* Header */}
                <Header toggleModal={toggleModal} activeTab = {activeTab} setActiveTab = {setActiveTab}/>
  
                {/*Icon sets*/}
                
                  {activeTab==='Expense' && <ExpenseScreen category = {category} setCategory = {setCategory} subCategory = {subCategory} setSubCategory = {setSubCategory}/>}
                  {activeTab==='Income' && <IncomeScreen/>}
                  {activeTab==='Transfer' &&<TransferScreen/>}
                
  
  
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

  const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
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
  });