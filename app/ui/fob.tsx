import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput,ScrollView} from 'react-native';


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

  return (
      <Modal
          transparent={false}
          visible={modalVisible}
          animationType="slide"
      >
          <View style={styles.modalContainer}>
              {/* Header */}
              <Header toggleModal={toggleModal} activeTab = {activeTab} setActiveTab = {setActiveTab}/>
              <View>
                {activeTab==='Expense' && <ExpenseScreen />}
                {activeTab==='Income' && <IncomeScreen/>}
                {activeTab==='Transfer' &&<TransferScreen/>}
              </View>

              {/* Category Icons */}
              <ScrollView contentContainerStyle={styles.categoryContainer}>
                  {/* Example of category icon, repeat similar structure for other icons */}
                  <TouchableOpacity style={styles.categoryItem}>
                      <AntDesign name="shoppingcart" size={36} color="white" />
                      <Text style={styles.categoryText}>Shopping</Text>
                  </TouchableOpacity>
                  {/* ... Repeat for other categories */}
              </ScrollView>

              {/* Amount Input */}
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

  return (   
              <View style={styles.header}>
                  <TouchableOpacity onPress={toggleModal}>
                      <AntDesign name="left" size={24} color="white" />
                  </TouchableOpacity>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setActiveTab('Expense')}>
                        <Text style={[styles.tabText, activeTab === 'Expense' && styles.activeTabText]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('Income')}>
                        <Text style={[styles.tabText, activeTab === 'Income' && styles.activeTabText]}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('Transfer')}>
                        <Text style={[styles.tabText, activeTab === 'Transfer' && styles.activeTabText]}>Transfer</Text>
                    </TouchableOpacity>
                </View>
                  <TouchableOpacity>
                      <AntDesign name="setting" size={24} color="white" />
                  </TouchableOpacity>
              </View>
  )
}

function ExpenseScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.categoryText}>Expense</Text>
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
  },
  tabText: {
      color: 'white',
      marginHorizontal: 10,
      fontSize: 16,
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
  },
  activeTabText: {
    fontWeight: 'bold',
    color: 'orange',
  },
});